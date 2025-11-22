import { PersonalInfo } from "~/components/personal-info";
import { Showcase } from "~/components/showcase";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Maya Warrier's Portfolio" },
//     { name: "description", content: "Welcome to Maya Warrier's Portfolio!" },
//   ];
// }

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* desktop */}
      <div className="hidden lg:flex h-screen">
        <div className="flex items-center justify-center w-2/5 h-screen p-8 overflow-y-hidden bg-muted/50">
          <PersonalInfo />
        </div>
        <div className="h-screen w-3/5">
          <Showcase />
        </div>
      </div>

      {/* mobile */}
      <div className="lg:hidden flex flex-col flex-1">
        <div className="flex items-center justify-center h-screen py-12 px-4 bg-muted/50">
          <PersonalInfo />
        </div>
        <div className="min-h-screen flex" id="mobile-showcase">
          <Showcase />
        </div>
      </div>
    </main>
  );
}
