import React, { useState } from "react";
import { Eye, EyeOff, Lock, Unlock, Trash2, GripVertical } from "lucide-react";

import { Button, Empty } from "antd";
import { useLayers } from "../../hooks/useLayers";
import { CanvasController } from "../../lib/CanvasController";
import { cn } from "../../lib/utils";
import { TextPropertyPanel } from "./TextPropertyPanel";

// DnD Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableLayerItemProps {
  layer: any;
  onSelect: (layer: any) => void;
  onToggleVisibility: (layer: any) => void;
  onToggleLock: (layer: any) => void;
  onDelete: (layer: any) => void;
}

function SortableLayerItem({
  layer,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onDelete,
}: SortableLayerItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: layer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  const controller = CanvasController.getInstance();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md border transition-all cursor-pointer group relative",
        layer.active
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-background hover:bg-muted/20",
        isDragging && "opacity-50 shadow-lg border-primary/50"
      )}
      onClick={() => onSelect(layer)}
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
          layer.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <button
          className={cn(
            "p-1.5 rounded hover:bg-muted transition-colors",
            !layer.visible && "text-muted-foreground"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(layer);
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
            onToggleLock(layer);
          }}
        >
          {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
        </button>
        <button
          className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(layer);
          }}
        >
          <Trash2 size={14} />
        </button>

        {/* Drag Handle at the end */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-1"
        >
          <GripVertical size={16} />
        </div>
      </div>
    </div>
  );
}

export function LayersTab() {
  const layers = useLayers();
  const controller = CanvasController.getInstance();
  const [showDetail, setShowDetail] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Avoid accidental drags when clicking
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleClearAll = () => {
    controller.clearAll();
  };

  const activeLayer = layers.find((l) => l.active);

  if (showDetail && activeLayer && activeLayer.type === "i-text") {
    return <TextPropertyPanel onBack={() => setShowDetail(false)} />;
  }

  if (layers.length === 0) {
    return (
      <div className="py-12">
        <Empty description="No layers yet" />
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = layers.findIndex((l) => l.id === active.id);
      const newIndex = layers.findIndex((l) => l.id === over.id);

      // Fabric.js stack is bottom-to-top, our list is top-to-bottom (visual order)
      // So we need to invert the indices for the canvas reordering
      const canvasOldIndex = layers.length - 1 - oldIndex;
      const canvasNewIndex = layers.length - 1 - newIndex;

      controller.reorderLayer(canvasOldIndex, canvasNewIndex);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>{layers.length} Layers</span>
        <button
          className="hover:text-foreground transition-colors"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={layers.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {layers.map((layer) => (
              <SortableLayerItem
                key={layer.id}
                layer={layer}
                onSelect={(l) => {
                  controller.selectObject(l.ref);
                  if (l.type === "i-text") {
                    setShowDetail(true);
                  }
                }}
                onToggleVisibility={(l) => controller.toggleVisibility(l.ref)}
                onToggleLock={(l) => controller.toggleLock(l.ref)}
                onDelete={(l) => controller.deleteObject(l.ref)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
