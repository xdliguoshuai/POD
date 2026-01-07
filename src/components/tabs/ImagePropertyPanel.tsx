import React, { useState, useEffect } from "react";
import {
  InputNumber,
  Slider,
  Button,
  ConfigProvider,
  Space,
  Tooltip,
  Switch,
} from "antd";
import {
  ChevronLeft,
  RotateCw,
  Maximize2,
  FlipHorizontal,
  FlipVertical,
  RefreshCw,
} from "lucide-react";
import { CanvasController } from "../../lib/CanvasController";
import { useActiveObject } from "../../hooks/useActiveObject";
import { cn } from "../../lib/utils";

const THEME = {
  token: {
    colorPrimary: "#194236",
    borderRadius: 6,
  },
};

interface ImagePropertyPanelProps {
  onBack: () => void;
}

export const ImagePropertyPanel: React.FC<ImagePropertyPanelProps> = ({
  onBack,
}) => {
  const activeObject = useActiveObject() as any;
  const controller = CanvasController.getInstance();

  // Local state for properties
  const [properties, setProperties] = useState({
    angle: 0,
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
    flipX: false,
    flipY: false,
  });

  useEffect(() => {
    if (
      activeObject &&
      (activeObject.type === "image" || activeObject.type === "fabric.Image")
    ) {
      setProperties({
        angle: activeObject.angle || 0,
        width: Math.round(activeObject.width * activeObject.scaleX),
        height: Math.round(activeObject.height * activeObject.scaleY),
        scaleX: activeObject.scaleX || 1,
        scaleY: activeObject.scaleY || 1,
        flipX: activeObject.flipX || false,
        flipY: activeObject.flipY || false,
      });
    }
  }, [activeObject]);

  const handlePropertyChange = (key: string, value: any) => {
    setProperties((prev) => ({ ...prev, [key]: value }));
    if (activeObject) {
      controller.updateObjectProperty(activeObject, key, value);
    }
  };

  const handleDimensionChange = (
    dimension: "width" | "height",
    value: number | null
  ) => {
    if (!value || !activeObject) return;

    if (dimension === "width") {
      const newScaleX = value / activeObject.width;
      handlePropertyChange("scaleX", newScaleX);
      setProperties((prev) => ({ ...prev, width: value }));
    } else {
      const newScaleY = value / activeObject.height;
      handlePropertyChange("scaleY", newScaleY);
      setProperties((prev) => ({ ...prev, height: value }));
    }
  };

  const resetRotation = () => {
    handlePropertyChange("angle", 0);
  };

  if (
    !activeObject ||
    (activeObject.type !== "image" && activeObject.type !== "fabric.Image")
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center opacity-50">
        <p className="text-sm">No image selected</p>
        <Button type="link" onClick={onBack}>
          Back to Layers
        </Button>
      </div>
    );
  }

  return (
    <ConfigProvider theme={THEME}>
      <div className="space-y-6 animate-in fade-in slide-in-from-right-2">
        <div className="flex items-center gap-2 border-b pb-2">
          <Button
            type="text"
            icon={<ChevronLeft size={20} />}
            onClick={onBack}
            className="p-0 h-8 w-8 flex items-center justify-center"
          />
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
            Image Properties
          </h3>
        </div>

        {/* Rotation */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <RotateCw size={14} /> Rotation
            </label>
            <Button
              type="text"
              size="small"
              icon={<RefreshCw size={12} />}
              onClick={resetRotation}
              className="text-[10px] h-6 px-2"
            >
              Reset
            </Button>
          </div>
          <div className="flex gap-4 items-center pl-2">
            <Slider
              min={0}
              max={360}
              value={properties.angle}
              onChange={(val) => handlePropertyChange("angle", val)}
              className="flex-1"
              tooltip={{ formatter: (val) => `${val}°` }}
            />
            <InputNumber
              min={0}
              max={360}
              value={Math.round(properties.angle)}
              onChange={(val) => handlePropertyChange("angle", val || 0)}
              addonAfter="°"
              className="w-24"
            />
          </div>
        </div>

        {/* Dimensions */}
        <div className="space-y-3 pt-4 border-t">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Maximize2 size={14} /> Dimensions (px)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground">Width</span>
              <InputNumber
                value={properties.width}
                onChange={(val) => handleDimensionChange("width", val)}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground">Height</span>
              <InputNumber
                value={properties.height}
                onChange={(val) => handleDimensionChange("height", val)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Flip Controls */}
        <div className="space-y-3 pt-4 border-t">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Flip Content
          </label>
          <div className="flex gap-4">
            <div className="flex-1 flex items-center justify-between bg-muted/30 p-2 rounded-md border">
              <div className="flex items-center gap-2">
                <FlipHorizontal size={16} className="text-muted-foreground" />
                <span className="text-xs">Horizontal</span>
              </div>
              <Switch
                size="small"
                checked={properties.flipX}
                onChange={(val) => handlePropertyChange("flipX", val)}
              />
            </div>
            <div className="flex-1 flex items-center justify-between bg-muted/30 p-2 rounded-md border">
              <div className="flex items-center gap-2">
                <FlipVertical size={16} className="text-muted-foreground" />
                <span className="text-xs">Vertical</span>
              </div>
              <Switch
                size="small"
                checked={properties.flipY}
                onChange={(val) => handlePropertyChange("flipY", val)}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-8 flex flex-col items-center justify-center text-center opacity-40">
          <Maximize2 size={32} className="mb-2 text-muted-foreground" />
          <p className="text-[10px] font-medium max-w-[180px]">
            Adjust the image scale and orientation for the perfect fit
          </p>
        </div>
      </div>
    </ConfigProvider>
  );
};
