import { useState } from "react";
import { GithubIcon, ExternalLinkIcon } from "lucide-react"

interface ProjectInfo {
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}

const projects: Array<ProjectInfo> = [
  // {
  //   title: "fast_float",
  //   description:
  //     "High-performance C++ implementation of from_chars functions for number types, achieving 4x to 10x speed improvements over standard library implementations. Part of GCC 12, Chromium, Redis and WebKit/Safari.",
  //   technologies: ["C++", "Performance Optimization", "Compiler Integration", "Benchmarking"],
  //   githubUrl: "https://github.com/fastfloat/fast_float",
  // },
  {
    title: "3D Mapper",
    description:
      "Interactive 3D map viewer using real-world data, running in my custom OpenGL-based 3D engine. " +
      "I'm currently working on increasing map accuracy and adding support for textures and lighting to my engine.",
    imageUrl: "/opengl-3dcity.png",
    technologies: ["C++", "OpenGL", "3D Graphics", "Shader Programming"],
    githubUrl: "https://github.com/mayawarrier/opengl_3dcity",
  },
  {
    title: "Space Invaders Emulator",
    description:
      "Emulation of the classic Space Invaders arcade cabinet. Works like a virtual machine, running the game's original 1978 binary " +
      "on a simulated Intel 8080 CPU. Can run natively or in a browser (thanks to WASM).",
    imageUrl: "/space-invaders.png",
    technologies: ["C++", "Game Emulation", "Graphics Programming", "Audio Processing"],
    githubUrl: "https://github.com/mayawarrier/space_invaders_emulator",
    liveUrl: "https://mayawarrier.github.io/space_invaders_emulator/",
  },
  {
    title: "FPGA 3D Renderer Core",
    description:
      "A 3D renderer built almost entirely in hardware. Features a fully-pipelined triangle intersection unit and a small cache, and reads " +
      "data from SDRAM over an Avalon-MM bus. Includes a custom Linux driver and a TCP server for remote control over any network. " +
      "The images above were produced by our core.",
    imageUrl: "/fpga-raytracing.png",
    technologies: ["FPGA", "Verilog", "Ray-Tracing", "3D Graphics", "Hardware Design"],
    githubUrl: "https://github.com/capstone-fpga-raytracing",
  }, 
  {
    title: "Intel 8080 Emulator",
    description:
      "Complete Intel 8080 CPU emulator and disassembler written in C89/ANSI C. Features cycle-accurate emulation and comprehensive instruction set support for vintage computing preservation.",
    imageUrl: "/vintage-intel-8080-cpu-processor-emulation-retro-c.jpg",
    technologies: ["C89/ANSI C", "CPU Emulation", "Assembly", "Computer Architecture"],
    githubUrl: "https://github.com/mayawarrier/intel8080-emulator",
  },
  {
    title: "SI-JSON Library",
    description:
      "Experimental header-only JSON library for C++ designed for high performance and ease of integration. Features custom allocators and optimized parsing for embedded systems.",
    technologies: ["C++", "JSON Parsing", "Header-Only Library", "Memory Management"],
    githubUrl: "https://github.com/mayawarrier/si-json",
  }
];


const ProjectsTab: React.FC = () => {
  return (
    <div className="pt-6">
      {projects.map((project) => (
        <div key={project.title} className="flex flex-col">

          <div
            onClick={() => window.open(project.liveUrl || project.githubUrl, "_self")}
            className="flex flex-col space-y-4 group peer px-2 pt-2 pb-9
              hover:bg-muted/90 hover:cursor-pointer transition-colors rounded-lg"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                className="w-full h-48 object-cover object-center rounded-md" />
            )}

            <div className="flex flex-row gap-2 justify-between p-1">
              {/* content */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg lg:text-xl font-medium 
                  text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground/80 
                  group-hover:text-foreground/60 transition-colors">
                  {project.description}
                </p>
              </div>

              {/* links */}
              <div className="flex flex-row items-start gap-2 text-sm">
                {[
                  { url: project.githubUrl, icon: GithubIcon, label: "GitHub" },
                  { url: project.liveUrl, icon: ExternalLinkIcon, label: "Live" }
                ].map((obj, idx) => {
                  if (!obj.url) {
                    return null;
                  }
                  const Icon = obj.icon;
                  return (
                    <a
                      key={idx}
                      href={obj.url}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="flex flex-row items-center justify-center gap-1 py-1 px-2
                        text-muted-foreground border-muted-foreground/30 border-1 rounded-md 
                        hover:text-accent hover:border-accent transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:block">{obj.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-2 mb-6 peer-hover:invisible">
            <div className="h-px bg-muted-foreground/15" />
          </div>
        </div>
      ))}
    </div>
  );
};

const WorkExpTab: React.FC = () => {
  const rows = [];
  for (let i = 0; i < 200; i++) {
    rows.push(<div>Experience</div>);
  }
  return (
    <div>{rows}</div>
  );
};

enum Tab {
  PROJECTS = "Projects",
  OPEN_SOURCE = "Open Source",
  WORK_EXP = "Work Experience"
};

export const Showcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PROJECTS);

  const tabs = [
    { name: Tab.PROJECTS, comp: ProjectsTab },
    { name: Tab.OPEN_SOURCE, comp: WorkExpTab },
    { name: Tab.WORK_EXP, comp: WorkExpTab }
  ];

  return (
    <div className="h-auto lg:h-full w-full lg:overflow-y-auto bg-muted2">

      {/* tab switcher */}
      <div className="flex gap-6 sticky top-0 z-10 pt-4 lg:pt-8 px-4 lg:px-8
        border-b border-foreground/20 bg-muted2 font-medium text-md xl:text-lg">
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

      <div className="px-2 lg:px-6">
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