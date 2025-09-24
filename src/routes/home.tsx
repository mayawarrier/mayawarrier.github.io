// import type { Route } from "./+types/home";
// import { Welcome } from "../components/welcome/welcome";
// import { Navigation } from "~/components/navigation";
// import { HeroHome } from "~/components/herohome";
import { PersonalInfo } from "~/components/personalinfo";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Maya Warrier's Portfolio" },
//     { name: "description", content: "Welcome to Maya Warrier's Portfolio!" },
//   ];
// }

export default function Home() {
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
