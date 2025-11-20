import { useEffect, useState } from "react"
import { GithubIcon, LinkedinIcon } from "lucide-react"

export const PersonalInfo: React.FC = () => {
  return (
    <div className="max-w-lg space-y-12">

      <div className="space-y-6">
        <div className="space-y-6">
          <h1 className="text-7xl font-bold tracking-tight">Maya Warrier</h1>
          <p className="text-3xl text-primary font-light">
            Software Engineer @ Manulife
          </p>
        </div>
        
        <div className="h-px bg-primary/30 w-20" />

        <p className="text-[1.32rem] text-muted-foreground leading-relaxed font-light space-y-8">
          <div>
            Passionate about systems programming, GPU acceleration, 3D graphics and game engines.
            Currently building full-stack web applications and cloud infra @ Manulife.
          </div>
          <div>UofT Computer Engineering '24.</div>
        </p>
      </div>

      <div className="flex flex-row items-center gap-6">
        <a
          href="https://github.com/mayawarrier"
          target="_blank"
          rel="noopener"
          className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
        >
          <GithubIcon />
          <span>GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/mayawarrier/"
          target="_blank"
          rel="noopener"
          className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
        >
          <LinkedinIcon />
          <span>LinkedIn</span>
        </a>
        </div>
    </div>
  );
}