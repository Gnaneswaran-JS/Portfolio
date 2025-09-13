"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name);
  const [isClient, setIsClient] = useState(false);
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Ensure we're on the client before running any DOM operations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // This effect cleans up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  // This effect sets up the IntersectionObserver to watch for which section is on screen
  useEffect(() => {
    if (!isClient) return; // Don't run on server

    // Small delay to ensure DOM is ready
    const setupObserver = () => {
      // Clean up existing observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (isClickingRef.current) return;

          const intersectingEntry = entries.find((entry) => entry.isIntersecting);
          if (intersectingEntry) {
            const activeItem = items.find(
              (item) => {
                const targetId = item.url.startsWith('#') ? item.url.slice(1) : item.url;
                return intersectingEntry.target.id === targetId;
              }
            );
            if (activeItem) {
              setActiveTab(activeItem.name);
            }
          }
        },
        {
          threshold: 0.3, // Reduced threshold for better mobile experience
          rootMargin: "-20% 0px -20% 0px", // Better margin for detection
        }
      );

      // Wait for DOM to be ready and observe sections
      const observeSections = () => {
        const sections = items
          .map(item => {
            const targetId = item.url.startsWith('#') ? item.url.slice(1) : item.url;
            return document.getElementById(targetId);
          })
          .filter(Boolean);

        if (sections.length === 0) {
          // If sections not found, try again after a short delay
          setTimeout(observeSections, 100);
          return;
        }

        sections.forEach((section) => {
          if (section && observerRef.current) {
            observerRef.current.observe(section);
          }
        });
      };

      observeSections();
    };

    // Setup observer with a small delay to ensure DOM is ready
    setTimeout(setupObserver, 100);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items, isClient]);

  const handleNavClick = (itemName: string, url: string) => {
    // Prevent default for hash links
    if (url.startsWith('#')) {
      // Let the browser handle the scrolling
      const targetId = url.slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Instantly update the active tab
        setActiveTab(itemName);
        
        // Set flag to ignore observer during scroll
        isClickingRef.current = true;
        
        // Clear any previous timeout
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
        
        // Smooth scroll to element
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });

        // Reset flag after scroll completes
        clickTimeoutRef.current = window.setTimeout(() => {
          isClickingRef.current = false;
        }, 1000);
      }
    } else {
      setActiveTab(itemName);
    }
  };

  // Don't render until client-side
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:bottom-auto sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-background/80 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg sm:mt-6">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                if (item.url.startsWith('#')) {
                  e.preventDefault();
                }
                handleNavClick(item.name, item.url);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                {Icon && <Icon size={18} strokeWidth={2.5} />}
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/25 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}