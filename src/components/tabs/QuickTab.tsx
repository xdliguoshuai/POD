import { Zap } from 'lucide-react'

export function QuickTab() {
  const templates = Array.from({ length: 6 })

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick Starters</label>
        <p className="text-xs text-muted-foreground">Pre-made layouts to jumpstart your design.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((_, i) => (
            <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-lg border bg-muted/20 relative overflow-hidden mb-2 group-hover:border-primary/50 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-50 group-hover:opacity-80 transition-opacity">
                        <Zap size={24} />
                    </div>
                </div>
                <p className="text-xs font-medium text-center">Template {i + 1}</p>
            </div>
        ))}
      </div>
    </div>
  )
}
