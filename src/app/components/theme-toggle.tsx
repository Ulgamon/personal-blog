import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10"
        disabled
      >
        <span className="h-[18px] w-[18px]" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full h-10 w-10 hover:bg-[--color-bg-tertiary] transition-colors duration-200"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="relative w-[18px] h-[18px]">
        {/* Sun icon - visible in light mode */}
        <Sun
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-200 ease-in-out motion-reduce:transition-none ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
          aria-hidden="true"
        />
        {/* Moon icon - visible in dark mode */}
        <Moon
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-200 ease-in-out motion-reduce:transition-none ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    </Button>
  );
}
