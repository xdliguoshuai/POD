import React, { useState, useEffect } from 'react'
import { cn } from '../lib/utils'
import { 
  Shirt, 
  Layers, 
  Upload, 
  Type, 
  Sticker, 
  Zap, 
  Layout, 
  Crown, 
  PaintBucket,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Wand2
} from 'lucide-react'

export type SidebarTabId = 
  | 'product' 
  | 'layers' 
  | 'uploads' 
  | 'text' 
  | 'clipart' 
  | 'quick' 
  | 'designs' 
  | 'ai-assist'
  | 'premium' 
  | 'fill'

interface Props {
  activeTab: SidebarTabId
  onTabChange: (tab: SidebarTabId) => void
  children: React.ReactNode
}

const TABS: { id: SidebarTabId; label: string; icon: React.ElementType }[] = [
  { id: 'product', label: 'Product', icon: Shirt },
  { id: 'layers', label: 'Layers', icon: Layers },
  { id: 'uploads', label: 'Uploads', icon: Upload },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'clipart', label: 'Clipart', icon: Sticker },
  { id: 'quick', label: 'Quick', icon: Zap },
  { id: 'designs', label: 'Designs', icon: Layout },
  { id: 'ai-assist', label: 'AI Assist', icon: Wand2 },
  { id: 'premium', label: 'Premium', icon: Crown },
  { id: 'fill', label: 'Fill', icon: PaintBucket },
]

export function VerticalTabsSidebar({ activeTab, onTabChange, children }: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const [showAiGlow, setShowAiGlow] = useState(false)

  // AI Assist Tab Discovery Effect
  useEffect(() => {
    const SEEN_COUNT_KEY = 'ai_assist_seen_count'
    const seenCount = parseInt(localStorage.getItem(SEEN_COUNT_KEY) || '0', 10)
    
    // Only show if seen less than 2 times
    if (seenCount < 2) {
        setShowAiGlow(true)
        
        // Increment count
        localStorage.setItem(SEEN_COUNT_KEY, (seenCount + 1).toString())

        // Fade out after 12 seconds
        const timer = setTimeout(() => {
            setShowAiGlow(false)
        }, 12000)

        return () => clearTimeout(timer)
    }
  }, [])

  // Handle tab click: Toggle if active, Open if different
  const handleTabClick = (tabId: SidebarTabId) => {
    if (activeTab === tabId) {
      setIsOpen(!isOpen)
    } else {
      onTabChange(tabId)
      setIsOpen(true)
    }
  }

  return (
    <div 
        className={cn(
            "flex h-full border-r bg-background z-10 relative transition-all duration-300 ease-in-out",
            isOpen ? "w-full lg:w-[480px] xl:w-[520px]" : "w-20"
        )}
    >
        {/* Left: Fixed Tab Column */}
        <div className="w-20 border-r bg-muted/10 flex flex-col items-center py-6 gap-2 shrink-0 z-20 h-full relative">
            {/* Tab Icons */}
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col items-center gap-2 w-full">
                {TABS.map(tab => {
                    const isActive = activeTab === tab.id
                    const isAiAssist = tab.id === 'ai-assist'
                    const showGlow = isAiAssist && showAiGlow && !isActive

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={cn(
                                "flex flex-col items-center justify-center w-16 h-16 rounded-md transition-all duration-500 gap-1.5 shrink-0 relative group",
                                isActive 
                                    ? "bg-primary text-primary-foreground shadow-sm" 
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                showGlow && "shadow-[0_0_15px_hsl(var(--primary)/0.4)] ring-1 ring-primary/20 bg-primary/5"
                            )}
                            title={tab.label}
                        >
                            <tab.icon size={20} strokeWidth={isActive ? 2 : 1.5} className={cn(showGlow && "animate-pulse text-primary")} />
                            <span className={cn("text-[10px] font-medium tracking-tight", showGlow && "text-primary font-semibold")}>{tab.label}</span>
                            
                            {/* Active Indicator Dot (Only visible when collapsed) */}
                            {!isOpen && isActive && (
                                <div className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            )}

                            {/* New User Discovery Pulse */}
                            {showGlow && (
                                <span className="absolute top-2 right-2 flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Bottom Toggle Button */}
            <div className="mt-auto pt-4 border-t w-full flex justify-center">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors"
                    title={isOpen ? "Collapse Panel" : "Expand Panel"}
                >
                    {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                </button>
            </div>
        </div>

        {/* Right: Configuration Content Area */}
        <div className={cn(
            "flex-1 flex flex-col overflow-hidden bg-background transition-opacity duration-300",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible w-0"
        )}>
            {/* Header / Collapse Handle for Content Area */}
            <div className="h-12 border-b flex items-center justify-between px-6 shrink-0">
                <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                    {TABS.find(t => t.id === activeTab)?.label}
                </h2>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground"
                >
                    <ChevronLeft size={18} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 scrollbar-hide">
                {children}
            </div>
        </div>
    </div>
  )
}
