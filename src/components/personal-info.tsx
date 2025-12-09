import { GithubIcon, LinkedinIcon, ChevronDownIcon } from "lucide-react";

export const PersonalInfo: React.FC = () => {
  return (
    <div className="max-w-xl space-y-12 text-center lg:text-left">

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
            Building consumer-facing applications and cloud infrastructure @ Manulife.
          </p>
          <p>UofT Computer Engineering '24.</p>
        </div>
      </div>

      <div className="text-[1.1rem] xl:text-[1.15rem] 
        flex flex-row items-center justify-center lg:justify-normal gap-6">
        {[
          { title: "GitHub", href: "https://github.com/mayawarrier", icon: GithubIcon },
          { title: "LinkedIn", href: "https://www.linkedin.com/in/mayawarrier/", icon: LinkedinIcon }
        ].map((linkinfo) => {
          const Icon = linkinfo.icon;
          return (
            <a
              key={linkinfo.href}
              href={linkinfo.href}
              target="_blank"
              rel="noopener"
              className="text-muted-foreground hover:text-accent 
                transition-colors flex items-center gap-2"
            >
              <Icon />
              <span>{linkinfo.title}</span>
            </a>
          );
        })}
      </div>

      <div className="lg:hidden w-full flex items-center justify-center">
        <button className="flex items-center justify-center gap-1 p-3 w-4/5
          border-1 border-primary/30 text-md text-primary font-medium rounded-md
          hover:text-primary/80 hover:border-primary/50 transition-colors
          hover:cursor-pointer"
          onClick={() => {
            const target = document.getElementById("showcase");
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span>See More</span>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}