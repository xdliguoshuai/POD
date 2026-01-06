import { DesignParams } from "../state/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "antd";

interface Props {
  value: DesignParams;
  onChange: (v: DesignParams) => void;
}

export default function DesignInput({ value, onChange }: Props) {
  return (
    <Card className="shadow-none border-0 bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Artwork Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Width (mm)
          </label>
          <Input
            type="number"
            value={value.widthMm ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                widthMm: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Height (mm)
          </label>
          <Input
            type="number"
            value={value.heightMm ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                heightMm: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Color Count
          </label>
          <Input
            type="number"
            value={value.colorsCount ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                colorsCount: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            DPI
          </label>
          <Select
            className="w-full"
            value={value.dpi?.toString()}
            onChange={(val) =>
              onChange({
                ...value,
                dpi: (val ? parseInt(val) : null) as 72 | 150 | 300 | null,
              })
            }
            placeholder="Select DPI"
            options={[
              { value: "72", label: "72" },
              { value: "150", label: "150" },
              { value: "300", label: "300" },
            ]}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Background Type
          </label>
          <Select
            className="w-full"
            value={value.background ?? undefined}
            onChange={(val) =>
              onChange({
                ...value,
                background: (val || null) as "transparent" | "opaque" | null,
              })
            }
            placeholder="Select Background"
            options={[
              { value: "transparent", label: "Transparent" },
              { value: "opaque", label: "Opaque" },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
