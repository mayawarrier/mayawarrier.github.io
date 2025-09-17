import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home", type: "internal" },
    { href: "/experience", label: "Experience", type: "internal" },
    { href: "/open-source", label: "Open Source", type: "internal" },
    { href: "/#projects", label: "Projects", type: "anchor" },
    { href: "/#contact", label: "Contact", type: "anchor" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-bordercol" : "bg-transparent"
        }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl">
            <a href="/" className="text-foreground hover:text-accent transition-colors">
              Maya Warrier
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                if (item.type === "internal") {
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        `transition-colors duration-200 font-medium ${
                          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                } else {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </a>
                  )
                }
              })}
              {/* <ThemeToggle /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};