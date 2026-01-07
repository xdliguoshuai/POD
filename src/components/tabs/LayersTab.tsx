import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { Button, Empty } from "antd";
import { useLayers } from "../../hooks/useLayers";
import { CanvasController } from "../../lib/CanvasController";
import { cn } from "../../lib/utils";

export function LayersTab() {
  const layers = useLayers();
  const controller = CanvasController.getInstance();

  const handleClearAll = () => {
    controller.clearAll();
  };

  if (layers.length === 0) {
    return (
      <div className="py-12">
        <Empty description="No layers yet" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>{layers.length} Layers</span>
        <button
          className="hover:text-foreground transition-colors"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-md border transition-all cursor-pointer group",
              layer.active
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-background hover:bg-muted/20"
            )}
            onClick={() => controller.selectObject(layer.ref)}
          >
            <div className="w-10 h-10 bg-white rounded border flex items-center justify-center text-lg shrink-0 overflow-hidden">
              {layer.type === "i-text" ? (
                <span className="font-serif">T</span>
              ) : (
                <img
                  src={layer.ref.getSrc?.() || ""}
                  alt=""
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{layer.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {layer.type.replace("i-", "")}
              </p>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 transition-opacity",
                layer.active
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              )}
            >
              <button
                className={cn(
                  "p-1.5 rounded hover:bg-muted transition-colors",
                  !layer.visible && "text-muted-foreground"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  controller.toggleVisibility(layer.ref);
                }}
              >
                {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button
                className={cn(
                  "p-1.5 rounded hover:bg-muted transition-colors",
                  layer.locked && "text-primary"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  controller.toggleLock(layer.ref);
                }}
              >
                {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t flex justify-between">
        <div className="flex gap-2">
          <Button
            icon={<ArrowUp size={14} />}
            disabled={!layers.some((l) => l.active)}
            onClick={() => {
              const active = layers.find((l) => l.active);
              if (active) controller.reorderObject(active.ref, "up");
            }}
          />
          <Button
            icon={<ArrowDown size={14} />}
            disabled={!layers.some((l) => l.active)}
            onClick={() => {
              const active = layers.find((l) => l.active);
              if (active) controller.reorderObject(active.ref, "down");
            }}
          />
        </div>
        <Button
          danger
          icon={<Trash2 size={14} />}
          disabled={!layers.some((l) => l.active)}
          onClick={() => {
            const active = layers.find((l) => l.active);
            if (active) controller.deleteObject(active.ref);
          }}
        />
      </div>
    </div>
  );
}
