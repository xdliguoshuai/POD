import { PaintBucket } from 'lucide-react'

export function FillTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fill Type</label>
        <div className="flex gap-2 bg-muted/20 p-1 rounded-lg border">
            <button className="flex-1 py-1.5 text-xs font-medium rounded bg-white shadow-sm">Solid</button>
            <button className="flex-1 py-1.5 text-xs font-medium rounded text-muted-foreground hover:bg-white/50">Gradient</button>
            <button className="flex-1 py-1.5 text-xs font-medium rounded text-muted-foreground hover:bg-white/50">Pattern</button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Color</label>
        <div className="grid grid-cols-6 gap-2">
            {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080', '#800000', '#808000'].map((color) => (
                <button 
                    key={color} 
                    className="w-full aspect-square rounded-md border hover:scale-110 transition-transform focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
      </div>

      <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Opacity</label>
          <input type="range" className="w-full accent-primary" />
      </div>
    </div>
  )
}
