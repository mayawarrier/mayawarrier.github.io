import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";
import { Navigation } from "~/components/navigation";
import { HeroHome } from "~/components/herohome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Maya Warrier's Portfolio" },
    { name: "description", content: "Welcome to Maya Warrier's Portfolio!" },
  ];
}

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroHome />
    </>
  );
}
