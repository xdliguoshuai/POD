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
  Switch,
} from "antd";
import {
  Bold,
  Italic,
  Underline,
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronLeft,
} from "lucide-react";
import { CanvasController } from "../../lib/CanvasController";
import { useActiveObject } from "../../hooks/useActiveObject";
import { cn } from "../../lib/utils";
import { useLoading } from "../../hooks/useLoading";

const { TextArea } = Input;

const THEME = {
  token: {
    colorPrimary: "#194236",
    borderRadius: 6,
  },
};

const FONTS = [
  {
    value: "Inter",
    label: "Inter",
    url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
  },
  {
    value: "Roboto",
    label: "Roboto",
    url: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2",
  },
  {
    value: "Montserrat",
    label: "Montserrat",
    url: "https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm4df9GR7m3FVHMddw.woff2",
  },
  {
    value: "Playfair Display",
    label: "Playfair Display",
    url: "https://fonts.gstatic.com/s/playfairdisplay/v37/6nuq77eU9_939Y8u1q1500cZbyHxl_H8dKVZ_Y8h.woff2",
  },
  {
    value: "Oswald",
    label: "Oswald",
    url: "https://fonts.gstatic.com/s/oswald/v49/TK3iWkUHHAIjg752GT8G.woff2",
  },
  {
    value: "Pacifico",
    label: "Pacifico",
    url: "https://fonts.gstatic.com/s/pacifico/v22/FwZY7WnLByS6J50ceZ67.woff2",
  },
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

// Module-level cache to track successfully loaded fonts across component renders
const loadedFonts = new Set<string>(["Inter"]); // Inter is our default/system font

export const TextPropertyPanel: React.FC<TextPropertyPanelProps> = ({
  onBack,
}) => {
  const activeObject = useActiveObject() as any;
  const controller = CanvasController.getInstance();
  const { setLoading } = useLoading();

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
    lineHeight: 1,
    stroke: "#000000",
    strokeWidth: 0,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    outlineEnabled: false,
    shadowEnabled: false,
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
        stroke: activeObject.stroke || "#000000",
        strokeWidth: activeObject.strokeWidth || 0,
        shadowColor: activeObject.shadow?.color || "rgba(0,0,0,0.3)",
        shadowBlur: activeObject.shadow?.blur || 0,
        shadowOffsetX: activeObject.shadow?.offsetX || 0,
        shadowOffsetY: activeObject.shadow?.offsetY || 0,
        outlineEnabled: (activeObject.strokeWidth || 0) > 0,
        shadowEnabled: !!activeObject.shadow,
      });
    }
  }, [activeObject]);

  const loadFont = async (fontFamily: string) => {
    const font = FONTS.find((f) => f.value === fontFamily);
    if (!font || !font.url) return;

    try {
      // Use local Set for reliable tracking instead of document.fonts.check
      if (loadedFonts.has(fontFamily)) {
        return;
      }

      const fontFace = new FontFace(fontFamily, `url(${font.url})`);
      const loadedFace = await fontFace.load();
      document.fonts.add(loadedFace);
      loadedFonts.add(fontFamily);
    } catch (error) {
      console.error(`Failed to load font: ${fontFamily}`, error);
    }
  };

  const handlePropertyChange = async (key: string, value: any) => {
    if (key === "fontFamily") {
      setLoading(true);
      await loadFont(value);
      setLoading(false);
    }

    const newProperties = { ...properties, [key]: value };
    setProperties(newProperties);

    if (activeObject) {
      if (key === "outlineEnabled") {
        if (!value) {
          controller.updateObjectProperty(activeObject, "strokeWidth", 0);
        } else {
          controller.updateObjectProperty(
            activeObject,
            "strokeWidth",
            properties.strokeWidth || 1
          );
          controller.updateObjectProperty(activeObject, "paintFirst", "stroke");
        }
      } else if (key === "shadowEnabled") {
        if (!value) {
          controller.updateObjectProperty(activeObject, "shadow", null);
        } else {
          const shadowOptions = {
            color: properties.shadowColor,
            blur: properties.shadowBlur,
            offsetX: properties.shadowOffsetX,
            offsetY: properties.shadowOffsetY,
          };
          controller.updateObjectProperty(
            activeObject,
            "shadow",
            shadowOptions
          );
        }
      } else if (key.startsWith("shadow")) {
        if (newProperties.shadowEnabled) {
          const shadowOptions = {
            color: newProperties.shadowColor,
            blur: newProperties.shadowBlur,
            offsetX: newProperties.shadowOffsetX,
            offsetY: newProperties.shadowOffsetY,
          };
          controller.updateObjectProperty(
            activeObject,
            "shadow",
            shadowOptions
          );
        }
      } else if (key === "strokeWidth" || key === "stroke") {
        if (newProperties.outlineEnabled) {
          controller.updateObjectProperty(activeObject, "paintFirst", "stroke");
          controller.updateObjectProperty(activeObject, key, value);
        }
      } else {
        controller.updateObjectProperty(activeObject, key, value);
      }
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

          <div className="space-y-3">
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
                    className={cn(
                      "flex-1",
                      properties.underline && "bg-primary"
                    )}
                  />
                </Tooltip>
              </Space.Compact>
            </div>
          </div>

          <div className="space-y-3">
            <label className="mt-4! text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Alignment
            </label>
            <Space.Compact block>
              <Tooltip title="Left">
                <Button
                  icon={<AlignStartVertical size={16} />}
                  onClick={() => {
                    controller.alignObject(activeObject, "left");
                    handlePropertyChange("textAlign", "left");
                  }}
                  className="flex-1"
                />
              </Tooltip>
              <Tooltip title="Center">
                <Button
                  icon={<AlignCenterHorizontal size={16} />}
                  onClick={() => {
                    controller.alignObject(activeObject, "center");
                    handlePropertyChange("textAlign", "center");
                  }}
                  className="flex-1"
                />
              </Tooltip>
              <Tooltip title="Right">
                <Button
                  icon={<AlignEndVertical size={16} />}
                  onClick={() => {
                    controller.alignObject(activeObject, "right");
                    handlePropertyChange("textAlign", "right");
                  }}
                  className="flex-1"
                />
              </Tooltip>
              <Tooltip title="Top">
                <Button
                  icon={<AlignStartHorizontal size={16} />}
                  onClick={() =>
                    controller.alignObject(activeObject, undefined, "top")
                  }
                  className="flex-1 border-l-0"
                />
              </Tooltip>
              <Tooltip title="Middle">
                <Button
                  icon={<AlignCenterVertical size={16} />}
                  onClick={() =>
                    controller.alignObject(activeObject, undefined, "middle")
                  }
                  className="flex-1"
                />
              </Tooltip>
              <Tooltip title="Bottom">
                <Button
                  icon={<AlignEndHorizontal size={16} />}
                  onClick={() =>
                    controller.alignObject(activeObject, undefined, "bottom")
                  }
                  className="flex-1"
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

        {/* Outline */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Outline
            </label>
            <Switch
              size="small"
              checked={properties.outlineEnabled}
              onChange={(val) => handlePropertyChange("outlineEnabled", val)}
            />
          </div>
          {properties.outlineEnabled && (
            <div className="flex gap-3 items-center animate-in fade-in slide-in-from-top-2">
              <ColorPicker
                value={properties.stroke}
                onChange={(c) =>
                  handlePropertyChange("stroke", c.toHexString())
                }
                showText
              />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">
                    Weight
                  </span>
                  <span className="text-[10px] font-mono font-bold">
                    {properties.strokeWidth}px
                  </span>
                </div>
                <Slider
                  min={0}
                  max={20}
                  value={properties.strokeWidth}
                  onChange={(val) => handlePropertyChange("strokeWidth", val)}
                  tooltip={{ open: false }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Shadow */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Shadow
            </label>
            <Switch
              size="small"
              checked={properties.shadowEnabled}
              onChange={(val) => handlePropertyChange("shadowEnabled", val)}
            />
          </div>
          {properties.shadowEnabled && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex gap-3 items-center">
                <ColorPicker
                  value={properties.shadowColor}
                  onChange={(c) =>
                    handlePropertyChange("shadowColor", c.toRgbString())
                  }
                  showText
                />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">
                      Blur
                    </span>
                    <span className="text-[10px] font-mono font-bold">
                      {properties.shadowBlur}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={50}
                    value={properties.shadowBlur}
                    onChange={(val) => handlePropertyChange("shadowBlur", val)}
                    tooltip={{ open: false }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">
                      Offset X
                    </span>
                    <span className="text-[10px] font-mono font-bold">
                      {properties.shadowOffsetX}
                    </span>
                  </div>
                  <Slider
                    min={-50}
                    max={50}
                    value={properties.shadowOffsetX}
                    onChange={(val) =>
                      handlePropertyChange("shadowOffsetX", val)
                    }
                    tooltip={{ open: false }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">
                      Offset Y
                    </span>
                    <span className="text-[10px] font-mono font-bold">
                      {properties.shadowOffsetY}
                    </span>
                  </div>
                  <Slider
                    min={-50}
                    max={50}
                    value={properties.shadowOffsetY}
                    onChange={(val) =>
                      handlePropertyChange("shadowOffsetY", val)
                    }
                    tooltip={{ open: false }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};
