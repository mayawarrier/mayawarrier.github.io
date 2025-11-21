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
      githubUrl: "https://github.com/capstone-fpga-raytracing/github",
    },
    {
      title: "Space Invaders Emulator",
      description:
        "Complete emulation of the classic 1978 Space Invaders arcade cabinet, faithfully recreating the original hardware behavior and gaming experience.",
      imageUrl: "/space-invaders-1978-arcade-game-retro-pixel-art.jpg",
      technologies: ["C++", "Game Emulation", "Graphics Programming", "Audio Processing"],
      githubUrl: "https://github.com/maya-warrier/space_invaders_emulator",
      liveUrl: "https://mayawarrier.github.io/space_invaders_emulator/",
    },
    {
      title: "Intel 8080 Emulator",
      description:
        "Complete Intel 8080 CPU emulator and disassembler written in C89/ANSI C. Features cycle-accurate emulation and comprehensive instruction set support for vintage computing preservation.",
      imageUrl: "/vintage-intel-8080-cpu-processor-emulation-retro-c.jpg",
      technologies: ["C89/ANSI C", "CPU Emulation", "Assembly", "Computer Architecture"],
      githubUrl: "https://github.com/maya-warrier/intel8080-emulator",
    },
    {
      title: "OpenGL 3D City",
      description:
        "Interactive 3D city visualization built with OpenGL featuring real-time rendering, dynamic lighting, and procedural building generation.",
      imageUrl: "/opengl-3d-city-rendering.jpg",
      technologies: ["C++", "OpenGL", "3D Graphics", "Shader Programming"],
      githubUrl: "https://github.com/maya-warrier/opengl_3dcity",
    },
    {
      title: "SI-JSON Library",
      description:
        "Experimental header-only JSON library for C++ designed for high performance and ease of integration. Features custom allocators and optimized parsing for embedded systems.",
      technologies: ["C++", "JSON Parsing", "Header-Only Library", "Memory Management"],
      githubUrl: "https://github.com/maya-warrier/si-json",
    }
  ];

  return (
    <div className="pt-8">
      {projects.map((project) => (
        <div key={project.title} className="flex flex-col">

          {project.imageUrl && (
            <img
              src={project.imageUrl}
              className="w-full h-48 object-cover object-center rounded-md"
            />
          )}

          <div className="flex flex-row gap-6 justify-between py-4 px-1">

            <div className="flex flex-col gap-4">
              <h3 className="text-lg lg:text-xl font-medium">{project.title}</h3>
              <p className="text-muted-foreground max-w-3xl">
                {project.description}
              </p>
            </div>

            <div className="flex flex-row gap-2 text-muted-foreground">
              <div className="flex flex-row gap-1">
                <GithubIcon className="h-5 w-5" />
                <span>Code</span>
              </div>
              <div className="flex flex-row gap-1">
                <ExternalLinkIcon className="h-5 w-5" />
                <span>Live</span>
              </div>
            </div>

          </div>


          {/* <div className="mx-auto lg:mx-0 h-px w-full bg-muted-foreground/10 my-10" /> */}
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
        border-b border-foreground/20 bg-muted2 font-medium text-md xl:text-lg transition-colors">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`py-2 relative ${activeTab === tab.name ?
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