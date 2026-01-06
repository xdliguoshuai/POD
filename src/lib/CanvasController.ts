import { CanvasManager } from "./CanvasManager";
import * as fabric from "fabric";

export class CanvasController {
  private static instance: CanvasController | null = null;
  private canvas: fabric.Canvas;
  private canvasManager: CanvasManager;

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

    // Keyboard Events
    window.addEventListener("keydown", this.onKeyDown);
  }

  private unbindEvents() {
    this.canvas.off("selection:created", this.onSelectionCreated);
    this.canvas.off("selection:cleared", this.onSelectionCleared);
    window.removeEventListener("keydown", this.onKeyDown);
  }

  private onSelectionCreated = (e: any) => {
    console.log("Selection created", e);
  };

  private onSelectionCleared = (e: any) => {
    console.log("Selection cleared", e);
  };

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

  /**
   * Business logic for adding text
   */
  public addText(
    text: string,
    options?: { fontFamily?: string; fill?: string }
  ) {
    this.canvasManager.addText(text, options);
  }

  /**
   * Business logic for adding image
   */
  public async addImage(url: string, options?: any) {
    await this.canvasManager.addImage(url, options);
  }
}
