import { Technique, ProductType, CustomizationArea } from "../state/types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

import { Button } from "antd";

interface Props {
  value: Technique;
  onChange: (v: Technique) => void;
  product: ProductType;
  area: CustomizationArea[];
}

export default function TechniqueSelector({
  value,
  onChange,
  product,
  area,
}: Props) {
  const options: Technique[] = ["dtg", "embroidery"];

  function disabledFor(t: Technique) {
    if (t === "embroidery" && area.includes("back")) return false; // Logic might need update for multi-area
    return false;
  }

  return (
    <Card className="shadow-none border-0 bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Technique
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex gap-2">
        {options.map((t) => {
          const disabled = disabledFor(t);
          const isActive = value === t;
          return (
            <Button
              key={t}
              type={isActive ? "primary" : "default"}
              size="small"
              disabled={disabled}
              onClick={() => onChange(t)}
            >
              {t === "dtg" ? "DTG Printing" : "Embroidery"}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
