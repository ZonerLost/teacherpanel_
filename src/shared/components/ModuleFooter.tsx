
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { cn } from "../utils/cn";

type FooterLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type Props = {
  theme?: "light" | "dark";
  className?: string;
  containerClassName?: string;
  links?: FooterLink[];
};

const defaultLinks: FooterLink[] = [
  { label: "Company", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Legal", href: "#" },
];

export function ModuleFooter({
  theme,
  className,
  containerClassName,
  links = defaultLinks,
}: Props) {
  const isDark = theme === "dark";

  return (
    <footer
      role="contentinfo"
      className={cn(
        "w-full",
        "border-t border-[rgb(var(--border))]",
        isDark ? "bg-[#1b0b2a]" : "bg-white",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between",
          "px-6 py-4",
          "max-w-[1200px]",
          containerClassName
        )}
      >
        {/* Left links */}
        <nav className="flex items-center gap-8 text-sm">
          {links.map((l) => {
            const common =
              "text-[rgb(var(--text))] opacity-80 hover:opacity-100 transition";

            if (l.onClick) {
              return (
                <button
                  key={l.label}
                  type="button"
                  onClick={l.onClick}
                  className={common}
                >
                  {l.label}
                </button>
              );
            }

            return (
              <a key={l.label} href={l.href ?? "#"} className={common}>
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            aria-label="Facebook"
            className="text-[rgb(var(--text))] opacity-80 hover:opacity-100 transition"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-[rgb(var(--text))] opacity-80 hover:opacity-100 transition"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-[rgb(var(--text))] opacity-80 hover:opacity-100 transition"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-[rgb(var(--text))] opacity-80 hover:opacity-100 transition"
          >
            <Youtube className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
