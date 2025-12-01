import { PersonalInfo } from "~/components/personal-info";
import { Showcase } from "~/components/showcase";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row lg:h-screen">
        <div className="flex items-center justify-center h-screen
           bg-muted/50 py-12 px-4 lg:w-2/5 lg:p-8 lg:overflow-y-hidden">
          <PersonalInfo />
        </div>
        <div className="min-h-screen flex lg:block lg:h-screen lg:w-3/5" id="showcase">
          <Showcase />
        </div>
      </div>
    </main>
  );
}
