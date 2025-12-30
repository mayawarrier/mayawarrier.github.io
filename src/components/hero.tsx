import { RefObject } from "react";
import { LucideIcon, GithubIcon, LinkedinIcon, ChevronDownIcon, FileTextIcon } from "lucide-react";
import { ExternalLink } from "./utils";

interface HeroIconLinkProps {
  href: string;
  title: string;
  icon: LucideIcon;
};

const HeroIconLink: React.FC<HeroIconLinkProps> = (props) => {
  const Icon = props.icon;
  return (
    <ExternalLink
      href={props.href}
      className="flex items-center justify-center gap-2
        text-muted-foreground hover:text-accent transition-colors"
    >
      <Icon className="h-[1.2rem] w-[1.2rem] xl:h-[1.25rem] xl:w-[1.25rem]" />
      <span className="text-[1.075rem] xl:text-[1.175rem]">{props.title}</span>
    </ExternalLink>
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
          <div className="flex flex-row items-center justify-center lg:justify-normal gap-4">
            <HeroIconLink title="GitHub" href="https://github.com/mayawarrier" icon={GithubIcon} />
            <HeroIconLink title="LinkedIn" href="https://www.linkedin.com/in/mayawarrier/" icon={LinkedinIcon} />
          </div>

          <div className="flex justify-center lg:justify-normal">
            <HeroIconLink title="Resume" href="/resume.pdf" icon={FileTextIcon} />
          </div>
        </div>

        <div className="lg:hidden w-full flex items-center justify-center">
          <button className="flex items-center justify-center gap-1 p-2 w-4/5
            border-1 border-primary/30 text-md text-primary font-medium rounded-md text-sm
            hover:text-primary/80 hover:border-primary/50 transition-colors
            hover:cursor-pointer"
            onClick={() => showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            <span className="w-5" />
            <span>See More</span>
            <ChevronDownIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

    </div>
  );
}