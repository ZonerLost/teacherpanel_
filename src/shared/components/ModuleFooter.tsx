import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { cn } from "../utils/cn";

type FooterLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  theme?: "light" | "dark";
  className?: string;
  containerClassName?: string;

  links?: FooterLink[];

  brandName?: string;
  year?: number;
  socialLinks?: SocialLink[];
};

const defaultLinks: FooterLink[] = [
  { label: "Company", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Legal", href: "#" },
];

const defaultSocial: SocialLink[] = [
  { label: "Facebook", href: "#", icon: <Facebook className="h-5 w-5" /> },
  { label: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
  { label: "LinkedIn", href: "#", icon: <Linkedin className="h-5 w-5" /> },
  { label: "YouTube", href: "#", icon: <Youtube className="h-5 w-5" /> },
];

export function ModuleFooter({
  theme,
  className,
  containerClassName,
  links = defaultLinks,
  socialLinks = defaultSocial,
}: Props) {
  const isDark = theme === "dark";

  const baseBg = isDark ? "bg-[#1b0b2a]" : "bg-white";
  const baseText = "text-[rgb(var(--text))]";

  const linkCls = cn(
    baseText,
    "opacity-80 hover:opacity-100 transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2",
    isDark ? "focus-visible:ring-offset-[#1b0b2a]" : "focus-visible:ring-offset-white",
    "rounded-md"
  );

  const iconBtnCls = cn(
    baseText,
    "opacity-80 hover:opacity-100 transition",
    "inline-flex h-10 w-10 items-center justify-center rounded-xl",
    "hover:bg-black/5 dark:hover:bg-white/5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2",
    isDark ? "focus-visible:ring-offset-[#1b0b2a]" : "focus-visible:ring-offset-white"
  );

  return (
    <footer
      role="contentinfo"
      className={cn(
        "w-full border-t border-[rgb(var(--border))]",
        baseBg,
        className
      )}
    >
      <div
        className={cn(
          "mx-auto w-full ",
          "px-4 py-5 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {/* Top row: Links + Social (responsive) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Links (wrap on small screens) */}
          <nav
            aria-label="Footer links"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
          >
            {links.map((l) => {
              if (l.onClick) {
                return (
                  <button key={l.label} type="button" onClick={l.onClick} className={linkCls}>
                    {l.label}
                  </button>
                );
              }

              return (
                <a
                  key={l.label}
                  href={l.href ?? "#"}
                  className={linkCls}
                  rel={l.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  target={l.href?.startsWith("http") ? "_blank" : undefined}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={iconBtnCls}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={s.href.startsWith("http") ? "_blank" : undefined}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>


      </div>
    </footer>
  );
}
