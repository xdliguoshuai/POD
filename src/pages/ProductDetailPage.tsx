import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "antd";
import { Badge } from "../ui/Badge";
import { ArrowRight, ChevronLeft, Info, Check } from "lucide-react";
import { getProductById } from "../data/mockData";
import { cn } from "../lib/utils";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link
          to="/products"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Return to collection
        </Link>
      </div>
    );
  }

  // Update selected color if product changes (safety)
  if (
    selectedColor &&
    !product.colors.find((c) => c.name === selectedColor.name)
  ) {
    setSelectedColor(product.colors[0]);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link
          to="/products"
          className="hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <ChevronLeft size={14} /> Collection
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Left: Hero Image */}
        <div className="space-y-4">
          <div
            className={cn(
              "aspect-[4/5] rounded-xl border flex items-center justify-center relative overflow-hidden bg-muted/20 transition-colors duration-500"
            )}
          >
            <img
              src={product.images[activeImageIndex] || product.image}
              alt={product.name}
              className="object-cover w-full h-full absolute inset-0"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-lg border cursor-pointer transition-all bg-muted/20 hover:bg-muted/40 overflow-hidden relative",
                  activeImageIndex === i
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                )}
                onClick={() => setActiveImageIndex(i)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <div className="flex gap-2 mb-2">
              <Badge variant="outline">Premium Blank</Badge>
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground">
                  New Arrival
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-foreground">
              ${product.price}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Specs List */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {product.specs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 pt-6 border-t">
            {/* Color Selector */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Color
                </label>
                <span className="text-sm font-medium text-foreground">
                  {selectedColor?.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      className={cn(
                        "w-10 h-10 rounded-full border bg-muted flex items-center justify-center transition-all",
                        isSelected
                          ? "ring-2 ring-primary ring-offset-2 scale-110"
                          : "hover:scale-105"
                      )}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          className={cn(
                            color.value === "white" ||
                              color.value === "bone" ||
                              color.value === "cream"
                              ? "text-black"
                              : "text-white"
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to={`/customize?product=${product.id}`} className="flex-1">
                <Button
                  size="large"
                  type="default"
                  className="w-full text-lg h-14 bg-primary text-white hover:bg-primary/90 border-none shadow-lg shadow-primary/10 flex items-center justify-center"
                >
                  Customize Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="large" className="h-14 px-8">
                Bulk Inquiry
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-md border border-border/50">
              <Info size={14} className="text-primary" />
              <span>
                Start customizing to validate print areas and get accurate bulk
                pricing.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
