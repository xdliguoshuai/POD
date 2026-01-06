import { useState, useEffect } from 'react'
import { Button } from '../../ui/Button'
import { Wand2, LayoutTemplate, Palette, Type, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { Card } from '../../ui/Card'
import { cn } from '../../lib/utils'

interface AIAssistTabProps {
  onAutoLayout: () => void
  onApplyFontSuggestion: (font: string) => void
  onApplyColorSuggestion: (color: string) => void
  isProcessing?: boolean
  results?: {
      dpi: 'ok' | 'low',
      contrast: 'ok' | 'low',
      margins: 'ok' | 'risk'
  }
}

export function AIAssistTab({ 
  onAutoLayout, 
  onApplyFontSuggestion, 
  onApplyColorSuggestion,
  isProcessing = false,
  results = { dpi: 'ok', contrast: 'ok', margins: 'ok' }
}: AIAssistTabProps) {
  const [activeFeature, setActiveFeature] = useState<'check' | 'layout' | 'text' | 'fill' | null>(null)
  const [simulating, setSimulating] = useState(false)

  const handleAction = (action: () => void) => {
    setSimulating(true)
    setTimeout(() => {
        setSimulating(false)
        action()
    }, 1500)
  }

  return (
    <div className="space-y-6">
       <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
          <Wand2 className="text-primary mt-1" size={20} />
          <div>
              <h3 className="text-sm font-semibold text-primary">AI Design Assistant</h3>
              <p className="text-xs text-muted-foreground mt-1">
                  I can help optimize your design for printing, suggest layouts, and improve aesthetics.
              </p>
          </div>
       </div>

       {/* 1. AI Design Check */}
       <Card className="p-4 space-y-3">
           <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-muted-foreground" />
                   <span className="text-sm font-medium">Print Readiness Check</span>
               </div>
               <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setActiveFeature(activeFeature === 'check' ? null : 'check')}
               >
                   {activeFeature === 'check' ? 'Hide' : 'Details'}
               </Button>
           </div>
           
           {activeFeature === 'check' && (
               <div className="pt-2 space-y-2 animate-in slide-in-from-top-2">
                   <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">Resolution (DPI)</span>
                       <span className={results.dpi === 'ok' ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                           {results.dpi === 'ok' ? 'Good (300+)' : 'Low (<150)'}
                       </span>
                   </div>
                   <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">Safe Area Margins</span>
                       <span className={results.margins === 'ok' ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                           {results.margins === 'ok' ? 'Within Limits' : 'Near Edge'}
                       </span>
                   </div>
                   <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">Color Contrast</span>
                       <span className={results.contrast === 'ok' ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                           {results.contrast === 'ok' ? 'Good' : 'Low Visibility'}
                       </span>
                   </div>
               </div>
           )}
       </Card>

       {/* 2. AI Auto Layout */}
       <div className="space-y-2">
           <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Layout & Composition</label>
           <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-3 relative overflow-hidden"
                onClick={() => handleAction(onAutoLayout)}
                disabled={simulating}
           >
               <div className="flex items-center gap-3">
                   <div className="bg-primary/10 p-2 rounded-md text-primary">
                       {simulating ? <Loader2 size={18} className="animate-spin" /> : <LayoutTemplate size={18} />}
                   </div>
                   <div className="text-left">
                       <div className="text-sm font-medium">Smart Auto-Layout</div>
                       <div className="text-[10px] text-muted-foreground">Aligns elements using Golden Ratio</div>
                   </div>
               </div>
           </Button>
       </div>

       {/* 3. AI Text Helper */}
       <div className="space-y-2">
           <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Typography Helper</label>
           <div className="grid grid-cols-2 gap-2">
               <Button 
                    variant="outline" 
                    className="h-auto py-3 flex-col gap-2"
                    onClick={() => handleAction(() => onApplyFontSuggestion('Montserrat'))}
                    disabled={simulating}
                >
                   <Type size={16} />
                   <span className="text-xs">Modern Sans</span>
               </Button>
               <Button 
                    variant="outline" 
                    className="h-auto py-3 flex-col gap-2"
                    onClick={() => handleAction(() => onApplyFontSuggestion('Playfair Display'))}
                    disabled={simulating}
                >
                   <Type size={16} className="font-serif" />
                   <span className="text-xs">Classic Serif</span>
               </Button>
           </div>
       </div>

       {/* 4. AI Fill Suggestions */}
       <div className="space-y-2">
           <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Color Harmony</label>
           <div className="flex gap-2">
               {['#1a472a', '#e2e8f0', '#1e293b', '#f59e0b'].map((color) => (
                   <button
                        key={color}
                        className="w-8 h-8 rounded-full border shadow-sm transition-transform hover:scale-110 focus:ring-2 ring-primary/20"
                        style={{ backgroundColor: color }}
                        onClick={() => onApplyColorSuggestion(color)}
                        title="Apply this color"
                   />
               ))}
               <button className="w-8 h-8 rounded-full border border-dashed flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary">
                   <Palette size={14} />
               </button>
           </div>
           <p className="text-[10px] text-muted-foreground">
               * Suggestions based on product color and current trends.
           </p>
       </div>

    </div>
  )
}
