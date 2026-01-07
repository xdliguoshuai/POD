import { useState, useEffect } from "react";
import { CanvasController } from "../lib/CanvasController";
import * as fabric from "fabric";

export function useActiveObject() {
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  useEffect(() => {
    let controller: CanvasController;
    try {
      controller = CanvasController.getInstance();
    } catch (e) {
      return;
    }

    const updateActiveObject = () => {
      setActiveObject(controller.getActiveObject() || null);
    };

    // Initial load
    updateActiveObject();

    // Subscribe to changes
    const unsubscribe = controller.subscribe(updateActiveObject);

    return () => {
      unsubscribe();
    };
  }, []);

  return activeObject;
}
