import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PersonalInfo } from "~/components/personal-info";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Maya Warrier's Portfolio" },
//     { name: "description", content: "Welcome to Maya Warrier's Portfolio!" },
//   ];
// }

export default function Home() {
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
    <main className="min-h-screen flex flex-col">
      {/* desktop */}
      <div className="hidden lg:flex lg:flex-col flex-1">
        <div className="flex items-center justify-center flex-1 w-2/5 px-8">
          <PersonalInfo />
        </div>
      </div>

      {/* mobile */}
      <div className="lg:hidden flex flex-col flex-1">
        <div className="flex items-center justify-center flex-1 w-full px-12">
          <PersonalInfo />
        </div>
      </div>
    </main>
  );
}
