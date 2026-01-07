import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ProductType,
  CustomizationArea,
  Technique,
  BasicParams,
  DesignParams,
  ColorOption,
} from "../state/types";
import ProductSelector from "../components/ProductSelector";
import BasicParamsForm from "../components/BasicParams";
import CustomizationAreaSelector from "../components/CustomizationArea";
import TechniqueSelector from "../components/TechniqueSelector";
import DesignInput from "../components/DesignInput";
import CostDisplay from "../components/CostDisplay";
import Visualization from "../components/Visualization";
import { useValidation } from "../hooks/useValidation";
import { TopProductInfo } from "../components/TopProductInfo";
import {
  VerticalTabsSidebar,
  SidebarTabId,
} from "../components/VerticalTabsSidebar";
import { FixedBottomBanner } from "../components/FixedBottomBanner";
import { SidebarSection } from "../components/SidebarSection";
import { getProductById, PRODUCTS } from "../data/mockData";
import { TextLayerInput } from "../components/tabs/TextTab";
import { UploadsTab } from "../components/tabs/UploadsTab";
import { LayersTab } from "../components/tabs/LayersTab";
import { ClipartTab } from "../components/tabs/ClipartTab";
import { QuickTab } from "../components/tabs/QuickTab";
import { DesignsTab } from "../components/tabs/DesignsTab";
import { PremiumTab } from "../components/tabs/PremiumTab";
import { FillTab } from "../components/tabs/FillTab";
import { AIAssistTab } from "../components/tabs/AIAssistTab";
import { Lock } from "lucide-react";

export const CustomizerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const initialProductData = getProductById(productId);
  const initialProductType = initialProductData?.type || "t-shirt";

  const [product, setProduct] = useState<ProductType>(initialProductType);
  const [basic, setBasic] = useState<BasicParams>({
    size: null,
    color: null,
    quantity: null,
  });
  const [area, setArea] = useState<CustomizationArea[]>([]);
  const [technique, setTechnique] = useState<Technique>("dtg");
  const [design, setDesign] = useState<DesignParams>({
    widthMm: null,
    heightMm: null,
    colorsCount: null,
    dpi: null,
    background: null,
  });

  // Lifted Text State for AI Interoperability
  const [textConfig, setTextConfig] = useState({
    text: "",
    font: "Inter",
    color: "#000000",
  });

  const [activeTab, setActiveTab] = useState<SidebarTabId>("product");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  // Sync initial product from URL
  useEffect(() => {
    if (initialProductData) {
      setProduct(initialProductData.type);
      // Pre-select first color if available
      if (initialProductData.colors.length > 0) {
        setBasic((prev) => ({
          ...prev,
          color: initialProductData.colors[0].name as ColorOption,
        }));
      }
    }
  }, [initialProductData]);

  function resetForProduct() {
    setBasic({ size: null, color: null, quantity: null });
    setArea([]);
    setTechnique("dtg");
    setDesign({
      widthMm: null,
      heightMm: null,
      colorsCount: null,
      dpi: null,
      background: null,
    });
  }

  const { results, cost } = useValidation(
    product,
    area,
    technique,
    basic,
    design
  );

  // Resolve the actual product data object to use for visualization
  const activeProductData =
    initialProductData && initialProductData.type === product
      ? initialProductData
      : PRODUCTS.find((p) => p.type === product) || PRODUCTS[0];

  // Use mock data price if available, otherwise fallback to calculated base
  const displayBasePrice = activeProductData
    ? activeProductData.price
    : cost.base;
  const totalCost = {
    ...cost,
    base: displayBasePrice,
    total: displayBasePrice + cost.techniqueFee + cost.areaFee,
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Top: Product Core Information */}
      <TopProductInfo product={product} basePrice={displayBasePrice} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left: Vertical Tabbed Sidebar */}
        <div className="relative z-10 h-full flex shrink-0">
          <VerticalTabsSidebar activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === "product" && (
              <>
                <SidebarSection
                  title="Product Type"
                  required
                  defaultOpen={true}
                >
                  <ProductSelector
                    value={product}
                    onChange={setProduct}
                    onReset={resetForProduct}
                  />
                </SidebarSection>
                <SidebarSection
                  title="Product Specifications"
                  required
                  defaultOpen={true}
                >
                  <BasicParamsForm value={basic} onChange={setBasic} />
                </SidebarSection>
                <SidebarSection title="Print Area" required defaultOpen={true}>
                  <CustomizationAreaSelector
                    product={product}
                    value={area}
                    onChange={setArea}
                    technique={technique}
                  />
                </SidebarSection>
                <SidebarSection title="Technique" required defaultOpen={true}>
                  <TechniqueSelector
                    value={technique}
                    onChange={setTechnique}
                    product={product}
                    area={area}
                  />
                </SidebarSection>
              </>
            )}

            {activeTab === "text" && (
              <SidebarSection title="Text Editor" required defaultOpen={true}>
                <TextLayerInput onAdd={() => setActiveTab("layers")} />
              </SidebarSection>
            )}

            {activeTab === "uploads" && (
              <SidebarSection title="Uploads" required defaultOpen={true}>
                <UploadsTab />
              </SidebarSection>
            )}

            {activeTab === "layers" && (
              <SidebarSection title="Layers" required defaultOpen={true}>
                <LayersTab />
              </SidebarSection>
            )}

            {activeTab === "clipart" && (
              <SidebarSection
                title="Clipart Library"
                required
                defaultOpen={true}
              >
                <ClipartTab />
              </SidebarSection>
            )}

            {activeTab === "quick" && (
              <SidebarSection title="Quick Designs" required defaultOpen={true}>
                <QuickTab />
              </SidebarSection>
            )}

            {activeTab === "designs" && (
              <SidebarSection title="My Designs" required defaultOpen={true}>
                <DesignsTab />
              </SidebarSection>
            )}

            {activeTab === "ai-assist" && (
              <SidebarSection
                title="AI Design Assistant"
                required
                defaultOpen={true}
              >
                <AIAssistTab
                  onAutoLayout={() => {
                    // Mock Auto Layout: Center the content or apply "golden ratio" logic
                    console.log("AI Auto Layout Applied");
                  }}
                  onApplyFontSuggestion={(font) =>
                    setTextConfig((prev) => ({ ...prev, font }))
                  }
                  onApplyColorSuggestion={(color) =>
                    setTextConfig((prev) => ({ ...prev, color }))
                  }
                  results={{
                    dpi: design.dpi && design.dpi < 150 ? "low" : "ok",
                    contrast: "ok", // Mock
                    margins: "ok", // Mock
                  }}
                />
              </SidebarSection>
            )}

            {activeTab === "premium" && (
              <SidebarSection
                title="Premium Assets"
                required
                defaultOpen={true}
              >
                <PremiumTab />
              </SidebarSection>
            )}

            {activeTab === "fill" && (
              <SidebarSection title="Fill & Color" required defaultOpen={true}>
                <FillTab />
              </SidebarSection>
            )}
          </VerticalTabsSidebar>

          {/* 3D Mode Overlay - Disables interaction with sidebar content */}
          {viewMode === "3d" && (
            <div className="absolute inset-0 z-50 bg-background/50 backdrop-blur-[1px] flex items-center justify-center text-center p-6 cursor-not-allowed">
              <div className="bg-background/90 p-4 rounded-lg border shadow-lg max-w-[200px]">
                <Lock
                  className="mx-auto mb-2 text-muted-foreground"
                  size={24}
                />
                <p className="text-sm font-medium">Editing Disabled</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Switch to 2D Design mode to make changes.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Center: Real-time Preview Canvas */}
        <div className="flex-1 bg-muted/10 relative overflow-hidden flex items-center justify-center p-8 lg:p-12 pb-32">
          <div className="w-full h-full max-w-2xl max-h-[800px] transition-all duration-300">
            <Visualization
              product={product}
              productData={activeProductData}
              area={area}
              selectedColor={basic.color}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>
      </div>

      {/* Bottom: Fixed Banner */}
      <FixedBottomBanner
        results={results}
        cost={totalCost}
        onAddToCart={() =>
          console.log("Added to cart", {
            product,
            basic,
            area,
            technique,
            design,
          })
        }
      />
    </div>
  );
};
