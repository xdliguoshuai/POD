import React from "react";
import { Decal } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  color: string;
  showFrontDesign: boolean;
  showBackDesign: boolean;
  activeView: "front" | "back";
}

const FabricMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial
    color={color}
    roughness={0.8}
    metalness={0.05}
    side={THREE.DoubleSide}
  />
);

const PrintArea = ({
  position,
  rotation,
  hasDesign,
  isActive,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  hasDesign: boolean;
  isActive: boolean;
}) => {
  // Deep Forest Green: #1b4d3e (approximate for "Deep Forest Green" or generic green)
  // Actually standard forest green is #228B22, but let's use a nice dark green #1a472a
  const activeColor = "#1a472a";

  if (!hasDesign && !isActive) return null;

  return (
    <Decal position={position} rotation={rotation} scale={[1.2, 1.6, 1]}>
      <meshBasicMaterial
        color={hasDesign ? "#ffffff" : activeColor}
        transparent
        opacity={hasDesign ? 0.8 : 0.2}
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </Decal>
  );
};

export function TShirtModel({
  color,
  showFrontDesign,
  showBackDesign,
  activeView,
}: ModelProps) {
  return (
    <group dispose={null}>
      {/* Torso */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 4.5, 32]} />
        <FabricMaterial color={color} />

        {/* Front Print Area */}
        <PrintArea
          position={[0, 0.5, 1.6]}
          rotation={[0, 0, 0]}
          hasDesign={showFrontDesign}
          isActive={activeView === "front"}
        />

        {/* Back Print Area */}
        <PrintArea
          position={[0, 0.5, -1.6]}
          rotation={[0, Math.PI, 0]}
          hasDesign={showBackDesign}
          isActive={activeView === "back"}
        />
      </mesh>

      {/* Shoulders/Sleeves */}
      <group position={[0, 1.8, 0]}>
        <mesh position={[-1.8, -0.5, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.6, 0.5, 1.8, 24]} />
          <FabricMaterial color={color} />
        </mesh>
        <mesh position={[1.8, -0.5, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.6, 0.5, 1.8, 24]} />
          <FabricMaterial color={color} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 2.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <FabricMaterial color={color} />
      </mesh>
    </group>
  );
}

export function CrewneckModel({
  color,
  showFrontDesign,
  showBackDesign,
  activeView,
}: ModelProps) {
  return (
    <group dispose={null}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.7, 1.7, 4.5, 32]} />
        <FabricMaterial color={color} />

        {/* Front Print Area */}
        <PrintArea
          position={[0, 0.5, 1.7]}
          rotation={[0, 0, 0]}
          hasDesign={showFrontDesign}
          isActive={activeView === "front"}
        />

        {/* Back Print Area */}
        <PrintArea
          position={[0, 0.5, -1.7]}
          rotation={[0, Math.PI, 0]}
          hasDesign={showBackDesign}
          isActive={activeView === "back"}
        />

        {/* Hem */}
        <mesh position={[0, -2.1, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.3, 32]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      </mesh>

      {/* Long Sleeves */}
      <group position={[0, 1.8, 0]}>
        <mesh position={[-2.2, -1.5, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.6, 0.4, 4, 24]} />
          <FabricMaterial color={color} />
          <mesh position={[0, -2.1, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
        </mesh>
        <mesh position={[2.2, -1.5, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.6, 0.4, 4, 24]} />
          <FabricMaterial color={color} />
          <mesh position={[0, -2.1, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
            <meshStandardMaterial color={color} roughness={0.9} />
          </mesh>
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 2.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.15, 16, 32]} />
        <FabricMaterial color={color} />
      </mesh>
    </group>
  );
}

export function HoodieModel({
  color,
  showFrontDesign,
  showBackDesign,
  activeView,
}: ModelProps) {
  return (
    <group dispose={null}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 4.5, 32]} />
        <FabricMaterial color={color} />

        {/* Front Print Area (Adjusted for pocket) */}
        <PrintArea
          position={[0, 0.8, 1.8]}
          rotation={[0, 0, 0]}
          hasDesign={showFrontDesign}
          isActive={activeView === "front"}
        />

        {/* Back Print Area */}
        <PrintArea
          position={[0, 0.5, -1.8]}
          rotation={[0, Math.PI, 0]}
          hasDesign={showBackDesign}
          isActive={activeView === "back"}
        />

        {/* Kangaroo Pocket */}
        <mesh position={[0, -1, 1.7]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[2, 1.5, 0.3]} />
          <FabricMaterial color={color} />
        </mesh>
      </mesh>

      {/* Long Sleeves */}
      <group position={[0, 1.8, 0]}>
        <mesh position={[-2.3, -1.5, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.7, 0.5, 4.2, 24]} />
          <FabricMaterial color={color} />
        </mesh>
        <mesh position={[2.3, -1.5, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.7, 0.5, 4.2, 24]} />
          <FabricMaterial color={color} />
        </mesh>
      </group>

      {/* Hood */}
      <group position={[0, 2.5, -0.5]}>
        <mesh>
          <sphereGeometry
            args={[1.2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.5]}
          />
          <meshStandardMaterial
            color={color}
            side={THREE.DoubleSide}
            roughness={0.9}
          />
        </mesh>
      </group>
    </group>
  );
}
