import { Crown, Lock } from 'lucide-react'
import { Badge } from '../ui/Badge'

export function PremiumTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 p-4 border border-amber-200">
          <div className="flex items-center gap-2 mb-2 text-amber-900">
              <Crown size={18} />
              <h3 className="font-semibold text-sm">Pro Access</h3>
          </div>
          <p className="text-xs text-amber-800/80 mb-3">Unlock thousands of premium assets and exclusive fonts.</p>
          <button className="w-full py-2 bg-amber-900 text-amber-50 rounded text-xs font-medium hover:bg-amber-800 transition-colors">
              Upgrade Now
          </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg border bg-background relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-2 right-2 z-10">
                      <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center bg-black/50 text-white backdrop-blur-sm">
                          <Lock size={10} />
                      </Badge>
                  </div>
                  <div className="w-full h-full bg-muted/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl">💎</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">$0.99</span>
                  </div>
              </div>
          ))}
      </div>
    </div>
  )
}
