import { CustomizationArea, ProductType } from "../state/types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

import { Button } from "antd";

interface Props {
  product: ProductType;
  value: CustomizationArea[];
  onChange: (v: CustomizationArea[]) => void;
  technique: string;
}

export default function CustomizationAreaSelector({
  product,
  value,
  onChange,
}: Props) {
  const areas: CustomizationArea[] = [
    "front",
    "back",
    "left-sleeve",
    "right-sleeve",
    "hood",
  ];
  return (
    <Card className="shadow-none border-0 bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Print Area (Multi-select)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex flex-wrap gap-2">
        {areas.map((a) => {
          const visible = product === "hoodie" ? true : a !== "hood";
          if (!visible) return null;

          const disabled = false; // Logic for disabled states can be re-enabled if needed
          const isActive = value.includes(a);

          const name =
            a === "front"
              ? "Front"
              : a === "back"
              ? "Back"
              : a === "left-sleeve"
              ? "Left Sleeve"
              : a === "right-sleeve"
              ? "Right Sleeve"
              : "Hood";

          return (
            <Button
              key={a}
              type={isActive ? "primary" : "default"}
              size="small"
              onClick={() => {
                if (isActive) {
                  onChange(value.filter((v) => v !== a));
                } else {
                  onChange([...value, a]);
                }
              }}
            >
              {name}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
