import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "../../utils/cn";

type Props = Omit<NavLinkProps, "className"> & {
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export function NavItemLink({
  className,
  activeClassName = "text-[rgb(var(--accent))] after:bg-[rgb(var(--accent))]",
  inactiveClassName = "text-[rgb(var(--text))]/80 hover:text-[rgb(var(--text))] after:bg-[rgb(var(--text))]/60",
  ...props
}: Props) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        cn(
          "relative px-1 text-sm font-medium transition-colors",
          "after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100",
          isActive ? activeClassName : inactiveClassName,
          className
        )
      }
    />
  );
}
