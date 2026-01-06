import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'

interface Props {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  required?: boolean
}

export function SidebarSection({ title, children, defaultOpen = true, required = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-0 pb-6 mb-6">
      <button 
        className="flex items-center justify-between w-full text-left py-2 group focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                {title}
            </span>
            {required && <span className="text-[10px] text-destructive font-medium bg-destructive/5 px-1.5 py-0.5 rounded">Required</span>}
        </div>
        {isOpen ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
      </button>
      
      <div 
        className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}
