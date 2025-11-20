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
    <main className="min-h-screen flex">
      {/* desktop */}
      <div className="hidden lg:flex flex-1">
        <div className="flex items-center justify-center h-full w-2/5 p-8">
          <PersonalInfo />
        </div>
        <div className="flex h-full w-3/5 bg-muted/40">
          <Showcase />
        </div>
      </div>

      {/* mobile */}
      <div className="lg:hidden flex flex-col flex-1">
        <div className="flex items-center justify-center h-screen w-full py-12 px-4">
          <PersonalInfo />
        </div>
        <div className="flex h-screen w-full" id="showcase">
          <Showcase />
        </div>
      </div>
    </main>
  );
}
