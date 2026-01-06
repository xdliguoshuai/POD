import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

import { Button } from "antd";
import { Badge } from "../ui/Badge";
import { PRODUCTS, Product } from "../data/mockData";
import { ProductType } from "../state/types";
import { cn } from "../lib/utils";

export const ProductListingPage: React.FC = () => {
  const [filterType, setFilterType] = useState<ProductType | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">(
    "newest"
  );

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filterType !== "all") {
      result = result.filter((p) => p.type === filterType);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest (mock logic: put 'isNew' first)
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [filterType, sortBy]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            The Collection
          </h1>
          <p className="text-muted-foreground max-w-[600px]">
            Curated blanks designed for high-end customization. Select a product
            to begin the design process.
          </p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center bg-muted/30 p-1 rounded-lg border">
            {(["all", "t-shirt", "sweatshirt", "hoodie"] as const).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize",
                    filterType === type
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {type === "all" ? "All Products" : type}
                </button>
              )
            )}
          </div>

          <select
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="group block"
          >
            <Card className="h-full border-transparent shadow-none hover:border-border transition-all duration-300 bg-transparent">
              <div
                className={cn(
                  "aspect-[4/5] rounded-lg mb-4 relative overflow-hidden bg-muted/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]"
                )}
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {product.isNew && (
                    <Badge className="bg-foreground text-background hover:bg-foreground/90">
                      New
                    </Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm shadow-sm"
                    >
                      Best Seller
                    </Badge>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-x-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Button className="w-full shadow-lg" size="small">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="space-y-2 p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-sm font-medium tabular-nums">
                    ${product.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {product.shortDescription}
                </p>

                {/* Color Swatches Mini */}
                <div className="flex gap-1.5 pt-1">
                  {product.colors.slice(0, 5).map((c) => (
                    <div
                      key={c.name}
                      className="w-3 h-3 rounded-full border border-border/50"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                  {product.colors.length > 5 && (
                    <span className="text-[10px] text-muted-foreground">+</span>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};
