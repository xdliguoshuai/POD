import { UploadCloud } from "lucide-react";
import { useRef } from "react";
import { CanvasController } from "../../lib/CanvasController";

export function UploadsTab() {
  return (
    <div className="space-y-6">
      <div
        className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-4 text-center hover:border-primary/50 hover:bg-muted/10 transition-colors cursor-pointer group"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              try {
                const controller = CanvasController.getInstance();
                await controller.addImage(url);
              } catch (error) {
                console.error("CanvasController not initialized", error);
              }
            }
          };
          input.click();
        }}
      >
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <UploadCloud size={24} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Click to upload or drag & drop</p>
          <p className="text-xs text-muted-foreground">
            SVG, PNG, JPG (max. 10MB)
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your Uploads
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="aspect-square rounded border bg-muted/20 flex items-center justify-center hover:border-primary cursor-pointer relative group"
            >
              <span className="text-[10px] text-muted-foreground">IMG_{i}</span>
              <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground w-4 h-4 rounded flex items-center justify-center text-[10px] transition-opacity">
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
