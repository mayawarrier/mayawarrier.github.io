// import type { Route } from "./+types/home";
// import { Welcome } from "../components/welcome/welcome";
// import { Navigation } from "~/components/navigation";
// import { HeroHome } from "~/components/herohome";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PersonalInfo } from "~/components/personalinfo";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Maya Warrier's Portfolio" },
//     { name: "description", content: "Welcome to Maya Warrier's Portfolio!" },
//   ];
// }

export default function Home() { //{ section }: HomeProps) {
  const location = useLocation();
  const section = location.hash.replace("#", "");
  
  useEffect(() => {
    if (location.pathname !== "/") {
      const newLocation = section ? "/#" + section : "/";
      window.location.replace(newLocation);
    }
  }, [location.pathname, section]);

  console.log("Current section:", section);

  return (
    <div className="h-screen h-dvh">
      {/* desktop */}
      <div className="hidden lg:block h-full">
        <div className="flex items-center justify-center h-full w-2/5">
          <PersonalInfo />
        </div>
      </div>

      {/* mobile */}
      <div className="lg:hidden h-full">
        <div className="flex items-center justify-center h-full w-full">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
}
