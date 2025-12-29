import { useRef } from "react";
import { Hero } from "~/components/hero";
import { Showcase } from "~/components/showcase";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row lg:h-screen">
      <div className="h-screen lg:w-2/5 lg:overflow-y-hidden">
        <Hero />
      </div>
      <div className="min-h-screen h-auto w-full lg:block lg:h-screen lg:w-3/5 lg:h-full" >
        <Showcase />
      </div>
    </main>
  );
}
