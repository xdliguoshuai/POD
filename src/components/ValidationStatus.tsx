import { ValidationResult } from '../state/types'
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react'
import { cn } from '../lib/utils'

export default function ValidationStatus({ results }: { results: ValidationResult[] }) {
  // If no validation results, show "Ready" state (or nothing, but spec implies system feedback is always present or clearly indicates status)
  // Spec says: "Validation results exist as a system feedback list".
  // Let's show a minimal "System Ready" if everything is OK, or the list of issues.

  const hasIssues = results.some(r => r.state !== 'ok');

  return (
    <div className="fixed bottom-0 right-0 z-50 p-6 pointer-events-none w-full max-w-[600px] flex flex-col items-end gap-2">
       {/* We use pointer-events-none for the container so it doesn't block clicks, 
           but pointer-events-auto for the content cards. 
           However, spec says "Bottom (or right bottom)". 
           Let's make it a clean list at the bottom right, floating.
       */}
       
       <div className="pointer-events-auto bg-background/95 backdrop-blur border shadow-lg rounded-lg p-4 w-full animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {/* Status Dot: Use distinct functional colors, NOT theme color */}
                    <div className={cn("h-2 w-2 rounded-full", hasIssues ? "bg-amber-500" : "bg-emerald-500")} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">System Status</span>
                </div>
                {!hasIssues && (
                     <span className="text-xs text-emerald-600 font-medium">All systems operational</span>
                )}
            </div>
            
            <div className="space-y-2">
                {results.filter(r => r.state !== 'ok').map((r, i) => {
                     const Icon = r.state === 'risk' ? AlertTriangle : XCircle
                     // Functional colors: Muted Amber / Muted Red. Distinct from Forest Green theme.
                     const colorClass = r.state === 'risk' ? 'text-amber-600' : 'text-red-600'
                     
                    return (
                        <div key={i} className="flex items-start gap-3 text-sm p-2 rounded bg-muted/30">
                            <Icon size={16} className={cn("mt-0.5 shrink-0", colorClass)} />
                            <div className="space-y-0.5">
                                <p className="font-medium text-foreground">{r.reason}</p>
                                <p className="text-xs text-muted-foreground">Rule: {r.rule}</p>
                            </div>
                        </div>
                    )
                })}
                 {!hasIssues && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
                        <CheckCircle2 size={16} className="text-emerald-600/80" />
                        <span>Ready for production.</span>
                    </div>
                )}
            </div>
       </div>
    </div>
  )
}
