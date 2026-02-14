import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { Link } from "react-router";
import { generateSlug } from "@/app/utils/slug";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  tags: string[];
}

interface BlogListViewProps {
  posts: BlogPost[];
  onCommandOpen?: () => void;
}

export function BlogListView({ posts, onCommandOpen }: BlogListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique primary categories (Security, Development)
  const primaryCategories = Array.from(
    new Set(
      posts.map((post) => {
        const [primary] = post.category.split(" / ");
        return primary;
      }),
    ),
  );

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      !selectedCategory || post.category.startsWith(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <SiteHeader onCommandOpen={onCommandOpen} />

      {/* Hero Section */}
      <header className="border-b border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-4xl">
            <h1 className="mb-8 text-balance leading-[1.15]">
              Security and development insights
            </h1>
            <p
              className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl"
              style={{ lineHeight: "1.8" }}
            >
              Practical writing about application security, secure development
              practices, and building reliable software.
            </p>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)]" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-16 bg-[var(--color-bg-primary)] border-[var(--color-border-default)]"
              />
              {onCommandOpen && (
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--color-bg-tertiary)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] text-[var(--color-text-tertiary)] font-mono">
                  <span className="text-[10px]">⌘</span>K
                </kbd>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                All
              </Button>
              {primaryCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-secondary)] text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 md:gap-16">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${generateSlug(post.title)}`}
                className="group block"
              >
                <article className="cursor-pointer border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] p-6 md:p-8 bg-[var(--color-bg-secondary)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:border-[var(--color-border-default)]">
                  <div className="grid md:grid-cols-5 gap-6 md:gap-10">
                    {/* Image */}
                    <div
                      className={`md:col-span-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)]">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`md:col-span-3 flex flex-col justify-center ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs uppercase tracking-wider"
                        >
                          {post.category}
                        </Badge>
                        <span className="text-xs text-[var(--color-text-quaternary)] uppercase tracking-wider">
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-semibold mb-5 group-hover:text-[var(--color-accent-primary)] transition-colors leading-tight">
                        {post.title}
                      </h2>

                      <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed text-base">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-subtle)]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--color-text-primary)]">
                              {post.author}
                            </p>
                            <p className="text-xs text-[var(--color-text-quaternary)]">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <span className="group-hover:translate-x-1 transition-transform text-sm text-[var(--color-text-tertiary)]">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
