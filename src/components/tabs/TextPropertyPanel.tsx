import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  Slider,
  ColorPicker,
  Button,
  ConfigProvider,
  Space,
  Tooltip,
} from "antd";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronLeft,
} from "lucide-react";
import { CanvasController } from "../../lib/CanvasController";
import { useActiveObject } from "../../hooks/useActiveObject";
import { cn } from "../../lib/utils";

const { TextArea } = Input;

const THEME = {
  token: {
    colorPrimary: "#194236",
    borderRadius: 6,
  },
};

const FONTS = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Oswald", label: "Oswald" },
  { value: "Pacifico", label: "Pacifico" },
];

const RECENT_COLORS = [
  "#194236",
  "#000000",
  "#FFFFFF",
  "#E63946",
  "#F1FAEE",
  "#A8DADC",
  "#457B9D",
];

interface TextPropertyPanelProps {
  onBack: () => void;
}

export const TextPropertyPanel: React.FC<TextPropertyPanelProps> = ({
  onBack,
}) => {
  const activeObject = useActiveObject() as any;
  const controller = CanvasController.getInstance();

  // Local state for properties to ensure smooth UI (syncing from activeObject)
  const [properties, setProperties] = useState({
    text: "",
    fontFamily: "Inter",
    fontSize: 32,
    fill: "#000000",
    textAlign: "center",
    fontWeight: "normal",
    fontStyle: "normal",
    underline: false,
    charSpacing: 0,
    lineHeight: 1.16,
  });

  useEffect(() => {
    if (activeObject && activeObject.type === "i-text") {
      setProperties({
        text: activeObject.text || "",
        fontFamily: activeObject.fontFamily || "Inter",
        fontSize: activeObject.fontSize || 32,
        fill: activeObject.fill || "#000000",
        textAlign: activeObject.textAlign || "center",
        fontWeight: activeObject.fontWeight || "normal",
        fontStyle: activeObject.fontStyle || "normal",
        underline: activeObject.underline || false,
        charSpacing: activeObject.charSpacing || 0,
        lineHeight: activeObject.lineHeight || 1.16,
      });
    }
  }, [activeObject]);

  const handlePropertyChange = (key: string, value: any) => {
    setProperties((prev) => ({ ...prev, [key]: value }));
    if (activeObject) {
      controller.updateObjectProperty(activeObject, key, value);
    }
  };

  if (!activeObject || activeObject.type !== "i-text") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center opacity-50">
        <p className="text-sm">No text selected</p>
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
            Text Properties
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Content
          </label>
          <TextArea
            value={properties.text}
            onChange={(e) => handlePropertyChange("text", e.target.value)}
            autoSize={{ minRows: 2, maxRows: 4 }}
            className="text-sm font-medium"
          />
        </div>

        {/* Typography */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Typography
          </label>

          <Select
            value={properties.fontFamily}
            onChange={(val) => handlePropertyChange("fontFamily", val)}
            className="w-full h-10"
            options={FONTS.map((f) => ({
              label: <span style={{ fontFamily: f.value }}>{f.label}</span>,
              value: f.value,
            }))}
          />

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Size</span>
              <span className="text-xs font-mono font-bold">
                {properties.fontSize}px
              </span>
            </div>
            <Slider
              min={8}
              max={200}
              value={properties.fontSize}
              onChange={(val) => handlePropertyChange("fontSize", val)}
              tooltip={{ open: false }}
            />
          </div>

          {/* Styles & Alignment */}
          <div className="grid grid-cols-2 gap-3">
            <Space.Compact block>
              <Tooltip title="Bold">
                <Button
                  icon={<Bold size={16} />}
                  type={
                    properties.fontWeight === "bold" ? "primary" : "default"
                  }
                  onClick={() =>
                    handlePropertyChange(
                      "fontWeight",
                      properties.fontWeight === "bold" ? "normal" : "bold"
                    )
                  }
                  className={cn(
                    "flex-1",
                    properties.fontWeight === "bold" && "bg-primary"
                  )}
                />
              </Tooltip>
              <Tooltip title="Italic">
                <Button
                  icon={<Italic size={16} />}
                  type={
                    properties.fontStyle === "italic" ? "primary" : "default"
                  }
                  onClick={() =>
                    handlePropertyChange(
                      "fontStyle",
                      properties.fontStyle === "italic" ? "normal" : "italic"
                    )
                  }
                  className={cn(
                    "flex-1",
                    properties.fontStyle === "italic" && "bg-primary"
                  )}
                />
              </Tooltip>
              <Tooltip title="Underline">
                <Button
                  icon={<Underline size={16} />}
                  type={properties.underline ? "primary" : "default"}
                  onClick={() =>
                    handlePropertyChange("underline", !properties.underline)
                  }
                  className={cn("flex-1", properties.underline && "bg-primary")}
                />
              </Tooltip>
            </Space.Compact>

            <Space.Compact block>
              <Tooltip title="Left">
                <Button
                  icon={<AlignLeft size={16} />}
                  type={properties.textAlign === "left" ? "primary" : "default"}
                  onClick={() => handlePropertyChange("textAlign", "left")}
                  className={cn(
                    "flex-1",
                    properties.textAlign === "left" && "bg-primary"
                  )}
                />
              </Tooltip>
              <Tooltip title="Center">
                <Button
                  icon={<AlignCenter size={16} />}
                  type={
                    properties.textAlign === "center" ? "primary" : "default"
                  }
                  onClick={() => handlePropertyChange("textAlign", "center")}
                  className={cn(
                    "flex-1",
                    properties.textAlign === "center" && "bg-primary"
                  )}
                />
              </Tooltip>
              <Tooltip title="Right">
                <Button
                  icon={<AlignRight size={16} />}
                  type={
                    properties.textAlign === "right" ? "primary" : "default"
                  }
                  onClick={() => handlePropertyChange("textAlign", "right")}
                  className={cn(
                    "flex-1",
                    properties.textAlign === "right" && "bg-primary"
                  )}
                />
              </Tooltip>
            </Space.Compact>
          </div>
        </div>

        {/* Color */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Color
          </label>
          <div className="flex gap-3 items-center">
            <ColorPicker
              value={properties.fill}
              onChange={(c) => handlePropertyChange("fill", c.toHexString())}
              showText
            />
            <div className="flex gap-1.5 flex-wrap flex-1">
              {RECENT_COLORS.map((c) => (
                <div
                  key={c}
                  className={cn(
                    "w-6 h-6 rounded-full cursor-pointer border transition-transform hover:scale-110",
                    properties.fill === c
                      ? "border-primary scale-110 ring-2 ring-primary/20"
                      : "border-gray-200"
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => handlePropertyChange("fill", c)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Spacing */}
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Letter Spacing
              </label>
              <span className="text-xs font-mono font-bold">
                {properties.charSpacing}
              </span>
            </div>
            <Slider
              min={-100}
              max={500}
              step={10}
              value={properties.charSpacing}
              onChange={(val) => handlePropertyChange("charSpacing", val)}
              tooltip={{ open: false }}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Line Height
              </label>
              <span className="text-xs font-mono font-bold">
                {properties.lineHeight.toFixed(2)}
              </span>
            </div>
            <Slider
              min={0.5}
              max={3}
              step={0.05}
              value={properties.lineHeight}
              onChange={(val) => handlePropertyChange("lineHeight", val)}
              tooltip={{ open: false }}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
