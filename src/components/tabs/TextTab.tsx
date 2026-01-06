import { useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/SelectNew'

interface Props {
  text: string
  font: string
  color: string
  onChange: (updates: { text?: string, font?: string, color?: string }) => void
}

export function TextLayerInput({ text, font, color, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add Text</label>
        <div className="flex gap-2">
            <input 
                type="text" 
                value={text}
                onChange={(e) => onChange({ text: e.target.value })}
                placeholder="Enter your text..."
                className="flex-1 h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button size="sm">Add</Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Font Family</label>
        <Select 
            value={font}
            onValueChange={(val) => onChange({ font: val })}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                <SelectItem value="Oswald">Oswald</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Style</label>
            <div className="flex bg-muted/20 rounded-md p-1 border">
                <button className="flex-1 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all"><Bold size={16} /></button>
                <button className="flex-1 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all"><Italic size={16} /></button>
                <button className="flex-1 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all"><Underline size={16} /></button>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Align</label>
            <div className="flex bg-muted/20 rounded-md p-1 border">
                <button className="flex-1 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all"><AlignLeft size={16} /></button>
                <button className="flex-1 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all"><AlignCenter size={16} /></button>
                <button className="flex-1 h-8 flex items-center justify-center rounded hover:bg-white hover:shadow-sm transition-all"><AlignRight size={16} /></button>
            </div>
          </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Color</label>
        <div className="flex gap-2">
            <div className="w-10 h-10 rounded border overflow-hidden">
                <input 
                    type="color" 
                    value={color}
                    onChange={(e) => onChange({ color: e.target.value })}
                    className="w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                />
            </div>
            <div className="flex-1 flex items-center px-3 border rounded-md font-mono text-xs text-muted-foreground">
                {color.toUpperCase()}
            </div>
        </div>
      </div>
    </div>
  )
}
