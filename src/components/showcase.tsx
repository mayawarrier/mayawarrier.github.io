import { useState } from "react";
import { GithubIcon, PlayIcon, GitPullRequestArrowIcon } from "lucide-react"
import { ProjectTile } from "~/components/project-tile";

enum ProjectType {
  PROJECT = "Project",
  OPEN_SRC = "OpenSrc"
};

type ProjectInfo = {
  type: ProjectType.PROJECT;
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  githubUrl: string;
  liveUrl?: string;
  technologies?: string[];
}

type OpenSrcProjectInfo = {
  type: ProjectType.OPEN_SRC;
  title: string;
  description: string;
  contributions: string[];
  githubUrl: string;
  contribsUrl: string;
};

type ShowcaseProjectInfo = ProjectInfo | OpenSrcProjectInfo;

const projects: ShowcaseProjectInfo[] = [
  {
    type: ProjectType.PROJECT,
    title: "3D Mapper",
    description:
      "Interactive 3D map viewer using real-world data, running in my OpenGL-based 3D engine. " +
      "I'm currently working on increasing map accuracy and adding support for textures and lighting to my engine.",
    image: {
      url: "/opengl-3dcity.png",
      alt: "3D map of Toronto from an aerial view, showing buildings and roads."
    },
    githubUrl: "https://github.com/mayawarrier/opengl_3dcity",
  },
  {
    type: ProjectType.OPEN_SRC,
    title: "fast_float",
    description:
      "High-performance floating-point and integer parsing library; 4x to 10x faster than strtod, " +
      "part of GCC 12, MySQL, Redis, WebKit, and all major web browsers (Microsoft Edge, Google Chrome, Opera, and Safari).",
    contributions: [
      "Wrote the new integer parser, currently one of the <strong>fastest</strong> C++ integer parsers according to " +
      "<a href='https://github.com/alugowski/parse-bench?tab=readme-ov-file#results' onClick='(e) => e.stopPropagation()'>benchmarks</a>.",
      "Improved performance by 10% for Unicode (UTF-16) strings using x86 SIMD",
      "Added support for the JSON numeric format (compliant to the latest JSON RFC 8259)",
    ],
    githubUrl: "https://github.com/fastfloat/fast_float",
    contribsUrl: "https://github.com/fastfloat/fast_float/pulls?q=is%3Apr+author%3Amayawarrier"
  },
  {
    type: ProjectType.PROJECT,
    title: "Space Invaders Emulator",
    description:
      "Emulation of the classic Space Invaders arcade cabinet. Behaves like a virtual machine, running the game's " +
      "original 1978 binary on a simulated Intel 8080 CPU. Can run natively or in a browser (thanks to WASM).",
    image: {
      url: "/space-invaders.png",
      alt: "Rows of aliens from the Space Invaders game on a black background."
    },
    githubUrl: "https://github.com/mayawarrier/space_invaders_emulator",
    liveUrl: "https://mayawarrier.github.io/space_invaders_emulator/",
  },
  {
    type: ProjectType.PROJECT,
    title: "FPGA 3D Renderer Core",
    description:
      "A 3D renderer core for the DE1-SoC FPGA (in simple terms: a mini GPU). Features a fully-pipelined triangle " +
      "intersection unit, a small cache, and an SDRAM reader that reads data over an Avalon-MM bus. The FPGA's onboard " +
      "ARM processor runs our Linux device driver and a simple TCP server for remote control of the core " +
      "over any network. The images above were produced by our core.",
    image: {
      url: "/fpga-raytracing.png",
      alt: "Rendered images of a jeep and a shoe produced by the 3D renderer core. " +
        "Reflections of the jeep can be seen on the ground."
    },
    githubUrl: "https://github.com/capstone-fpga-raytracing",
  },
  {
    type: ProjectType.PROJECT,
    title: "Intel 8080 Emulator",
    description:
      "Intel 8080 CPU emulator and disassembler written in C89/ANSI C. Is optionally freestanding i.e. can run without " +
      "a host operating system. Supports the entire 8080 instruction set (including undocumented instructions), as well as " +
      "interrupts and I/O operations.",
    githubUrl: "https://github.com/mayawarrier/intel8080-emulator",
  },
  {
    type: ProjectType.PROJECT,
    title: "SI-JSON Library",
    description:
      "An experimental header-only JSON library designed to be as extensible as possible, with support for Unicode, custom allocators, " +
      "and user-defined pointers (like those from Boost.Interprocess), while remaining backwards-compatible upto C++11. Features a custom " +
      "short-string optimized string type that can store up to 31 characters without any heap allocations.",
    githubUrl: "https://github.com/mayawarrier/si-json",
  }
];

const ProjectsTab: React.FC = () => {
  return (
    <div className="px-2 lg:px-5">
      {projects.map((project, projectIdx) => {
        if (project.type === ProjectType.PROJECT) {
          return (
            <ProjectTile
              key={projectIdx}
              title={project.title}
              image={project.image}
              tileClickUrl={project.liveUrl || project.githubUrl}
              extLinks={[
                { label: "Github", icon: GithubIcon, url: project.githubUrl },
                { label: "Live", icon: PlayIcon, url: project.liveUrl }
              ]}
            >
              <ProjectTile.Desc text={project.description} />
            </ProjectTile>
          );
        } else {
          return (
            <ProjectTile
              key={projectIdx}
              title={project.title}
              tileClickUrl={project.githubUrl}
              extLinks={[
                { label: "Github", icon: GithubIcon, url: project.githubUrl },
                { label: "PRs", icon: GitPullRequestArrowIcon, url: project.contribsUrl }
              ]}
            >
              <ProjectTile.Desc text={project.description} />
              <ProjectTile.DescList title={"Contributions:"} items={project.contributions} renderHTML={true} />
            </ProjectTile>
          );
        }
      })}
    </div>
  );
};

interface WorkExpInfo {
  jobTitle: string;
  company: string;
  description: string;
  dateRange: string;
};

const workExperiences: WorkExpInfo[] = [
  {
    jobTitle: "Software Engineer of the best company on the planet ever",
    company: "Chalk.com",
    description: "Worked on eating chalk full-time.",
    dateRange: "May 2023 - Aug 2023"
  },
  {
    jobTitle: "Software Engineer",
    company: "Chalk.com",
    description: "Worked on eating chalk full-time.",
    dateRange: "May 2023 - Aug 2023"
  },
  {
    jobTitle: "Software Engineer",
    company: "Chalk.com",
    description: "Worked on eating chalk full-time.",
    dateRange: "May 2023 - Aug 2023"
  },
];

const WorkExpTab: React.FC = () => {
  const renderJobTitle = (jobTitle: string) => { 
    return <h1 className="text-lg lg:text-xl font-medium max-w-lg xl:max-w-xl">{jobTitle}</h1>;
  };
  const renderCompany = (company: string) => {
    return <h2 className="text-base lg:text-lg text-primary font-medium">{company}</h2>;
  };
  const renderDateRange = (dateRange: string) => {
    return <span className="text-muted-foreground/80 text-left md:text-right">{dateRange}</span>;
  };

  return (
    <div className="px-2 lg:px-5">
      {workExperiences.map((workExp, idx) => (
        <div className="flex flex-col">
          
          <div className="flex flex-col space-y-4 px-2 pt-2 lg:px-3 lg:pt-3 pb-9">         
            {/* title, subtitle, dates*/}
            <div className="flex flex-col md:hidden">
              {renderJobTitle(workExp.jobTitle)}
              {renderCompany(workExp.company)}
              {renderDateRange(workExp.dateRange)}
            </div>
            <div className="hidden md:flex md:flex-col">
              <div className="flex flex-row justify-between items-center gap-4">
                {renderJobTitle(workExp.jobTitle)}
                {renderDateRange(workExp.dateRange)}
              </div>
              {renderCompany(workExp.company)}
            </div>

            {/* description */}
            <p className="text-muted-foreground/80">
              {workExp.description}
            </p>
          </div>

          {/* divider */}
          <div className="px-2 mb-6 peer-hover:invisible">
            <div className="h-px bg-muted-foreground/15" />
          </div>
        </div>
      ))}
    </div>
  );
};

enum Tab {
  PROJECTS = "Projects/Open Source",
  WORK_EXP = "Work Experience"
};

export const Showcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PROJECTS);

  const tabs = [
    { name: Tab.PROJECTS, comp: ProjectsTab },
    { name: Tab.WORK_EXP, comp: WorkExpTab }
  ];

  return (
    <div className="h-auto lg:h-full w-full lg:overflow-y-auto">

      {/* tab switcher */}
      <div className="flex gap-6 sticky top-0 z-10 pt-4 lg:pt-8 px-4 lg:px-8
        border-b border-foreground/20 bg-muted2 font-medium lg:text-[1.05rem]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`py-2 relative transition-colors hover:cursor-pointer 
              ${activeTab === tab.name ?
                "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
            {activeTab === tab.name &&
              <div className="absolute bottom-0 h-px w-full bg-primary" />}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {tabs.map((tab) => {
          if (activeTab !== tab.name) {
            return null;
          }
          const Comp = tab.comp;
          return <Comp key={tab.name} />;
        })}
      </div>

    </div>
  );
};