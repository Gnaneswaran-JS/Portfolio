import { Home, User, Briefcase, FileText } from "lucide-react";
// The import path is updated to follow your project's structure for UI components
import { NavBar } from "./tubelight-navbar";

export function NavBarDemo() {
  const navItems = [
    // The URLs must match the 'id' attributes of your page sections
    { name: "Home", url: "#home", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Projects", url: "#projects", icon: Briefcase },
    { name: "Resume", url: "#resume", icon: FileText },
  ];

  return <NavBar items={navItems} />;
}

