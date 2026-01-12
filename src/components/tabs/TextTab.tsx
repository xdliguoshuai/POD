import React, { useState } from "react";
import { Input, Button, ConfigProvider } from "antd";
import { Type, Plus } from "lucide-react";
import { CanvasController } from "../../lib/CanvasController";

const { TextArea } = Input;

const THEME = {
  token: {
    colorPrimary: "#194236",
    borderRadius: 6,
  },
};

interface TextPanelProps {
  onAdd?: () => void;
}

export const TextPanel: React.FC<TextPanelProps> = ({ onAdd }) => {
  const controller = CanvasController.getInstance();
  const [newText, setNewText] = useState("");

  const handleAddText = () => {
    const textToAdd = newText.trim() || "New Text";
    controller.addText(textToAdd, {
      fontFamily: "Inter",
      fontSize: 40,
      fill: "#000000",
      textAlign: "center",
    });
    setNewText("");
    onAdd?.();
  };

  return (
    <ConfigProvider theme={THEME}>
      <div className="flex flex-col gap-6 p-1 h-full overflow-y-auto custom-scrollbar">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Add New Text
            </label>
            <TextArea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Type your message here..."
              autoSize={{ minRows: 4, maxRows: 8 }}
              className="text-base font-medium rounded-lg border-2 focus:border-primary"
            />
          </div>
          <Button
            type="primary"
            block
            icon={<Plus size={18} />}
            onClick={handleAddText}
            className="h-12 bg-primary hover:bg-primary/90 text-base font-semibold rounded-lg shadow-md"
          >
            Add to Canvas
          </Button>

          <div className="pt-8 flex flex-col items-center justify-center text-center opacity-40">
            <Type size={48} className="mb-3 text-muted-foreground" />
            <p className="text-sm font-medium">
              Text will be added to the center of the canvas
            </p>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export { TextPanel as TextLayerInput };
