import { useRef } from "react";
import { Hero } from "~/components/hero";
import { Showcase } from "~/components/showcase";

export default function Home() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  return (
    <main className="min-h-svh flex flex-col lg:flex-row lg:h-svh">
      <div className="h-svh lg:w-2/5 lg:overflow-y-hidden">
        <Hero showcaseRef={showcaseRef}/>
      </div>
      <div className="min-h-svh h-auto w-full lg:block lg:h-svh lg:w-3/5 lg:h-full" >
        <Showcase ref={showcaseRef} />
      </div>
    </main>
  );
}
