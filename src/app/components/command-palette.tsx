import { useEffect, useState, useRef } from "react";
import {
  Search,
  ArrowRight,
  FileText,
  User,
  Award,
  Mail,
  Command,
} from "lucide-react";
import type { BlogPost } from "@/app/App";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onPostSelect: (post: BlogPost) => void;
  onNavigate: (page: string) => void;
}

interface SearchResult {
  type: "page" | "post";
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  posts,
  onPostSelect,
  onNavigate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Static pages
  const pages: SearchResult[] = [
    {
      type: "page",
      id: "home",
      title: "Home",
      subtitle: "View all blog posts",
      icon: FileText,
      action: () => {
        onNavigate("home");
        onClose();
      },
    },
    {
      type: "page",
      id: "resume",
      title: "Resume",
      subtitle: "View experience and skills",
      icon: User,
      action: () => {
        onNavigate("resume");
        onClose();
      },
    },
    {
      type: "page",
      id: "certifications",
      title: "Certifications",
      subtitle: "View professional certifications",
      icon: Award,
      action: () => {
        onNavigate("certifications");
        onClose();
      },
    },
    {
      type: "page",
      id: "contact",
      title: "Contact",
      subtitle: "Get in touch",
      icon: Mail,
      action: () => {
        onNavigate("contact");
        onClose();
      },
    },
  ];

  // Convert blog posts to search results
  const postResults: SearchResult[] = posts.map((post) => ({
    type: "post",
    id: post.id.toString(),
    title: post.title,
    subtitle: post.excerpt,
    icon: FileText,
    action: () => {
      onPostSelect(post);
      onClose();
    },
  }));

  // Combine and filter results
  const allResults = [...pages, ...postResults];
  const filteredResults =
    query.trim() === ""
      ? allResults.slice(0, 8)
      : allResults
          .filter(
            (result) =>
              result.title.toLowerCase().includes(query.toLowerCase()) ||
              result.subtitle?.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 8);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredResults.length) % filteredResults.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          filteredResults[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Command Palette */}
      <div className="fixed inset-x-4 top-[20vh] backdrop-blur-none bg-[bg-secondary] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-60">
        <div className="border border-[--color-border-default] rounded-[--radius-lg] shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[--color-border-subtle]">
            <Search className="h-5 w-5 text-[--color-text-tertiary] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pages and posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[--color-text-primary] placeholder:text-[--color-text-tertiary]"
            />
            <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs bg-[--color-bg-tertiary] border border-[--color-border-subtle] rounded-[--radius-sm] text-[--color-text-tertiary]">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredResults.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="text-[--color-text-tertiary]">No results found</p>
              </div>
            ) : (
              <div className="py-2">
                {filteredResults.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={result.action}
                      className={`w-full flex items-start gap-3 px-4 py-3 transition-colors ${
                        index === selectedIndex
                          ? "bg-[--color-bg-tertiary]"
                          : "hover:bg-[--color-bg-secondary]"
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <Icon className="h-5 w-5 text-[--color-text-tertiary] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium text-[--color-text-primary] mb-0.5">
                          {result.title}
                        </div>
                        {result.subtitle && (
                          <div className="text-sm text-[--color-text-tertiary] truncate">
                            {result.subtitle}
                          </div>
                        )}
                      </div>
                      {index === selectedIndex && (
                        <ArrowRight className="h-4 w-4 text-[--color-text-tertiary] flex-shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[--color-border-subtle] bg-[--color-bg-secondary]">
            <div className="flex items-center justify-between text-xs text-[--color-text-tertiary]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-[--color-bg-primary] border border-[--color-border-subtle] rounded text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-[--color-bg-primary] border border-[--color-border-subtle] rounded text-[10px]">
                    ↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-[--color-bg-primary] border border-[--color-border-subtle] rounded text-[10px]">
                    ↵
                  </kbd>
                  <span>Select</span>
                </div>
              </div>
              <span>Command Palette</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
