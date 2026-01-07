import React, { useState, useEffect } from "react";
import { 
  Input, 
  Select, 
  Slider, 
  ColorPicker, 
  Button, 
  Segmented, 
  ConfigProvider, 
  Space, 
  Tooltip,
  Empty
} from "antd";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Type, 
  Plus,
  CaseUpper,
  CaseLower
} from "lucide-react";
import { CanvasController } from "../../lib/CanvasController";

const { TextArea } = Input;
const { Option } = Select;

// --- Types ---

interface TextLayer {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
  align: "left" | "center" | "right";
  style: ("bold" | "italic" | "underline")[];
  letterSpacing: number;
  lineHeight: number;
  transform: "none" | "uppercase" | "lowercase";
  locked: boolean;
}

// Props from parent (CustomizerPage) - keeping for compatibility but we might largely manage state internally for the prototype
interface Props {
  text?: string;
  font?: string;
  color?: string;
  onChange?: (updates: { text?: string; font?: string; color?: string }) => void;
}

const THEME = {
  token: {
    colorPrimary: "#194236",
    borderRadius: 6,
  },
};

const FONTS = [
  { value: "Inter", label: "Inter", type: "sans-serif" },
  { value: "Roboto", label: "Roboto", type: "sans-serif" },
  { value: "Montserrat", label: "Montserrat", type: "sans-serif" },
  { value: "Playfair Display", label: "Playfair Display", type: "serif" },
  { value: "Oswald", label: "Oswald", type: "sans-serif" },
  { value: "Pacifico", label: "Pacifico", type: "display" },
];

const RECENT_COLORS = [
  "#194236", "#000000", "#FFFFFF", "#E63946", "#F1FAEE", "#A8DADC", "#457B9D"
];

export const TextPanel: React.FC<Props> = ({ text, font, color, onChange }) => {
  // Mock State for Layers
  const [layers, setLayers] = useState<TextLayer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  // Sync from props if provided (optional, for "AI" interoperability mock)
  useEffect(() => {
    if (text && selectedLayerId) {
       updateLayer(selectedLayerId, { text });
    }
  }, [text]);

  // --- Actions ---

  const addTextLayer = () => {
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: "Double click to edit",
      fontFamily: font || "Inter",
      fontSize: 32,
      fill: color || "#000000",
      align: "center",
      style: [],
      letterSpacing: 0,
      lineHeight: 1.2,
      transform: "none",
      locked: false,
    };

    setLayers([...layers, newLayer]);
    setSelectedLayerId(newLayer.id);
    
    // Mock Canvas Interaction
    try {
        const controller = CanvasController.getInstance();
        controller.addText(newLayer.text, { 
            fontFamily: newLayer.fontFamily, 
            fill: newLayer.fill 
        });
    } catch (e) {
        console.warn("Canvas not ready");
    }
  };

  const updateLayer = (id: string, updates: Partial<TextLayer>) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    
    // Sync back to parent if needed
    if (onChange && updates.text) onChange({ text: updates.text });
    if (onChange && updates.fontFamily) onChange({ font: updates.fontFamily });
    if (onChange && updates.fill) onChange({ color: updates.fill });
  };

  const handleStyleToggle = (style: "bold" | "italic" | "underline") => {
    if (!selectedLayer) return;
    const currentStyles = selectedLayer.style;
    const newStyles = currentStyles.includes(style)
      ? currentStyles.filter(s => s !== style)
      : [...currentStyles, style];
    updateLayer(selectedLayer.id, { style: newStyles });
  };

  return (
    <ConfigProvider theme={THEME}>
      <div className="flex flex-col gap-6 p-1 h-full overflow-y-auto">
        
        {/* 1. Add Text Action */}
        <div>
          <Button 
            type="primary" 
            block 
            icon={<Plus size={16} />} 
            onClick={addTextLayer}
            className="h-10 bg-[#194236] font-medium"
          >
            Add Text Layer
          </Button>
        </div>

        {selectedLayer ? (
          <>
            {/* 2. Text Content */}
            <div className="space-y-2 animate-fade-in">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Content</label>
              <TextArea 
                value={selectedLayer.text}
                onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                placeholder="Type something..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                className="text-sm font-medium"
                disabled={selectedLayer.locked}
              />
            </div>

            {/* 3. Font Controls */}
            <div className="space-y-3 animate-fade-in">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Typography</label>
              
              <Select
                value={selectedLayer.fontFamily}
                onChange={(val) => updateLayer(selectedLayer.id, { fontFamily: val })}
                className="w-full"
                options={FONTS.map(f => ({ label: <span style={{ fontFamily: f.value }}>{f.label}</span>, value: f.value }))}
                disabled={selectedLayer.locked}
              />

              <div className="flex items-center gap-3">
                 <div className="flex-1">
                    <Input 
                        type="number" 
                        value={selectedLayer.fontSize} 
                        onChange={e => updateLayer(selectedLayer.id, { fontSize: Number(e.target.value) })}
                        prefix={<span className="text-xs text-gray-400">px</span>}
                        disabled={selectedLayer.locked}
                    />
                 </div>
                 <div className="flex-[2]">
                    <Slider 
                        min={8} 
                        max={120} 
                        value={selectedLayer.fontSize}
                        onChange={val => updateLayer(selectedLayer.id, { fontSize: val })}
                        disabled={selectedLayer.locked}
                    />
                 </div>
              </div>

              {/* Styles */}
              <div className="flex gap-2">
                 <Space.Compact block>
                    <Tooltip title="Bold">
                        <Button 
                            icon={<Bold size={16} />} 
                            type={selectedLayer.style.includes("bold") ? "primary" : "default"}
                            onClick={() => handleStyleToggle("bold")}
                            className={selectedLayer.style.includes("bold") ? "bg-[#194236]" : ""}
                            disabled={selectedLayer.locked}
                        />
                    </Tooltip>
                    <Tooltip title="Italic">
                        <Button 
                            icon={<Italic size={16} />} 
                            type={selectedLayer.style.includes("italic") ? "primary" : "default"}
                            onClick={() => handleStyleToggle("italic")}
                            className={selectedLayer.style.includes("italic") ? "bg-[#194236]" : ""}
                            disabled={selectedLayer.locked}
                        />
                    </Tooltip>
                    <Tooltip title="Underline">
                        <Button 
                            icon={<Underline size={16} />} 
                            type={selectedLayer.style.includes("underline") ? "primary" : "default"}
                            onClick={() => handleStyleToggle("underline")}
                            className={selectedLayer.style.includes("underline") ? "bg-[#194236]" : ""}
                            disabled={selectedLayer.locked}
                        />
                    </Tooltip>
                 </Space.Compact>

                 <Space.Compact block>
                    <Tooltip title="Align Left">
                        <Button 
                            icon={<AlignLeft size={16} />} 
                            type={selectedLayer.align === "left" ? "primary" : "default"}
                            onClick={() => updateLayer(selectedLayer.id, { align: "left" })}
                            className={selectedLayer.align === "left" ? "bg-[#194236]" : ""}
                            disabled={selectedLayer.locked}
                        />
                    </Tooltip>
                    <Tooltip title="Align Center">
                        <Button 
                            icon={<AlignCenter size={16} />} 
                            type={selectedLayer.align === "center" ? "primary" : "default"}
                            onClick={() => updateLayer(selectedLayer.id, { align: "center" })}
                            className={selectedLayer.align === "center" ? "bg-[#194236]" : ""}
                            disabled={selectedLayer.locked}
                        />
                    </Tooltip>
                    <Tooltip title="Align Right">
                        <Button 
                            icon={<AlignRight size={16} />} 
                            type={selectedLayer.align === "right" ? "primary" : "default"}
                            onClick={() => updateLayer(selectedLayer.id, { align: "right" })}
                            className={selectedLayer.align === "right" ? "bg-[#194236]" : ""}
                            disabled={selectedLayer.locked}
                        />
                    </Tooltip>
                 </Space.Compact>
              </div>
            </div>

            {/* 4. Color */}
            <div className="space-y-2 animate-fade-in">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Color</label>
              <div className="flex gap-2 items-center">
                  <ColorPicker 
                    value={selectedLayer.fill} 
                    onChange={c => updateLayer(selectedLayer.id, { fill: c.toHexString() })}
                    showText
                    disabled={selectedLayer.locked}
                  />
                  <div className="flex gap-1 flex-wrap">
                      {RECENT_COLORS.map(c => (
                          <div 
                            key={c} 
                            className="w-6 h-6 rounded-full cursor-pointer border border-gray-200"
                            style={{ backgroundColor: c }}
                            onClick={() => !selectedLayer.locked && updateLayer(selectedLayer.id, { fill: c })}
                          />
                      ))}
                  </div>
              </div>
            </div>

            {/* 6. Advanced Typography */}
            <div className="space-y-4 pt-2 border-t border-gray-100 animate-fade-in">
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Letter Spacing</label>
                        <span className="text-xs text-gray-500">{selectedLayer.letterSpacing}</span>
                    </div>
                    <Slider 
                        min={-5} 
                        max={20} 
                        value={selectedLayer.letterSpacing}
                        onChange={val => updateLayer(selectedLayer.id, { letterSpacing: val })}
                        disabled={selectedLayer.locked}
                    />
                </div>
                
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Line Height</label>
                        <span className="text-xs text-gray-500">{selectedLayer.lineHeight}</span>
                    </div>
                    <Slider 
                        min={0.8} 
                        max={3} 
                        step={0.1}
                        value={selectedLayer.lineHeight}
                        onChange={val => updateLayer(selectedLayer.id, { lineHeight: val })}
                        disabled={selectedLayer.locked}
                    />
                </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Transform</label>
                    <Segmented
                        block
                        value={selectedLayer.transform}
                        onChange={(val: any) => updateLayer(selectedLayer.id, { transform: val })}
                        options={[
                            { label: 'None', value: 'none', icon: <Type size={14} /> },
                            { label: 'Upper', value: 'uppercase', icon: <CaseUpper size={14} /> },
                            { label: 'Lower', value: 'lowercase', icon: <CaseLower size={14} /> },
                        ]}
                        disabled={selectedLayer.locked}
                    />
                 </div>
            </div>
          </>
        ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 p-4">
              <Type size={48} className="mb-2 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">No text layer selected</p>
              <p className="text-xs text-gray-400">Add a text layer to start editing</p>
           </div>
        )}
      </div>
    </ConfigProvider>
  );
};

// Export as TextLayerInput for backward compatibility with CustomizerPage imports
export { TextPanel as TextLayerInput };
