import { useState, ReactNode } from "react";
import { GithubIcon, PlayIcon, GitPullRequestArrowIcon } from "lucide-react";
import { ProjectTile } from "./project-tile";
import { Bold } from "./utils";

enum ProjectType {
  PROJECT = "Project",
  OPEN_SRC = "OpenSrc"
};

interface ProjectInfo {
  type: ProjectType.PROJECT;
  title: string;
  description: ReactNode;
  image?: {
    url: string;
    alt: string;
  };
  githubUrl: string;
  liveUrl?: string;
  technologies?: string[];
}

interface OpenSrcProjectInfo {
  type: ProjectType.OPEN_SRC;
  title: string;
  description: ReactNode;
  contributions: ReactNode[];
  githubUrl: string;
  contribsUrl: string;
};

type ShowcaseProjectInfo = ProjectInfo | OpenSrcProjectInfo;

const projects: ShowcaseProjectInfo[] = [
  {
    type: ProjectType.OPEN_SRC,
    title: "fast_float",
    description:
      "High-performance floating-point and integer parsing library; 4x to 10x faster than strtod, " +
      "part of GCC 12, MySQL, Redis, WebKit, and all major web browsers (Microsoft Edge, Google Chrome, Opera, and Safari).",
    contributions: [
      <>
        {"Wrote the new integer parser, which is among the "}
        <span className="font-bold">{"fastest"}</span>
        {" C++ integer parsers in "}
        <ProjectTile.Link href="https://github.com/alugowski/parse-bench?tab=readme-ov-file#results" isExternal>
          {"benchmarks"}
        </ProjectTile.Link>{", and is about 2-3x faster than Microsoft's from_chars() implementation."}
      </>,
      "Improved floating-point parsing performance by 10% for Unicode (UTF-16) strings using x86 SIMD.",
      "Added support for the JSON numeric format (compliant to RFC 8259).",
    ],
    githubUrl: "https://github.com/fastfloat/fast_float",
    contribsUrl: "https://github.com/fastfloat/fast_float/pulls?q=is%3Apr+author%3Amayawarrier"
  },
  {
    type: ProjectType.PROJECT,
    title: "3D Mapper",
    description:
      "Interactive 3D map viewer using real-world data, running in my OpenGL-based 3D engine. " +
      "I'm currently working on increasing map accuracy and adding support for textures and lighting.",
    image: {
      url: "/opengl-3dcity.png",
      alt: "3D map of Toronto from an aerial view, showing buildings and roads."
    },
    githubUrl: "https://github.com/mayawarrier/opengl_3dcity",
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
              <ProjectTile.DescList
                title={"My contributions:"}
                items={project.contributions}
              />
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
  bullets: ReactNode[];
  dateRange: string;
};

const workExperiences: WorkExpInfo[] = [
  {
    jobTitle: "Full Stack Software Engineer",
    company: "Manulife",
    bullets: [
      <>
        {"Co-designed and implemented our in-house "}<Bold>{"GPU-accelerated"}</Bold>
        {" liability valuation engine using "}<Bold>{"Python"}</Bold>{" and Numba "}<Bold>{"CUDA"}</Bold>
        {", closely matching the performance of an external vendor solution costing "}<Bold>{"millions of dollars annually."}</Bold>
      </>,
      <>
        {"Designed and developed the new "}<Bold>{".NET"}</Bold>{"-based"}
        {" report loader powering all new reports for a major Life Insurance product. The system was delivered end-to-end in 6 months " +
          "and sped up project delivery by 3 months, receiving "}<Bold>{"CIO-level recognition."}</Bold>
      </>,
      <>
        {"Worked on a consumer-facing web app serving thousands of users in North America, developing and shipping features using "}
        <Bold>{"TypeScript, React, Node.js, and Express."}</Bold>
      </>,
      <>
        {"Worked on cloud infrastructure, using "}<Bold>{"Terraform"}</Bold>{" to maintain and evolve shared "}
        <Bold>{"Azure"}</Bold>{" resources including "}<Bold>{"Redis"}</Bold>{" caches, "}<Bold>{"MongoDB"}</Bold>{" instances"}
        {" and associated networking across multiple environments."}
      </>,
    ],
    dateRange: "June 2024 - Present"
  },
  {
    jobTitle: "Software Engineer (Co-Op)",
    company: "Rocscience",
    bullets: [
      <>
        {"Co-developed the core library for Rocscience’s then upcoming line of 2D geotechnical CAD software using "}
        <Bold>{".NET, WPF"}</Bold>{" and "}<Bold>{"C++/CUDA."}</Bold>
      </>,
      <>
        {"Built our in-house JSON library, using "}<Bold>{".NET IL"}</Bold>
        {" (intermediate assembly language) to autogenerate fast serialization code for any class."}
      </>,
      <>
        {"Designed an "}<Bold>{"automated Undo/Redo"}</Bold>{" system that worked by comparing differences between two application states " +
          "(similar to React), eliminating the need to manually implement undo/redo logic for every change."}
      </>,
      <>
        {"Optimized the "}<Bold>{"C++/CUDA"}</Bold>
        {" compute engine by extracting field-point computations into a dedicated solver. This enabled interactive field-point changes " +
          "where previously computations could take tens of minutes or longer."}
      </>
    ],
    dateRange: "May 2020 - Sep 2021"
  },
  {
    jobTitle: "Software Engineer Intern",
    company: "Rocscience",
    bullets: [
      <>
        {"Developed 3D CAD tools in "}<Bold>{"C#"}</Bold>{" and "}<Bold>{".NET WPF"}</Bold>
        {" for Rocscience’s Examine3 geotechnical analysis product."}
      </>,
      "Built the foundation of Examine3's field-point contouring and visualization tools, and " +
      "migrated the legacy graphing system to Examine3."
    ],
    dateRange: "May 2019 – Aug 2019"
  },
  {
    jobTitle: "Research Assistant",
    company: "University of Toronto",
    bullets: [
      <>
        {"Co-developed "}<Bold>{"\"city-builder\""}</Bold>{" in "}<Bold>{"Unity3D"}</Bold>
        {", a cross-platform tool for urban planning and civil engineering research."}
      </>,
      <>
        {"Designed a "}<Bold>{"JSON-based"}</Bold>
        {" file format and supporting APIs to represent cities, roads, and lanes, and to customize " +
          "their sizes, types, signage etc."}
      </>
    ],
    dateRange: "Dec 2017 – Jan 2019"
  }
];

const WorkExpTab: React.FC = () => {
  const renderJobTitle = (jobTitle: string) => {
    return <h1 className="text-lg lg:text-xl font-medium max-w-lg xl:max-w-xl">{jobTitle}</h1>;
  };
  const renderCompany = (company: string) => {
    return <h2 className="text-base lg:text-lg text-primary font-medium">{company}</h2>;
  };
  const renderDateRange = (dateRange: string) => {
    return <span className="text-muted-foreground/90 text-left md:text-right">{dateRange}</span>;
  };

  return (
    <div className="px-2 lg:px-5 pt-3">
      {workExperiences.map((workExp, workExpIdx) => (
        <div key={workExpIdx} className="flex flex-col">

          <div className="flex flex-col space-y-3 px-2 lg:px-3 pb-8">
            {/* title, subtitle, dates*/}
            <div className="flex flex-col md:hidden space-y-0.5 p-1">
              {renderJobTitle(workExp.jobTitle)}
              {renderCompany(workExp.company)}
              {renderDateRange(workExp.dateRange)}
            </div>
            <div className="hidden md:flex md:flex-col space-y-0.5 p-1">
              <div className="flex flex-row justify-between items-center gap-4">
                {renderJobTitle(workExp.jobTitle)}
                {renderDateRange(workExp.dateRange)}
              </div>
              {renderCompany(workExp.company)}
            </div>

            {/* description */}
            <ul className="list-disc pl-7 text-muted-foreground/80">
              {workExp.bullets.map((desc, descIdx) => <li key={descIdx}>{desc}</li>)}
            </ul>
          </div>

          {/* divider */}
          <div className="px-2 mb-6">
            <div className="h-px bg-muted-foreground/15" />
          </div>
        </div>
      ))}
    </div>
  );
};

enum TabType {
  PROJECTS = "Projects",
  WORK_EXP = "WorkExp"
};

interface TabInfo {
  type: TabType;
  name: string;
  hash: string;
  comp: React.FC;
};

export const Showcase: React.FC = () => {
  const [activeTabType, setActiveTabType] = useState<TabType>(TabType.PROJECTS);

  const tabs: TabInfo[] = [
    { type: TabType.PROJECTS, name: "Projects/Open Source", hash: "projects", comp: ProjectsTab },
    { type: TabType.WORK_EXP, name: "Work Experience", hash: "work-experience", comp: WorkExpTab }
  ];

  const setActiveTab = (tab: TabInfo) => {
    window.location.hash = tab.hash;
    setActiveTabType(tab.type);
  };

  return (
    <div className="h-auto lg:h-full w-full lg:overflow-y-auto">

      {/* tab switcher */}
      <div className="flex gap-6 sticky top-0 z-10 pt-4 lg:pt-8 px-4 lg:px-8
        border-b border-foreground/20 bg-muted2 font-medium lg:text-[1.05rem]">
        {tabs.map((tab, tabIdx) => (
          <button
            key={tabIdx}
            className={`py-2 relative transition-colors hover:cursor-pointer 
              ${activeTabType === tab.type ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
            {activeTabType === tab.type && <div className="absolute bottom-0 h-px w-full bg-primary" />}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {tabs.map((tab) => {
          if (activeTabType !== tab.type) {
            return null;
          }
          const Comp = tab.comp;
          return <Comp key={tab.name} />;
        })}
      </div>

    </div>
  );
};