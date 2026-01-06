import { ProductType } from "../state/types";
import { Card } from "../ui/Card";

import { Button } from "antd";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  product: ProductType;
  basePrice: number;
}

export function TopProductInfo({ product, basePrice }: Props) {
  const label =
    product === "t-shirt"
      ? "Premium Cotton T-Shirt"
      : product === "sweatshirt"
      ? "Heavyweight Crewneck"
      : "Signature Hoodie";

  // Mock thumbnails based on type (since Customizer might not have full product object yet)
  const thumbnail =
    product === "t-shirt"
      ? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=100&q=60"
      : product === "sweatshirt"
      ? "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=100&q=60"
      : "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=100&q=60";

  return (
    <div className="w-full bg-background border-b px-6 py-3 flex items-center justify-between z-20">
      <div className="flex items-center gap-4">
        {/* Thumbnail Placeholder */}
        <div className="h-10 w-10 bg-muted/20 rounded-md border flex items-center justify-center overflow-hidden relative">
          <img
            src={thumbnail}
            alt={label}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-tight text-foreground">
            {label}
          </h1>
          <p className="text-xs text-muted-foreground">
            Base Price: ¥{basePrice}
          </p>
        </div>
      </div>

      {/* Close Button (Right Side) */}
      <Link to="/products">
        <Button
          type="text"
          shape="circle"
          className="text-muted-foreground hover:text-foreground"
          icon={<X className="h-5 w-5" />}
        />
      </Link>
    </div>
  );
}
