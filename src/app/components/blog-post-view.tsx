import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import type { BlogPost } from "@/app/App";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { SharePopover } from "@/app/components/share-popover";
import { useState } from "react";
import { useTheme } from "next-themes";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { copyToClipboard } from "@/app/utils/clipboard";

interface BlogPostViewProps {
  post: BlogPost;
  onCommandOpen?: () => void;
}

export function BlogPostView({ post, onCommandOpen }: BlogPostViewProps) {
  const { theme } = useTheme();

  // Generate the post URL
  const postUrl = `justinilic.com/blog/${post.slug}`;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <SiteHeader onCommandOpen={onCommandOpen} />

      {/* Hero Image */}
      <div className="w-full bg-[--color-bg-tertiary]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] overflow-hidden rounded-lg">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto w-full max-w-3xl">
          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Badge
                variant="secondary"
                className="rounded-full text-xs uppercase tracking-wider"
              >
                {post.category}
              </Badge>
              <span className="text-sm text-[--color-text-quaternary]">
                {post.readTime}
              </span>
            </div>

            <h1 className="mb-12 text-balance leading-[1.15]">{post.title}</h1>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-[--color-bg-tertiary] flex items-center justify-center">
                <span className="text-base font-medium text-[--color-text-secondary]">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-base mb-0.5">{post.author}</p>
                <p className="text-sm text-[--color-text-tertiary]">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {/* Share popover */}
              <SharePopover url={postUrl} title={post.title} />
            </div>

            <Separator className="bg-[--color-border-subtle]" />
          </header>

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeString = String(children).replace(/\n$/, "");

                  return !inline && match ? (
                    <div
                      className="relative my-6"
                      style={{ isolation: "isolate" }}
                    >
                      {/* Code block - base layer */}
                      <div className="relative">
                        <SyntaxHighlighter
                          style={theme === "dark" ? oneDark : oneLight}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-[var(--radius-md)] text-sm"
                          customStyle={{
                            margin: 0,
                            padding: "1.5rem",
                            paddingRight: "4rem",
                            background:
                              theme === "dark" ? "#1a1a1a" : "#f5f5f4",
                          }}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                      {/* Copy button - interactive layer on top */}
                      <div
                        className="absolute top-3 right-3"
                        style={{ zIndex: 100 }}
                      >
                        <CopyButton code={codeString} />
                      </div>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1
                    className="scroll-mt-20"
                    id={String(children).toLowerCase().replace(/\s+/g, "-")}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    className="scroll-mt-20"
                    id={String(children).toLowerCase().replace(/\s+/g, "-")}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    className="scroll-mt-20"
                    id={String(children).toLowerCase().replace(/\s+/g, "-")}
                  >
                    {children}
                  </h3>
                ),
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </Markdown>
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-[--color-border-subtle]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-[--color-text-tertiary]">
                Tagged:
              </span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="border-t border-[--color-border-subtle] bg-[--color-bg-secondary]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-[--color-bg-tertiary] flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-medium">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {post.author}
                </h3>
                <p className="text-[--color-text-secondary] leading-relaxed mb-4">
                  {post.author} is a designer and developer passionate about
                  creating thoughtful digital experiences. They write about
                  design, code, and the intersection of the two.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-sm text-[--color-accent-primary] hover:text-[--color-accent-hover] transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-sm text-[--color-accent-primary] hover:text-[--color-accent-hover] transition-colors"
                  >
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Clipboard API not available - silently ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-[var(--radius-md)] bg-[--color-bg-primary] border border-[--color-border-default] shadow-sm opacity-80 hover:opacity-100 active:scale-95 transition-all duration-150 cursor-pointer"
      aria-label={copied ? "Copied!" : "Copy code"}
      type="button"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {copied ? (
        <Check className="h-4 w-4 text-[--color-accent-primary]" />
      ) : (
        <Copy className="h-4 w-4 text-[--color-text-secondary]" />
      )}
    </button>
  );
}
