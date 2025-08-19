import React from "react";
import {
  ChevronDown,
  Menu,
  Search,
  Bell,
  X,
  Minimize2,
  Maximize2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useContext } from "react";
import { ParentContext } from "../../ParentContext/ParentContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    toggleCollapse,
    isCollapsed,
    setIsCollapsed,
    headerComponentRender,
    isFullscreen,
    setIsFullscreen,
    showSummary,
    setShowSummary,
  } = useContext(ParentContext);

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header
      className={`bg-background shadow-sm border-b px-4 lg:px-8 py-4  ${
        isFullscreen ? "fixed top-0 left-0 right-0 z-50 " : ""
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button - Always show on mobile */}
        <div className="lg:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMobileMenuToggle}
            className="p-1.5 text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex-1 flex justify-center lg:justify-start lg:ml-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            {headerComponentRender}
          </h1>
        </div>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFullscreenToggle}
            className="h-8 px-2"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
            <span className="ml-1 hidden lg:inline">
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
