import { useEffect, ReactNode, RefObject } from "react";
import { NavLink, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { GithubIcon, PlayIcon, GitPullRequestArrowIcon } from "lucide-react";
import { ShowcaseTile } from "./showcase-tile";
import { Bold } from "./utils";
import opengl3dcityImgUrl from "../assets/opengl-3dcity.jpg?url";
import spaceInvadersImgUrl from "../assets/space-invaders.png?url";
import fpgaRaytracingImgUrl from "../assets/fpga-raytracing.png?url";

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
        <Bold>{"3 times faster than Microsoft's"}</Bold>{" implementation, and one of the fastest integer parsers "}
        {"in the standard library (see "}
        <ShowcaseTile.Link href="https://github.com/alugowski/parse-bench?tab=readme-ov-file#results" isExternal>
          {"benchmarks"}
        </ShowcaseTile.Link>{")."}
      </>,
      "Improved floating-point parsing performance by 10% for Unicode (UTF-16) strings using x86 SIMD.",
      "Added support for the JSON numeric format (compliant to RFC 8259).",
    ],
    githubUrl: "https://github.com/fastfloat/fast_float",
    contribsUrl: "https://github.com/fastfloat/fast_float/pulls?q=is%3Apr+author%3Amayawarrier"
  },
  {
    type: ProjectType.PROJECT,
    title: "3D City Renderer",
    description:
      "Interactive 3D city renderer using real-world map data, running in my 3D engine built from scratch over OpenGL. " +
      "Can render the London map extract (30M vertices, 6.5M triangles, 1.7M OSM entities) real-time at 60+ fps.",
    image: {
      url: opengl3dcityImgUrl,
      alt: "On the left, a 3D map of London with the river Thames passing through. " +
        "On the right, a 3D map of downtown Toronto."
    },
    githubUrl: "https://github.com/mayawarrier/opengl_3dcity",
  },
  {
    type: ProjectType.PROJECT,
    title: "Space Invaders Emulator",
    description:
      "Emulation of the Space Invaders arcade cabinet (similar in spirit to QEMU). Behaves like a virtual machine, " +
      "running the game's original 1978 binary on a simulated Intel 8080 CPU. Can run natively or in a browser (thanks to WASM).",
    image: {
      url: spaceInvadersImgUrl,
      alt: "Rows of aliens from the Space Invaders game on a black background."
    },
    githubUrl: "https://github.com/mayawarrier/space_invaders_emulator",
    liveUrl: "https://mayawarrier.github.io/space_invaders_emulator/",
  },
  {
    type: ProjectType.PROJECT,
    title: "3D Renderer FPGA Core",
    description:
      "A 3D renderer core for the DE1-SoC FPGA (in simple terms: a mini GPU). Includes a fully-pipelined triangle " +
      "intersection core, a caching hierarchy, and an Avalon-MM SDRAM reader. The core is controlled by a custom " +
      "Linux device driver running on the onboard ARM A9 processor, and a TCP server allows sending new render jobs without " +
      "reprogramming the device.",
    image: {
      url: fpgaRaytracingImgUrl,
      alt: "Rendered images of a jeep and a shoe produced by the 3D renderer core. " +
        "Reflections of the jeep can be seen on the ground."
    },
    githubUrl: "https://github.com/capstone-fpga-raytracing",
  },
  {
    type: ProjectType.PROJECT,
    title: "Intel 8080 Emulator",
    description:
      "Intel 8080 CPU emulator and disassembler written in C89/ANSI C. Optionally freestanding i.e. can run without " +
      "a host operating system. Supports the entire 8080 instruction set (including undocumented instructions), as well as " +
      "interrupts and I/O operations.",
    githubUrl: "https://github.com/mayawarrier/intel8080-emulator",
  },
  {
    type: ProjectType.PROJECT,
    title: "SI-JSON Library",
    description:
      "An experimental header-only JSON library designed to be as extensible as possible, with support for Unicode, custom allocators, " +
      "and user-defined pointers (like those from Boost.Interprocess), while remaining backwards-compatible up to C++11. Features a custom " +
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
            <ShowcaseTile
              key={projectIdx}
              title={project.title}
              image={project.image}
              tileUrl={project.liveUrl || project.githubUrl}
              extLinks={[
                { label: "Github", icon: GithubIcon, url: project.githubUrl },
                { label: "Live", icon: PlayIcon, url: project.liveUrl }
              ]}
            >
              <ShowcaseTile.Desc text={project.description} />
            </ShowcaseTile>
          );
        } else {
          return (
            <ShowcaseTile
              key={projectIdx}
              title={project.title}
              tileUrl={project.githubUrl}
              extLinks={[
                { label: "Github", icon: GithubIcon, url: project.githubUrl },
                { label: "PRs", icon: GitPullRequestArrowIcon, url: project.contribsUrl }
              ]}
            >
              <ShowcaseTile.Desc text={project.description} />
              <ShowcaseTile.DescList
                title={"My contributions:"}
                items={project.contributions}
              />
            </ShowcaseTile>
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
    jobTitle: "Software Engineer",
    company: "Manulife",
    bullets: [
      <>
        {"Led development of our in-house "}<Bold>{"GPU-accelerated"}</Bold>{" liability valuation engine using "}<Bold>{"CUDA"}</Bold>
        {", closely matching performance of a vendor solution costing "}<Bold>{"millions of dollars annually."}</Bold>
      </>,
      <>
        {"Single-handedly built a new "}<Bold>{"high-frequency"}</Bold>{" .NET report application, powering all reports"}
        {" for a major Life Insurance product — delivered "}<Bold>{"end-to-end in 6 months"}</Bold>{", speeding up project delivery by "}
        {"3 months. Received an "}<Bold>{"award from the CIO"}</Bold>{" for my contributions."}
      </>,
      <>
        {"Built new features in React + Node, and managed critical Azure cloud infrastructure (including Redis caches and "}
        {"MongoDB instances) for a consumer-facing web app serving "}<Bold>{"thousands of users"}</Bold>{" in Canada."}
      </>
    ],
    dateRange: "June 2024 – Present"
  },
  {
    jobTitle: "Software Engineer (Co-Op)",
    company: "Rocscience",
    bullets: [
      <>
        {"Co-developed the core library for a new line of 2D geotechnical CAD software using "}
        <Bold>{"C++/CUDA"}</Bold>{", "}<Bold>{".NET"}</Bold>{" and "}<Bold>{"WPF."}</Bold>
      </>,
      <>
        {"Optimized the "}<Bold>{"C++/CUDA"}</Bold>{" compute engine by extracting field-point computations into a dedicated solver. "}
        {"This enabled "}<Bold>{"interactive speeds"}</Bold>{" where "}<Bold>{"previously"}</Bold>{" computations could take "}
        <Bold>{"tens of minutes"}</Bold>{" or longer."}
      </>,
      <>
        {"Built Rocscience's in-house JSON library, using .NET IL "}<Bold>{"(.NET assembly language)"}</Bold>
        {" to autogenerate fast serialization code."}
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
        {"Co-developed "}<Bold>{"city-builder"}</Bold>{" in "}<Bold>{"Unity3D"}</Bold>
        {", a cross-platform tool for urban planning and civil engineering research."}
      </>,
      "Designed a custom file format and supporting graphical tools to represent cities, roads, " +
      "and lanes, and to customize their sizes, types, signage etc."
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
        <div 
          key={workExpIdx} 
          className="flex flex-col"
        >
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

  const curPathIsValid = isValidTabPath(location.pathname);
  return (
    <div ref={ref} className="h-full w-full lg:overflow-y-auto">
      {/* tab bar */}
      <div 
        className="flex gap-6 sticky top-0 z-10 pt-4 lg:pt-8 px-4 lg:px-8
        border-b border-foreground/20 bg-tab-bar-bg font-medium lg:text-[1.05rem]"
      >
        {tabs.map((tab, tabIdx) => {
          const isActive = location.pathname === tab.path || 
            (!curPathIsValid && tab.path === defaultTab.path);
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
      <div className="pt-4 bg-showcase-bg">
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