import { BasicParams, SizeOption, ColorOption } from "../state/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Select } from "antd";
import { Input } from "../components/ui/Input";

interface Props {
  value: BasicParams;
  onChange: (v: BasicParams) => void;
}

export default function BasicParamsForm({ value, onChange }: Props) {
  return (
    <Card className="shadow-none border-0 bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Product Specifications
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Size
          </label>
          <Select
            className="w-full"
            value={value.size ?? undefined}
            onChange={(val) =>
              onChange({ ...value, size: (val || null) as SizeOption | null })
            }
            placeholder="Select Size"
            options={(["S", "M", "L", "XL"] as SizeOption[]).map((s) => ({
              value: s,
              label: s,
            }))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Color
          </label>
          <Select
            className="w-full"
            value={value.color ?? undefined}
            onChange={(val) =>
              onChange({ ...value, color: (val || null) as ColorOption | null })
            }
            placeholder="Select Color"
            options={(["black", "white", "gray"] as ColorOption[]).map((c) => ({
              value: c,
              label: c.charAt(0).toUpperCase() + c.slice(1),
            }))}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Quantity
          </label>
          <Input
            type="number"
            min={1}
            value={value.quantity ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                quantity: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            placeholder="Enter quantity"
          />
        </div>
      </CardContent>
    </Card>
  );
}
