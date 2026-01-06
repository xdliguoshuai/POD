import React, { useState } from "react";

import { Button } from "antd";
import { ChevronLeft, ChevronRight, Settings2 } from "lucide-react";

import { cn } from "../lib/utils";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function CollapsibleSidebar({ children, isOpen, onToggle }: Props) {
  return (
    <div
      className={cn(
        "border-r bg-background flex flex-col h-full z-10 relative transition-all duration-300 ease-in-out",
        isOpen ? "w-full lg:w-[420px] xl:w-[480px]" : "w-12 lg:w-16"
      )}
    >
      {/* Toggle Button */}
      <div className="absolute -right-3 top-6 z-20">
        <Button
          type="default"
          shape="circle"
          size="small"
          className="flex items-center justify-center shadow-sm bg-background border-border hover:bg-accent"
          onClick={onToggle}
          icon={isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        />
      </div>

      {/* Content Container */}
      <div
        className={cn(
          "flex-1 overflow-hidden flex flex-col",
          !isOpen && "items-center pt-6"
        )}
      >
        {isOpen ? (
          <div className="h-full overflow-y-auto px-6 py-8 space-y-10 pb-32 scrollbar-hide">
            {children}
          </div>
        ) : (
          <div className="flex flex-col gap-6 items-center">
            <Button
              type="text"
              shape="circle"
              onClick={onToggle}
              title="Open Configuration"
              icon={<Settings2 className="text-muted-foreground" />}
            />
            {/* Vertical Text Label */}
            <div className="writing-vertical-lr rotate-180 text-xs font-medium tracking-widest text-muted-foreground uppercase whitespace-nowrap">
              Configuration
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
