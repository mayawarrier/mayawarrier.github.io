import { RefObject } from "react";
import { LucideIcon, GithubIcon, LinkedinIcon, ChevronDownIcon, FileTextIcon } from "lucide-react";
import { ExternalLink } from "./utils";

interface HeroLinkProps {
  href: string;
  title: string;
  icon: LucideIcon;
};

const HeroLinkArray: React.FC<{ links: HeroLinkProps[] }> = ({ links }) => {
  return (
    <div className="flex items-center justify-center lg:justify-normal gap-10 lg:gap-4">
      {links.map((link, linkIndex) => {
        const Icon = link.icon;
        return (
          <ExternalLink
            key={linkIndex}
            href={link.href}
            className="flex items-center justify-center relative lg:static
              gap-[calc(var(--spacing)*1.5)] text-muted-foreground hover:text-accent transition-colors"
          >
            <Icon className="h-[1.1rem] w-[1.1rem] absolute -left-[1.5rem] lg:static" />
            <span className="text-[1.075rem]">{link.title}</span>
          </ExternalLink>
        );
      })}
    </div>
  );
}

export const Hero: React.FC<{ showcaseRef: RefObject<HTMLDivElement | null> }> = ({ showcaseRef }) => {
  return (
    <div className="h-full w-full flex items-center justify-center py-12 px-4 lg:p-8 bg-muted/50">

      <div className="max-w-xl space-y-8 xl:space-y-12 text-center lg:text-left">
        <div className="space-y-6">
          <div className="space-y-6">
            <h1 className="text-6xl xl:text-7xl font-bold tracking-tight">
              Maya Warrier
            </h1>
            <p className="text-2xl xl:text-3xl text-primary font-light">
              Software Engineer
            </p>
          </div>

          <div className="mx-auto lg:mx-0 h-px w-20 bg-primary/30" />

          <div className="text-[1.2rem] xl:text-[1.32rem] 
            text-muted-foreground leading-relaxed font-light space-y-8">
            <p>
              Passionate about GPU acceleration, 3D graphics, and high-performance systems.
              Building consumer-facing web applications and cloud infrastructure @ Manulife.
            </p>
            <p>UofT Computer Engineering '24.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <HeroLinkArray links={[
            { title: "GitHub", href: "https://github.com/mayawarrier", icon: GithubIcon },
            { title: "LinkedIn", href: "https://www.linkedin.com/in/mayawarrier/", icon: LinkedinIcon }
          ]} />
          <HeroLinkArray links={[
            { title: "Resume", href: "/resume.pdf", icon: FileTextIcon }
          ]} />
        </div>

        <div className="lg:hidden w-full flex items-center justify-center">
          <button className="flex items-center justify-center gap-1 p-2 w-4/5
            border-1 border-primary/30 text-primary font-medium rounded-md
            hover:text-primary/80 hover:border-primary/50 transition-colors
            hover:cursor-pointer"
            onClick={() => showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            <span className="flex items-center relative">
              <span>See More</span>
              <ChevronDownIcon className="h-5 w-5 absolute -right-6" />
            </span>
          </button>
        </div>
      </div>

    </div>
  );
}