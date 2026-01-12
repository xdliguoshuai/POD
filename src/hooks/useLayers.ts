import { useState, useEffect } from "react";
import { CanvasController } from "../lib/CanvasController";

export function useLayers() {
  const [layers, setLayers] = useState<any[]>([]);

  useEffect(() => {
    let controller: CanvasController;
    try {
      controller = CanvasController.getInstance();
    } catch (e) {
      // Controller might not be initialized yet
      return;
    }

    const updateLayers = () => {
      setLayers(controller.getLayers());
    };

    // Initial load
    updateLayers();

    // Subscribe to changes
    const unsubscribe = controller.subscribe(updateLayers);
    window.unsubscribe = controller.getLayers();
    return () => {
      unsubscribe();
    };
  }, []);

  return layers;
}
