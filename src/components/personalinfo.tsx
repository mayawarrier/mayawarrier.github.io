import { useEffect, useState } from "react"


export const PersonalInfo: React.FC = () => {
  return (
    <div className="max-w-lg px-8 space-y-8">

      <div className="space-y-4"> 
        <h1 className="text-5xl font-bold">Maya Warrier</h1>
        <p className="text-xl text-muted-foreground font-medium">
          Systems Programmer & Software Engineer
        </p>
      </div>
      
      <div className="text-lg text-muted-foreground leading-relaxed">
        Specializing in low-level systems programming, emulation, and high-performance computing. 
        Currently building full-stack solutions at Manulife with expertise in C++, graphics programming, 
        and FPGA development.
      </div>

      <div className="flex flex-col">
        <button className="btn">Contact</button>
        <button className="btn">Projects</button>
      </div>

    </div>
  );
}