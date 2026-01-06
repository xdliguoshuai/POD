import { useState, useEffect, Suspense } from 'react'
import { ProductType, CustomizationArea } from '../state/types'
import { Card } from '../ui/Card'
import { Shirt, Hexagon, Component, ScanLine, RotateCw, AlertCircle, Box, Cuboid } from 'lucide-react'
import { Product } from '../data/mockData'
import { cn } from '../lib/utils'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei'
import { TShirtModel, CrewneckModel, HoodieModel } from './3d/ApparelModels'

interface Props {
  product: ProductType
  productData?: Product
  area: CustomizationArea[]
  selectedColor?: string | null
  viewMode: '2d' | '3d'
  onViewModeChange: (mode: '2d' | '3d') => void
}

interface Preview3DProps {
  color: string
  type: ProductType
  showFrontDesign: boolean
  showBackDesign: boolean
  activeView: 'front' | 'back'
}

function Preview3D({ color, type, showFrontDesign, showBackDesign, activeView }: Preview3DProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group rotation={[0, activeView === 'back' ? Math.PI : 0, 0]}>
            {type === 't-shirt' && <TShirtModel color={color} showFrontDesign={showFrontDesign} showBackDesign={showBackDesign} activeView={activeView} />}
            {type === 'sweatshirt' && <CrewneckModel color={color} showFrontDesign={showFrontDesign} showBackDesign={showBackDesign} activeView={activeView} />}
            {type === 'hoodie' && <HoodieModel color={color} showFrontDesign={showFrontDesign} showBackDesign={showBackDesign} activeView={activeView} />}
        </group>
      </Float>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      <Environment preset="city" />
    </>
  )
}

export default function Visualization({ product, productData, area, selectedColor, viewMode, onViewModeChange }: Props) {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front')
  
  // Auto-switch view based on selected area
  useEffect(() => {
      if (area.includes('back') && !area.includes('front')) {
          setCurrentView('back')
      } else if (area.includes('front')) {
          setCurrentView('front')
      }
  }, [area])

  const label = productData?.name || (
    product === 't-shirt' ? 'T-Shirt' :
    product === 'sweatshirt' ? 'Crewneck' : 'Hoodie'
  )

  // Determine Image Source
  const frontImage = productData?.images[0] || productData?.image
  const backImage = productData?.images[1] || frontImage 
  
  const activeImage = currentView === 'front' ? frontImage : backImage

  // Determine Overlay Position (Simplified 2D positioning)
  const overlayStyle = currentView === 'front' 
    ? { top: '25%', left: '28%', width: '44%', height: '50%' } 
    : { top: '25%', left: '28%', width: '44%', height: '50%' }

  const isAreaActive = area.includes(currentView)

  // Resolve Hex Color for 3D
  const activeHexColor = productData?.colors.find(c => c.name === selectedColor)?.hex || '#ffffff'

  return (
    <Card className="h-full w-full border-0 bg-transparent flex flex-col items-center justify-center relative overflow-hidden shadow-none">
      {/* Background Grid - Engineering style */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      {/* Mode Toggle (Top Center) */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 flex bg-background/80 backdrop-blur-sm border rounded-full p-1 gap-1 shadow-sm">
          <button
            onClick={() => onViewModeChange('2d')}
            className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5",
                viewMode === '2d' 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-muted text-muted-foreground"
            )}
          >
            <ScanLine size={14} />
            2D Design
          </button>
          <button
            onClick={() => onViewModeChange('3d')}
            className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5",
                viewMode === '3d' 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-muted text-muted-foreground"
            )}
          >
            <Cuboid size={14} />
            3D Preview
          </button>
      </div>

      {/* View Switcher (Floating Top Center - Only for 2D) */}
      {viewMode === '2d' && (
          <div className="absolute top-16 z-20 bg-background/80 backdrop-blur-sm border rounded-full p-1 flex gap-1 shadow-sm">
              <button 
                onClick={() => setCurrentView('front')}
                className={cn(
                    "px-4 py-1.5 text-xs font-medium rounded-full transition-all",
                    currentView === 'front' ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground"
                )}
              >
                  Front
              </button>
              <button 
                onClick={() => setCurrentView('back')}
                className={cn(
                    "px-4 py-1.5 text-xs font-medium rounded-full transition-all",
                    currentView === 'back' ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground"
                )}
              >
                  Back
              </button>
          </div>
      )}

      {/* Main Visualization Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-8 pt-32 lg:pt-36">
         
         {/* 2D MODE */}
         {viewMode === '2d' && (
             <div className="relative w-full max-w-lg aspect-[3/4] bg-white shadow-2xl rounded-sm overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-95">
                {/* Base Image */}
                {activeImage ? (
                    <div className="w-full h-full relative">
                        <img 
                            src={activeImage} 
                            alt={`${label} - ${currentView}`} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/10">
                         {product === 't-shirt' && <Shirt strokeWidth={1} size={120} className="text-muted-foreground/20" />}
                         {product === 'sweatshirt' && <Hexagon strokeWidth={1} size={120} className="text-muted-foreground/20" />}
                         {product === 'hoodie' && <Component strokeWidth={1} size={120} className="text-muted-foreground/20" />}
                    </div>
                )}

                {/* Print Area Overlay */}
                {isAreaActive ? (
                    <div 
                        className="absolute border-2 border-primary/80 bg-primary/5 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-[1px]"
                        style={overlayStyle}
                    >
                        <div className="opacity-50 flex flex-col items-center gap-2">
                            <ScanLine size={24} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                {currentView} Print Area
                            </span>
                            <span className="text-[9px] font-mono text-primary/80">12" x 16"</span>
                        </div>
                        
                        <div className="absolute -left-3 top-0 bottom-0 border-l border-primary/30 w-2 flex items-center">
                            <span className="text-[8px] -rotate-90 text-primary/60 font-mono whitespace-nowrap -ml-4">Height</span>
                        </div>
                        <div className="absolute -top-3 left-0 right-0 border-t border-primary/30 h-2 flex justify-center">
                             <span className="text-[8px] text-primary/60 font-mono -mt-3">Width</span>
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {area.length > 0 && (
                            <div className="bg-black/60 text-white px-4 py-2 rounded-full text-xs backdrop-blur-md flex items-center gap-2">
                                <RotateCw size={12} />
                                <span>Switch view to see selection</span>
                            </div>
                        )}
                    </div>
                )}
             </div>
         )}

         {/* 3D MODE */}
         {viewMode === '3d' && (
             <div className="relative w-full h-full animate-in fade-in zoom-in-95 cursor-move">
                 <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Preview3D 
                            color={activeHexColor} 
                            type={product} 
                            showFrontDesign={area.includes('front')}
                            showBackDesign={area.includes('back')}
                            activeView={currentView}
                        />
                        <OrbitControls 
                            enablePan={false} 
                            minPolarAngle={Math.PI / 4} 
                            maxPolarAngle={Math.PI / 1.5}
                            minDistance={5}
                            maxDistance={12}
                        />
                    </Suspense>
                 </Canvas>
                 
                 {/* 3D Note */}
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
                     <div className="inline-flex items-center gap-2 text-[10px] text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm shadow-sm">
                        <AlertCircle size={12} />
                        <span>3D preview is for visualization only. Final product may vary.</span>
                     </div>
                 </div>
             </div>
         )}

      </div>
      
      {/* 2D Disclaimer Note */}
      {viewMode === '2d' && (
          <div className="absolute bottom-6 flex items-center gap-2 text-[10px] text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50 backdrop-blur-sm">
             <AlertCircle size={12} />
             <span>Preview for reference only. Actual product may vary.</span>
          </div>
      )}
    </Card>
  )
}
