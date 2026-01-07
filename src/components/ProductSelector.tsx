import { ProductType } from "../state/types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

import { Button } from "antd";
import { Shirt, Hexagon, Component } from "lucide-react";

interface Props {
  value: ProductType;
  onChange: (v: ProductType) => void;
  onReset: () => void;
}

export default function ProductSelector({ value, onChange, onReset }: Props) {
  return (
    <Card className="shadow-none border-0 bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Product Type
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 grid grid-cols-3 gap-3">
        {(["t-shirt", "sweatshirt", "hoodie"] as ProductType[]).map((t) => {
          const isActive = value === t;
          return (
            <Button
              key={t}
              type="default"
              className={`h-24 flex flex-col gap-2 items-center justify-center ${
                isActive
                  ? "bg-primary text-white hover:bg-primary/90 border-none ring-2 ring-primary ring-offset-2"
                  : "hover:border-primary/50"
              }`}
              onClick={() => {
                if (value !== t) {
                  onChange(t);
                  onReset();
                }
              }}
            >
              {t === "t-shirt" && <Shirt className="h-6 w-6" />}
              {t === "sweatshirt" && <Hexagon className="h-6 w-6" />}
              {t === "hoodie" && <Component className="h-6 w-6" />}
              <span className="text-xs font-medium block mt-1">
                {t === "t-shirt"
                  ? "T-Shirt"
                  : t === "sweatshirt"
                  ? "Crewneck"
                  : "Hoodie"}
              </span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
