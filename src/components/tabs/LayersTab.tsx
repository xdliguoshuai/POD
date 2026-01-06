import { Eye, EyeOff, Lock, Unlock, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '../ui/Button'

export function LayersTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>3 Layers</span>
        <button className="hover:text-foreground transition-colors">Clear All</button>
      </div>

      <div className="space-y-2">
        {/* Layer Item 1 (Active) */}
        <div className="flex items-center gap-3 p-3 rounded-md border border-primary bg-primary/5 cursor-pointer group">
            <div className="w-10 h-10 bg-white rounded border flex items-center justify-center text-lg">
                🌲
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Forest Logo</p>
                <p className="text-xs text-muted-foreground">Image • 1.2MB</p>
            </div>
            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-background rounded"><Eye size={14} /></button>
                <button className="p-1.5 hover:bg-background rounded"><Lock size={14} /></button>
            </div>
        </div>

        {/* Layer Item 2 */}
        <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-background hover:bg-muted/20 cursor-pointer group">
            <div className="w-10 h-10 bg-white rounded border flex items-center justify-center font-serif text-lg">
                T
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">EST. 2024</p>
                <p className="text-xs text-muted-foreground">Text • Montserrat</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-muted rounded"><Eye size={14} /></button>
                <button className="p-1.5 hover:bg-muted rounded"><Unlock size={14} /></button>
            </div>
        </div>

        {/* Layer Item 3 */}
        <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-background hover:bg-muted/20 cursor-pointer group">
            <div className="w-10 h-10 bg-white rounded border flex items-center justify-center text-lg">
                ⚡
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Flash Icon</p>
                <p className="text-xs text-muted-foreground">Clipart</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-muted rounded"><Eye size={14} /></button>
                <button className="p-1.5 hover:bg-muted rounded"><Unlock size={14} /></button>
            </div>
        </div>
      </div>

      <div className="pt-4 border-t flex justify-between">
          <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8"><ArrowUp size={14} /></Button>
              <Button variant="outline" size="icon" className="h-8 w-8"><ArrowDown size={14} /></Button>
          </div>
          <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 size={14} /></Button>
      </div>
    </div>
  )
}
