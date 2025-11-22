import { useState } from "react";
import { GithubIcon, ExternalLinkIcon } from "lucide-react"

const ProjectsTab: React.FC = () => {

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
      title: "FPGA Ray-Tracing Engine",
      description:
        "3D Graphics ray-tracing core implemented for the DE1-SoC FPGA board with remote Ethernet operation. Demonstrates advanced hardware programming and real-time graphics rendering on FPGA.",
      imageUrl: "/fpga-raytracing.jpg",
      technologies: ["FPGA", "Verilog", "Ray-Tracing", "3D Graphics", "Hardware Design"],
      githubUrl: "https://github.com/capstone-fpga-raytracing",
    },
    {
      title: "Space Invaders Emulator",
      description:
        "Complete emulation of the classic 1978 Space Invaders arcade cabinet, faithfully recreating the original hardware behavior and gaming experience.",
      imageUrl: "/space-invaders-1978-arcade-game-retro-pixel-art.jpg",
      technologies: ["C++", "Game Emulation", "Graphics Programming", "Audio Processing"],
      githubUrl: "https://github.com/mayawarrier/space_invaders_emulator",
      liveUrl: "https://mayawarrier.github.io/space_invaders_emulator/",
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
      title: "OpenGL 3D City",
      description:
        "Interactive 3D city visualization built with OpenGL featuring real-time rendering, dynamic lighting, and procedural building generation.",
      imageUrl: "/opengl-3d-city-rendering.jpg",
      technologies: ["C++", "OpenGL", "3D Graphics", "Shader Programming"],
      githubUrl: "https://github.com/mayawarrier/opengl_3dcity",
    },
    {
      title: "SI-JSON Library",
      description:
        "Experimental header-only JSON library for C++ designed for high performance and ease of integration. Features custom allocators and optimized parsing for embedded systems.",
      technologies: ["C++", "JSON Parsing", "Header-Only Library", "Memory Management"],
      githubUrl: "https://github.com/mayawarrier/si-json",
    }
  ];

  return (
    <div className="pt-8">
      {projects.map((project) => (
        <div key={project.title} className="flex flex-col">

          <div className="flex flex-col space-y-4">
            {project.imageUrl && (
              <div className="pt-2">
                <img
                  src={project.imageUrl}
                  className="w-full h-48 object-cover object-center rounded-md"
                />
              </div>
            )}

            <div className="flex flex-row gap-2 justify-between pb-4 px-1">
              {/* content */}
              <a
                href={project.liveUrl || project.githubUrl}
                className="flex flex-col gap-4 group"
              >
                <h3 className="text-lg lg:text-xl font-medium 
                text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground/80 
                  group-hover:text-foreground/60 transition-colors">
                  {project.description}
                </p>
              </a>

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
                      className="flex flex-row items-center justify-center gap-1 py-1 px-2
                        text-muted-foreground border-muted-foreground/30 border-1 rounded-md 
                        hover:text-accent hover:border-accent transition-colors">
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:block">{obj.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mx-auto lg:mx-0 h-px w-full bg-muted-foreground/15 mt-4 mb-6" />
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
  PROJECTS = "Projects/Open-Source",
  WORKEXP = "Work Experience"
};

export const Showcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PROJECTS);

  const tabs = [
    { name: Tab.PROJECTS, comp: ProjectsTab },
    { name: Tab.WORKEXP, comp: WorkExpTab }
  ];

  return (
    <div className="h-auto lg:h-full w-full lg:overflow-y-auto bg-muted2 p-4 pt-0 lg:p-8 lg:pt-0">

      {/* tab switcher */}
      <div className="flex gap-6 sticky top-0 z-10 pt-4 lg:pt-8
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
            {activeTab === tab.name && <div className="absolute bottom-0 h-px w-full bg-primary" />}
          </button>
        ))}
      </div>

      {tabs.map((tab) => {
        if (activeTab !== tab.name) {
          return null;
        }
        const Comp = tab.comp;
        return <Comp key={tab.name} />;
      })}

    </div>
  );
};