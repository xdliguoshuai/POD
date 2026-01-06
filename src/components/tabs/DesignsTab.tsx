import { Layout, Clock, Save } from "lucide-react";

import { Button } from "antd";

export function DesignsTab() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-muted/20 rounded-lg">
        <button className="flex-1 py-1.5 text-xs font-medium rounded-md bg-white shadow-sm">
          My Designs
        </button>
        <button className="flex-1 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:bg-white/50">
          History
        </button>
      </div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg border bg-background hover:border-primary/50 transition-colors group"
          >
            <div className="w-16 h-16 rounded bg-muted/20 border flex items-center justify-center">
              <Layout size={20} className="text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-sm font-medium">Untitled Project {i}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={10} /> 2 days ago
              </p>
            </div>
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-center">
              <Button size="small" className="h-7 text-xs">
                Load
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="primary"
        block
        icon={<Save size={16} />}
        className="flex items-center justify-center"
      >
        Save Current Design
      </Button>
    </div>
  );
}
