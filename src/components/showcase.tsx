import { useEffect, ReactNode, RefObject } from "react";
import { NavLink, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
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
        {"Wrote the new from_chars() integer parser with speeds of over 850MB/s - over "}
        <Bold>{"3 times faster than Microsoft's"}</Bold>{" version, and one of the fastest integer parsers "}
        {"in the standard library (see "}
        <ProjectTile.Link href="https://github.com/alugowski/parse-bench?tab=readme-ov-file#results" isExternal>
          {"benchmarks"}
        </ProjectTile.Link>{" )."}
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
              tileUrl={project.liveUrl || project.githubUrl}
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
              tileUrl={project.githubUrl}
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
        {"Designed and built a new report loader that powers "}<Bold>{"all new reports"}</Bold>{" for a major Life Insurance product. The system was "}
        {"delivered "}<Bold>{"end-to-end in 6 months"}</Bold>{" and sped up project delivery by 3 months, receiving CIO-level recognition."}
      </>,
      <>
        {"Built new features in React + Node and "}<Bold>{"maintained critical Azure"}</Bold>{" cloud infrastructure like Redis caches and MongoDB instances "}
        {"for a consumer-facing web app to onboard new insurance customers, serving thousands of users in Canada."}
      </>
    ],
    dateRange: "June 2024 – Present"
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
        {"Built a new Undo/Redo system that works by generating the minimum diff between two object hierarchies "}
        {"(similar to React's VDOM diffing algorithm), eliminating the need to manually implement undo/redo logic for every change."}
      </>,
      <>
        {"Built our in-house JSON library, using "}<Bold>{".NET IL"}</Bold>{" (intermediate assembly language) to autogenerate fast serialization code."}
      </>,
      <>
        {"Optimized the "}<Bold>{"C++/CUDA"}</Bold>{" compute engine by extracting field-point computations into a dedicated solver. "}
        {"This enabled "}<Bold>{"interactive speeds"}</Bold>{" where "}<Bold>{"previously"}</Bold>{" computations could take "}
        <Bold>{"tens of minutes "}</Bold>{" or longer."}
      </>
    ],
    dateRange: "May 2020 – Sep 2021"
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
      "Designed a custom file format and supporting APIs to represent cities, roads, and lanes, and " +
      "to customize their sizes, types, signage etc."
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

interface TabInfo {
  path: string;
  label: string;
  comp: React.FC;
};

export const Showcase: React.FC<{ ref: RefObject<HTMLDivElement | null> }> = ({ ref }) => {
  const location = useLocation();
  const navType = useNavigationType();

  const tabs: TabInfo[] = [
    { path: "/projects", label: "Projects/Open Source", comp: ProjectsTab },
    { path: "/work-experience", label: "Work Experience", comp: WorkExpTab },
  ];
  const defaultTab = tabs[0];
  const DefaultTabComp = defaultTab.comp;

  const isValidTabPath = (pathname: string): boolean => {
    return !!pathname && tabs.some(tab => pathname === tab.path);
  };

  // hack: reset scroll when navigating between tabs.
  useEffect(() => {
    if (ref.current && navType !== "POP" && isValidTabPath(location.pathname)) {
      const elem = ref.current;
      if (elem.scrollHeight > elem.clientHeight) {
        elem.scrollTo({ top: 0 });
      }
      else {
        const rect = elem.getBoundingClientRect();
        const coversEntireViewport = rect.top <= 0 && rect.bottom >= window.innerHeight;
        if (coversEntireViewport) {
          elem.scrollIntoView({ block: "start" });
        }
      }
    }
  }, [location, navType]);

  // hack: scroll the showcase into view if the user visits the site thru a tab link 
  // (only on first page load).
  useEffect(() => {
    if (ref.current && isValidTabPath(location.pathname)) {
      const navEntry = performance.getEntriesByType("navigation")[0]; // always one entry
      const navType = (navEntry as PerformanceNavigationTiming)?.type;
      if (navType === "navigate") {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  const locationIsValid = isValidTabPath(location.pathname);
  return (
    <div
      ref={ref}
      className="h-full w-full lg:overflow-y-auto"
    >
      {/* tab bar */}
      <div className="flex gap-6 sticky top-0 z-10 pt-4 lg:pt-8 px-4 lg:px-8
        border-b border-foreground/20 bg-muted2 font-medium lg:text-[1.05rem]"
      >
        {tabs.map((tab, tabIdx) => {
          const isActive = location.pathname === tab.path ||
            (!locationIsValid && tab.path === defaultTab.path)
          return (
            <NavLink
              key={tabIdx}
              to={tab.path}
              className={`py-2 relative transition-colors hover:cursor-pointer 
              ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab.label}
              {isActive && <div className="absolute bottom-0 h-px w-full bg-primary" />}
            </NavLink>
          );
        })}
      </div>

      {/* content/routes */}
      <div className="pt-4">
        <Routes>
          <Route index element={<DefaultTabComp />} />
          {tabs.map((tab) => {
            const Comp = tab.comp;
            return <Route path={tab.path} element={<Comp />} />;
          })}
        </Routes>
      </div>

    </div>
  );
};