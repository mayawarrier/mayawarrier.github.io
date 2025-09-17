
import { useEffect, useState } from "react"
//import { Button } from "@/components/ui/button"
import { Github, Linkedin, FileText, ChevronDown } from "lucide-react"

export function HeroHome() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Systems Programmer & Software Engineer"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const Button = (props: any) => <button {...props} />

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background via-background to-secondary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">Maya Warrier</h1>
          <div className="h-8 mb-8">
            <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            Specializing in low-level systems programming, emulation, and high-performance computing. Currently building
            full-stack solutions at Manulife with expertise in C++, graphics programming, and FPGA development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <a href="#projects" className="flex items-center gap-2">
                View My Work
                <ChevronDown className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
            >
              <a href="#contact" className="flex items-center gap-2">
                Get In Touch
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/mayawarrier"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-200 group border border-border"
            >
              <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/maya-warrier"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 group border border-border"
            >
              <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://mayawarrier.github.io/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-200 group border border-border"
            >
              <FileText className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="sr-only">Resume</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-secondary/15 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-20 w-12 h-12 bg-accent/10 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />
    </section>
  )
}
