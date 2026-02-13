import { Button } from "@/app/components/ui/button";
import { Menu, X, Search, Github } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ThemeToggle } from "@/app/components/theme-toggle";

interface SiteHeaderProps {
  onCommandOpen?: () => void;
}

export function SiteHeader({ onCommandOpen }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "resume", label: "Resume", path: "/resume" },
    { id: "certifications", label: "Certifications", path: "/certifications" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/blog");
    }
    return location.pathname === path;
  };

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="border-b border-[--color-border-subtle] sticky top-0 bg-[--color-bg-primary]/[0.98] backdrop-blur-xl md:bg-[--color-bg-primary]/95 md:backdrop-blur-md z-50 shadow-sm md:shadow-none">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-semibold tracking-tight text-[--color-text-primary] hover:text-[--color-accent-primary] transition-colors duration-200"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Justin Ilić
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-[--color-accent-primary]"
                      : "text-[--color-text-secondary] hover:text-[--color-text-primary]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://github.com/Ulgamon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <ThemeToggle />
              {onCommandOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCommandOpen}
                  className="rounded-full h-10 w-10 hover:bg-[--color-bg-tertiary] transition-colors duration-200"
                  aria-label="Open command palette"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {onCommandOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCommandOpen}
                  className="rounded-full h-10 w-10 hover:bg-[--color-bg-tertiary] transition-colors duration-200"
                  aria-label="Open command palette"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full h-10 w-10 hover:bg-[--color-bg-tertiary] transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-[--color-bg-primary] z-40 border-t border-[--color-border-subtle]">
          <nav className="px-4 sm:px-6 py-8">
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={handleMobileNavClick}
                    className={`text-lg font-medium transition-colors duration-200 w-full text-left block ${
                      isActive(item.path)
                        ? "text-[--color-accent-primary]"
                        : "text-[--color-text-secondary] hover:text-[--color-text-primary]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/Ulgamon"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMobileNavClick}
                  className="text-lg font-medium text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors duration-200 w-full text-left flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
