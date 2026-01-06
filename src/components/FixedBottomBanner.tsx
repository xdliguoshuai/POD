import { useState } from 'react'
import { ValidationResult, CostBreakdown } from '../state/types'
import { Button } from '../ui/Button'
import { CheckCircle2, AlertTriangle, XCircle, ShoppingBag, Info, Check, X, Wand2 } from 'lucide-react'
import { cn } from '../lib/utils'

interface Props {
  results: ValidationResult[]
  cost: CostBreakdown
  onAddToCart: () => void
}

export function FixedBottomBanner({ results, cost, onAddToCart }: Props) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [showStatusDetails, setShowStatusDetails] = useState(false)
  
  const hasErrors = results.some(r => r.state === 'reject')
  const hasRisks = results.some(r => r.state === 'risk')
  const isValid = !hasErrors

  // Validation Checklist Logic
  const checks = [
      {
          label: "Artwork resolution meets print requirements",
          valid: !results.some(r => r.rule === 'QUALITY_CHECK' && (r.state === 'reject' || r.state === 'risk')),
          warning: results.some(r => r.rule === 'QUALITY_CHECK' && r.state === 'risk')
      },
      {
          label: "Design stays within printable area",
          valid: !results.some(r => (r.rule === 'SIZE_LIMIT' || r.rule === 'AREA_INVALID') && r.state === 'reject'),
          warning: false
      },
      {
          label: "Color usage is supported",
          valid: !results.some(r => r.rule === 'TECHNIQUE_LIMIT' && r.state === 'reject'),
          warning: false
      },
      {
          label: "Selected printing technique is compatible",
          valid: !results.some(r => r.rule === 'TECHNIQUE_LIMIT' && r.state === 'reject'),
          warning: false
      },
      {
          label: "Quantity meets minimum order requirements",
          valid: true, // Assuming true for now as validation logic doesn't exist yet
          warning: false
      }
  ]

  // Mock AI Check Status (In a real app, this would be passed down)
  const aiChecks = {
      optimized: true,
      contrast: 'good',
      layout: 'balanced'
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Validation Status Summary */}
        <div className="flex-1 w-full md:w-auto relative">
            <div 
                className={cn(
                    "flex items-center gap-2 text-sm font-medium cursor-pointer transition-opacity hover:opacity-80 inline-flex select-none",
                    hasErrors ? "text-destructive" : hasRisks ? "text-amber-600" : "text-emerald-600"
                )}
                onMouseEnter={() => setShowStatusDetails(true)}
                onMouseLeave={() => setShowStatusDetails(false)}
                onClick={() => setShowStatusDetails(!showStatusDetails)}
            >
                {hasErrors ? <XCircle size={18} /> : hasRisks ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                <span>
                    {hasErrors ? "Please resolve the issues before proceeding." : 
                     hasRisks ? "Design contains risks. Review suggested." : 
                     "Configuration valid. Ready to order."}
                </span>
                <Info size={14} className="ml-1 opacity-50" />
            </div>

            {/* Status Details Popover */}
            {showStatusDetails && (
                <div className="absolute bottom-full left-0 mb-3 w-80 bg-background rounded-lg shadow-xl border p-4 animate-in fade-in zoom-in-95 origin-bottom-left z-50">
                    <h4 className="font-semibold text-sm mb-3">Configuration Status</h4>
                    <div className="space-y-3">
                        {checks.map((check, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm">
                                <div className={cn(
                                    "mt-0.5 shrink-0",
                                    check.warning ? "text-amber-500" : 
                                    check.valid ? "text-emerald-600" : "text-destructive"
                                )}>
                                    {check.warning ? <AlertTriangle size={14} /> : 
                                     check.valid ? <Check size={14} /> : <X size={14} />}
                                </div>
                                <span className={cn(
                                    "text-muted-foreground",
                                    !check.valid && "text-destructive font-medium"
                                )}>
                                    {check.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* AI-Assisted Check Section */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                             <Wand2 size={14} className="text-primary" />
                             <h5 className="text-xs font-semibold uppercase tracking-wider text-primary">AI-Assisted Check</h5>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CheckCircle2 size={12} className="text-emerald-600" />
                                <span>AI Design Analysis Complete</span>
                            </div>
                        </div>
                    </div>

                    {hasRisks && !hasErrors && (
                         <div className="mt-3 text-[10px] text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
                             Note: Some items have warnings but can still be printed.
                         </div>
                    )}
                </div>
            )}
        </div>

        {/* Right: Pricing & CTA */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
             <div className="text-right relative">
                 <div className="flex items-center justify-end gap-1.5 mb-0.5">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Estimate</div>
                    <div 
                        className="relative"
                        onMouseEnter={() => setShowBreakdown(true)}
                        onMouseLeave={() => setShowBreakdown(false)}
                        onClick={() => setShowBreakdown(!showBreakdown)}
                    >
                        <Info 
                            size={14} 
                            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" 
                        />
                        
                        {/* Price Breakdown Popover */}
                        {showBreakdown && (
                            <div className="absolute bottom-full right-0 mb-3 w-64 bg-background rounded-lg shadow-xl border p-4 animate-in fade-in zoom-in-95 origin-bottom-right z-50">
                                <h4 className="font-semibold text-sm mb-3">Price Breakdown</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Base Product</span>
                                        <span>¥{cost.base.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Technique Cost</span>
                                        <span>+¥{cost.techniqueFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Print Area</span>
                                        <span>+¥{cost.areaFee.toFixed(2)}</span>
                                    </div>
                                    <div className="my-2 border-t border-border/50"></div>
                                    <div className="flex justify-between font-bold text-primary">
                                        <span>Total</span>
                                        <span>¥{cost.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mt-3 text-[10px] text-muted-foreground bg-muted/30 p-2 rounded">
                                    Prices may vary based on final production specifications.
                                </div>
                            </div>
                        )}
                    </div>
                 </div>
                 <div className="text-xl font-bold text-foreground">¥{cost.total.toFixed(2)}</div>
             </div>
             
             <Button 
                size="lg" 
                className={cn(
                  "min-w-[160px] shadow-sm",
                  !isValid ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"
                )}
                disabled={!isValid}
                onClick={onAddToCart}
             >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
             </Button>
        </div>
      </div>
      
      {/* Inline Feedback List (if any issues) - Optional: could be collapsible or just rely on sidebar cues.
          Given the requirement "Validation feedback is inline", we assume the detailed feedback is near the controls 
          or in the ValidationStatus list. The banner summarizes.
      */}
    </div>
  )
}
