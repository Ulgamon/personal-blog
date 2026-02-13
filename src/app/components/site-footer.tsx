import { Link } from "react-router";
import { Github } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Resume", path: "/resume" },
    { label: "Certifications", path: "/certifications" },
    { label: "Contact", path: "/contact" },
  ];

  const topics = ["Security", "DevOps", "Frontend", "Backend"];

  return (
    <footer className="border-t border-[--color-border-subtle] mt-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          {/* Identity Block */}
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-semibold text-[--color-text-primary] mb-2">
                justinilic.com
              </h3>
              <p className="text-sm text-[--color-text-tertiary]">
                Security & Development notes
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[--color-text-primary] mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-sm font-semibold text-[--color-text-primary] mb-4">
              Topics
            </h4>
            <ul className="space-y-3">
              {topics.map((topic) => (
                <li key={topic}>
                  <span className="text-sm text-[--color-text-tertiary]">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-[--color-text-primary] mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/Ulgamon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-[--color-border-subtle]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[--color-text-tertiary]">
              © {currentYear} Justin Ilić
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
