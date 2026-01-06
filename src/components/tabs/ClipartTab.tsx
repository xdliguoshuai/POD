import { Search } from 'lucide-react'

export function ClipartTab() {
  const categories = ['All', 'Shapes', 'Animals', 'Nature', 'Abstract', 'Vintage']
  const items = Array.from({ length: 12 })

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input 
            type="text" 
            placeholder="Search icons..." 
            className="w-full h-10 pl-9 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
            <button 
                key={cat}
                className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium whitespace-nowrap hover:bg-muted/80 transition-colors"
            >
                {cat}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {items.map((_, i) => (
            <div key={i} className="aspect-square rounded border bg-background hover:bg-muted hover:border-primary/50 cursor-pointer flex items-center justify-center text-2xl transition-all">
                {['★', '♥', '⚡', '✿', '☀', '☁', '☂', '☃', '☄', '⚓', '⚔', '⚖'][i]}
            </div>
        ))}
      </div>
    </div>
  )
}
