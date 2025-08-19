import { useState, useContext, useRef, useEffect } from "react";
import { 
  Home, X, LogOut, BarChart3, Users, ShoppingCart, Calendar, Settings, 
  ChevronDown, ChevronRight, Menu, Building2, GitBranch, Network, 
  FileText, ShieldCheck, Package, Globe, Search, Bell, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ParentContext } from "../../ParentContext/ParentContext";

const Sidebar = () => {
  const [isResizing, setIsResizing] = useState(false);

  const { 
    sidebarOpen,
    setSidebarOpen,
    expandedItems,
    setExpandedItems,
    activeItem,
    setActiveItem,
    activeComponent,
    setActiveComponent,
    sidebarWidth,
    setSidebarWidth,
    isCollapsed,
    setIsCollapsed,
    toggleCollapse,
    headerComponentRender,
    setHeaderComponentRender
  } = useContext(ParentContext);

  const menuItems = [
    { icon: Home, label: "Masters", id: "masters" },
    { icon: BarChart3, label: "Purchase Requisition", id: "PurRequisitionForm" },
    { icon: Globe, label: "Hod Approval", id: "HodApproval" },
    { icon: Users, label: "Requisition Approval", id: "PurchaseApproval" },
    { icon: ShieldCheck, label: "Requisition Authorization", id: "PurReqAuthorization" },
  ];

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleItemClick = (item, childItem = null) => {
    if (childItem) {
      setActiveItem(childItem.id);
      setActiveComponent(childItem.id);
      setHeaderComponentRender(childItem.label);
    } else if (item.children) {
      toggleExpanded(item.id);
    } else {
      setActiveItem(item.id);
      setActiveComponent(item.id);
      setHeaderComponentRender(item.label);
      
      // Only auto-collapse on desktop, close sidebar on mobile
      if (window.innerWidth >= 1024) {
        setIsCollapsed(true);
        setSidebarWidth(80);
      } else {
        setSidebarOpen(false);
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= 280 && newWidth <= 450) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <>
      <TooltipProvider>
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:translate-x-0 lg:inset-0 z-50 bg-background border-r transform transition-all duration-300 ease-in-out h-screen flex flex-col`}
          style={{ width: isCollapsed ? '80px' : `${sidebarWidth}px` }}
        >
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleCollapse}
                      className="hidden lg:flex"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  </TooltipContent>
                </Tooltip>
{/*                 
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.children ? (
                    <Collapsible 
                      open={expandedItems[item.id]} 
                      onOpenChange={() => toggleExpanded(item.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant={activeItem === item.id ? "secondary" : "ghost"}
                          className={`w-full justify-between h-auto p-3 ${
                            isCollapsed ? "px-0 justify-center" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-md ${
                              activeItem === item.id 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            }`}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            {!isCollapsed && (
                              <span className="font-medium">{item.label}</span>
                            )}
                          </div>
                          
                          {!isCollapsed && (
                            <ChevronRight className={`h-4 w-4 transition-transform ${
                              expandedItems[item.id] ? "rotate-90" : ""
                            }`} />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      
                      {!isCollapsed && (
                        <CollapsibleContent className="space-y-1 ml-4 mt-2">
                          {item.children.map((childItem) => (
                            <Button
                              key={childItem.id}
                              variant={activeItem === childItem.id ? "secondary" : "ghost"}
                              className="w-full justify-start h-auto p-3"
                              onClick={() => handleItemClick(item, childItem)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-1.5 rounded-sm ${
                                  activeItem === childItem.id 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted/50"
                                }`}>
                                  <childItem.icon className="h-3 w-3" />
                                </div>
                                <span className="text-sm">{childItem.label}</span>
                              </div>
                            </Button>
                          ))}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={activeItem === item.id ? "secondary" : "ghost"}
                          className={`w-full h-auto p-3 ${
                            isCollapsed ? "px-0 justify-center" : "justify-start"
                          }`}
                          onClick={() => handleItemClick(item)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-md ${
                              activeItem === item.id 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            }`}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            {!isCollapsed && (
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{item.label}</span>
                                {item.badge && (
                                  <Badge variant="destructive" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </Button>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4">
            <Separator className="mb-4" />
            
            {!isCollapsed ? (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Sign Out
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {/* Resize Handle */}
          {!isCollapsed && (
            <div
              className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-border transition-colors duration-200 group"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-border rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          )}
        </div>
      </TooltipProvider>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
