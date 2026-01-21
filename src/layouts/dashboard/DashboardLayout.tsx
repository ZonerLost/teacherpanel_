// import { Outlet } from "react-router-dom";
// import TeacherTopbar from "./TeacherTopbar";
// import { NAV_ITEMS } from "./navItems";
// import { useTheme } from "../../shared/theme/useTheme";


// export default function DashboardLayout() {
//   const { theme } = useTheme();

//   return (
//     <div className={theme === "dark" ? "min-h-dvh bg-[#06000F]" : "min-h-dvh bg-slate-50"}>
//       <TeacherTopbar
//         navItems={NAV_ITEMS}
//         onLogout={() => console.log("logout")}
//       />

//       <main className="mx-auto  px-4 py-6 sm:px-6 lg:px-8">
//         <Outlet />
        
//       </main>
//     </div>
//   );
// }


import { Outlet } from "react-router-dom";
import TeacherTopbar from "./TeacherTopbar";
import { NAV_ITEMS } from "./navItems";
import { useTheme } from "../../shared/theme/useTheme";

export default function DashboardLayout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={[
        "min-h-dvh",
        "flex flex-col",
        isDark ? "bg-[#06000F]" : "bg-slate-50",
      ].join(" ")}
    >
      <TeacherTopbar navItems={NAV_ITEMS} onLogout={() => {}} />

      <main className="mx-auto w-full flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
