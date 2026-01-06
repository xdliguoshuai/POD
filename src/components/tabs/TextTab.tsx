import { CanvasController } from "../../lib/CanvasController";
import { Button, Select, Input, ColorPicker, Space, Segmented } from "antd";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

interface Props {
  text: string;
  font: string;
  color: string;
  onChange: (updates: { text?: string; font?: string; color?: string }) => void;
}

export function TextLayerInput({ text, font, color, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Add Text
        </label>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Enter your text..."
          />
          <Button
            type="primary"
            onClick={() => {
              try {
                const controller = CanvasController.getInstance();
                controller.addText(text, {
                  fontFamily: font,
                  fill: color,
                });
              } catch (error) {
                console.error("CanvasController not initialized", error);
              }
            }}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Font Family
        </label>
        <Select
          value={font}
          onChange={(val) => onChange({ font: val })}
          style={{ width: "100%" }}
          options={[
            { value: "Inter", label: "Inter" },
            { value: "Roboto", label: "Roboto" },
            { value: "Montserrat", label: "Montserrat" },
            { value: "Playfair Display", label: "Playfair Display" },
            { value: "Oswald", label: "Oswald" },
          ]}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Style
          </label>
          <Space.Compact block>
            <Button icon={<Bold size={16} />} className="flex-1" />
            <Button icon={<Italic size={16} />} className="flex-1" />
            <Button icon={<Underline size={16} />} className="flex-1" />
          </Space.Compact>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Align
          </label>
          <Space.Compact block>
            <Button icon={<AlignLeft size={16} />} className="flex-1" />
            <Button icon={<AlignCenter size={16} />} className="flex-1" />
            <Button icon={<AlignRight size={16} />} className="flex-1" />
          </Space.Compact>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Color
        </label>
        <div className="flex gap-2 items-center">
          <ColorPicker
            value={color}
            onChange={(c) => onChange({ color: c.toHexString() })}
            showText
          />
        </div>
      </div>
    </div>
  );
}
