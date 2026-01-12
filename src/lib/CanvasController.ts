import { CanvasManager } from "./CanvasManager";
import * as fabric from "fabric";

export class CanvasController {
  private static instance: CanvasController | null = null;
  private canvas: fabric.Canvas;
  private canvasManager: CanvasManager;

  private listeners: Set<() => void> = new Set();

  private isDragging = false;
  private lastPosX = 0;
  private lastPosY = 0;

  private constructor() {
    this.canvasManager = CanvasManager.getInstance();
    this.canvas = this.canvasManager.canvas;
    this.bindEvents();
  }

  public static init(): CanvasController {
    if (CanvasController.instance) {
      CanvasController.instance.dispose();
    }
    CanvasController.instance = new CanvasController();
    console.log("中心点：", CanvasController.instance.canvas.getCenterPoint());

    return CanvasController.instance;
  }

  public static getInstance(): CanvasController {
    if (!CanvasController.instance) {
      throw new Error("CanvasController not initialized");
    }
    return CanvasController.instance;
  }

  private bindEvents() {
    // Mouse Events
    this.canvas.on("selection:created", this.onSelectionCreated);
    this.canvas.on("selection:cleared", this.onSelectionCleared);
    this.canvas.on("selection:updated", this.onSelectionUpdated);
    this.canvas.on("mouse:wheel", this.onMouseWheel);
    this.canvas.on("mouse:down", this.onMouseDown);
    this.canvas.on("mouse:move", this.onMouseMove);
    this.canvas.on("mouse:up", this.onMouseUp);

    // Object Events
    this.canvas.on("object:added", this.notifyListeners);
    this.canvas.on("object:removed", this.notifyListeners);
    this.canvas.on("object:modified", this.notifyListeners);

    // Keyboard Events
    window.addEventListener("keydown", this.onKeyDown);
  }

  private unbindEvents() {
    this.canvas.off("selection:created", this.onSelectionCreated);
    this.canvas.off("selection:cleared", this.onSelectionCleared);
    this.canvas.off("selection:updated", this.onSelectionUpdated);
    this.canvas.off("mouse:wheel", this.onMouseWheel);
    this.canvas.off("mouse:down", this.onMouseDown);
    this.canvas.off("mouse:move", this.onMouseMove);
    this.canvas.off("mouse:up", this.onMouseUp);
    this.canvas.off("object:added", this.notifyListeners);
    this.canvas.off("object:removed", this.notifyListeners);
    this.canvas.off("object:modified", this.notifyListeners);
    window.removeEventListener("keydown", this.onKeyDown);
  }

  private onSelectionCreated = (e: any) => {
    console.log("Selection created", e);
    this.notifyListeners();
  };

  private onSelectionCleared = (e: any) => {
    console.log("Selection cleared", e);
    this.notifyListeners();
  };

  private onSelectionUpdated = (e: any) => {
    console.log("Selection updated", e);
    this.notifyListeners();
  };

  private onMouseWheel = (opt: any) => {
    const delta = opt.e.deltaY;
    let zoom = this.canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom < 1) zoom = 1;
    if (zoom > 3) zoom = 3;
    this.canvas.zoomToPoint(
      new fabric.Point(opt.e.offsetX, opt.e.offsetY),
      zoom
    );
    opt.e.preventDefault();
    opt.e.stopPropagation();
  };

  private onMouseDown = (opt: any) => {
    const evt = opt.e;
    // Pan with Right mouse button
    if (evt.button === 2) {
      this.isDragging = true;
      this.canvas.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;

      // Clear selection when starting to pan
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();

      // Change cursor to grabbing
      this.canvas.defaultCursor = "grabbing";
      this.canvas.hoverCursor = "grabbing";
    }
  };

  private onMouseMove = (opt: any) => {
    if (this.isDragging) {
      const e = opt.e;
      const vpt = this.canvas.viewportTransform;
      if (!vpt) return;

      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.canvas.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  };

  private onMouseUp = () => {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    if (this.isDragging) {
      this.canvas.setViewportTransform(this.canvas.viewportTransform!);
      this.isDragging = false;
      this.canvas.selection = true;

      // Reset cursor
      this.canvas.defaultCursor = "default";
      this.canvas.hoverCursor = "move";
    }
  };

  private notifyListeners = () => {
    this.listeners.forEach((listener) => listener());
  };

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    // Check if we should ignore the key event (e.g., typing in an input)
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
      return;
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      this.deleteActiveObject();
    }
  };

  private deleteActiveObject() {
    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length) {
      this.canvas.discardActiveObject();
      activeObjects.forEach((obj) => {
        this.canvas.remove(obj);
      });
      this.canvas.requestRenderAll();
    }
  }

  public dispose() {
    this.unbindEvents();
    CanvasController.instance = null;
  }

  public getActiveObject() {
    return this.canvas.getActiveObject();
  }

  public updateObjectProperty(obj: fabric.Object, key: string, value: any) {
    if (
      key === "shadow" &&
      value &&
      typeof value === "object" &&
      !(value instanceof fabric.Shadow)
    ) {
      obj.set("shadow", new fabric.Shadow(value));
    } else {
      obj.set(key as any, value);
    }

    // If it's a text object, we need to recalculate dimensions and coordinates
    // especially after font changes or text updates to ensure the bounding box is correct.
    if (
      obj.type === "i-text" ||
      obj.type === "text" ||
      obj.type === "textbox"
    ) {
      const textObj = obj as any;
      if (textObj.initDimensions) {
        textObj.initDimensions();
      }
      obj.setCoords();
    }

    this.canvas.requestRenderAll();
    this.notifyListeners();
  }
  /**
   * Reorder a layer (object) in the canvas stack
   * @param obj The object to move
   * @param newIndex The new index in the filtered design layers list (0 is top)
   */
  public reorderLayer(obj: fabric.Object, newIndex: number) {
    const objects = this.canvas.getObjects();
    const designLayers = this.getLayers();
    const totalDesignLayers = designLayers.length;

    // Find the base index (the lowest index among all design layers)
    // If no design layers exist, we don't need to do anything
    if (totalDesignLayers === 0) return;

    const designLayerRefs = designLayers.map((l) => l.ref);
    const baseIndex = Math.min(
      ...designLayerRefs.map((ref) => objects.indexOf(ref))
    );

    // Fabric.js stack is bottom-to-top.
    // Our list is top-to-bottom (0 is top).
    const canvasIndex = baseIndex + (totalDesignLayers - 1 - newIndex);

    this.canvas.moveObjectTo(obj, canvasIndex);
    this.canvas.requestRenderAll();
    this.notifyListeners();
  }

  /**
   * Business logic for adding text
   */
  public addText(
    text: string,
    options?: {
      fontFamily?: string;
      fill?: string;
      fontSize?: number;
      textAlign?:
        | "left"
        | "center"
        | "right"
        | "justify"
        | "justify-left"
        | "justify-center"
        | "justify-right";
    }
  ) {
    this.canvasManager.addText(text, options);
  }

  /**
   * Business logic for adding image
   */
  public async addImage(url: string, options?: any) {
    await this.canvasManager.addImage(url, options);
  }

  /**
   * Layer Management
   */
  public getLayers() {
    const objects = this.canvas.getObjects();
    const activeObjects = this.canvas.getActiveObjects();

    return objects
      .filter(
        (obj: any) => obj.id !== "print-area-bg" && obj.id !== "print-area-fg"
      )
      .map((obj: any) => ({
        id: obj.id || Math.random().toString(36).substring(2, 9),
        type: obj.type,
        name: obj.name || (obj.type === "i-text" ? obj.text : "Image"),
        visible: obj.visible,
        locked: obj.lockMovementX || false,
        active: activeObjects.includes(obj),
        ref: obj,
      }))
      .reverse(); // Top layers first
  }

  public toggleVisibility(obj: fabric.Object) {
    obj.set("visible", !obj.visible);
    this.canvas.requestRenderAll();
    this.notifyListeners();
  }

  public toggleLock(obj: fabric.Object) {
    const isLocked = !obj.lockMovementX;
    obj.set({
      lockMovementX: isLocked,
      lockMovementY: isLocked,
      lockRotation: isLocked,
      lockScalingX: isLocked,
      lockScalingY: isLocked,
      hasControls: !isLocked,
    });
    this.canvas.requestRenderAll();
    this.notifyListeners();
  }

  public deleteObject(obj: fabric.Object) {
    this.canvas.remove(obj);
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
    this.notifyListeners();
  }

  public selectObject(obj: fabric.Object) {
    this.canvas.setActiveObject(obj);
    this.canvas.requestRenderAll();
    this.notifyListeners();
  }

  public reorderObject(obj: fabric.Object, direction: "up" | "down") {
    if (direction === "up") {
      this.canvas.bringObjectForward(obj);
    } else {
      this.canvas.sendObjectBackwards(obj);
    }
    this.canvas.requestRenderAll();
    this.notifyListeners();
  }

  public clearAll() {
    this.canvas.getObjects().forEach((obj) => {
      this.canvas.remove(obj);
    });
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
    this.notifyListeners();
  }

  public setPrintArea(options: {
    left: number;
    top: number;
    width: number;
    height: number;
  }) {
    this.canvasManager.setPrintArea(options);
  }

  public alignObject(
    obj: fabric.Object,
    horizontal?: "left" | "center" | "right",
    vertical?: "top" | "middle" | "bottom"
  ) {
    this.canvasManager.alignObject(obj, horizontal, vertical);
  }
}
