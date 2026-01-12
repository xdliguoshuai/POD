import * as fabric from "fabric";

export class CanvasManager {
  private static instance: CanvasManager | null = null;
  public canvas: fabric.Canvas;
  private printAreaCenter: { x: number; y: number } = { x: 250, y: 333 };

  private constructor(
    canvasElement: HTMLCanvasElement,
    options?: Partial<fabric.CanvasOptions>
  ) {
    this.canvas = new fabric.Canvas(canvasElement, {
      fireRightClick: true,
      stopContextMenu: true,
      ...options,
    });
  }

  public static init(
    canvasElement: HTMLCanvasElement,
    options?: Partial<fabric.CanvasOptions>
  ): CanvasManager {
    if (CanvasManager.instance) {
      CanvasManager.instance.dispose();
    }
    CanvasManager.instance = new CanvasManager(canvasElement, options);
    return CanvasManager.instance;
  }

  public static getInstance(): CanvasManager {
    if (!CanvasManager.instance) {
      throw new Error("CanvasManager not initialized");
    }
    return CanvasManager.instance;
  }

  /**
   * Dispose the canvas instance
   */
  dispose() {
    this.canvas.dispose();
  }

  /**
   * Resize the canvas
   */
  resize(width: number, height: number) {
    this.canvas.setDimensions({ width, height });
    this.scaleBackgroundImage(width, height);
  }

  /**
   * Set the background image of the canvas
   */
  async setBackgroundImage(url: string) {
    try {
      const img = await fabric.FabricImage.fromURL(url);

      img.set({
        originX: "left",
        originY: "top",
        selectable: false,
        evented: false,
      });

      this.canvas.backgroundImage = img;

      const width = this.canvas.getWidth();
      const height = this.canvas.getHeight();

      if (width && height) {
        this.scaleBackgroundImage(width, height);
      }

      this.canvas.requestRenderAll();
    } catch (error) {
      console.error("Failed to load background image:", error);
    }
  }

  /**
   * Scale the background image to cover or fit the canvas
   * Currently implements a "fit width" strategy as per original code
   */
  private scaleBackgroundImage(canvasWidth: number, canvasHeight: number) {
    if (!this.canvas.backgroundImage) return;

    const img = this.canvas.backgroundImage as fabric.FabricImage;

    // Original logic: scale to width
    img.scaleToWidth(canvasWidth);

    this.canvas.requestRenderAll();
  }

  /**
   * Add text to the canvas
   */
  addText(text: string, options?: Partial<fabric.ITextProps>) {
    const textObj = new fabric.IText(text, {
      left: this.printAreaCenter.x,
      top: this.printAreaCenter.y,
      originX: "center",
      originY: "center",
      fontSize: 20,
      fill: "#000000",
      padding: 0,
      lineHeight: 1,
      stroke: undefined,
      strokeWidth: 0,
      ...options,
    });

    this.applyClipPath(textObj);
    this.canvas.add(textObj);
    this.canvas.setActiveObject(textObj);
    this.canvas.requestRenderAll();
    return textObj;
  }

  /**
   * Add an image to the canvas
   */
  async addImage(url: string, options?: Partial<fabric.ImageProps>) {
    try {
      const img = await fabric.FabricImage.fromURL(url);

      img.set({
        left: this.printAreaCenter.x,
        top: this.printAreaCenter.y,
        originX: "center",
        originY: "center",
        padding: 0,
        ...options,
      });

      this.applyClipPath(img);

      // Scale down if too big
      if (img.width && img.width > 200) {
        img.scaleToWidth(200);
      }

      this.canvas.add(img);
      this.canvas.setActiveObject(img);
      this.canvas.requestRenderAll();
      return img;
    } catch (error) {
      console.error("Failed to add image:", error);
    }
  }

  /**
   * Add or update a dual-layered rectangle representing the print area
   */
  setPrintArea(options: {
    left: number;
    top: number;
    width: number;
    height: number;
  }) {
    this.printAreaCenter = { x: options.left, y: options.top };

    const objects = this.canvas.getObjects();
    let printAreaBg = objects.find(
      (obj: any) => obj.id === "print-area-bg"
    ) as fabric.Rect;
    let printAreaFg = objects.find(
      (obj: any) => obj.id === "print-area-fg"
    ) as fabric.Rect;

    const commonOptions = {
      ...options,
      originX: "center",
      originY: "center",
      fill: "transparent",
      selectable: false,
      evented: false,
      opacity: 0.8,
    };

    // 1. Background Layer (White Solid)
    if (!printAreaBg) {
      printAreaBg = new fabric.Rect({
        ...commonOptions,
        id: "print-area-bg",
        stroke: "#ffffff",
        strokeWidth: 2,
      } as any);
      this.canvas.add(printAreaBg);
    } else {
      printAreaBg.set(commonOptions);
    }

    // 2. Foreground Layer (Black Dashed)
    if (!printAreaFg) {
      printAreaFg = new fabric.Rect({
        ...commonOptions,
        id: "print-area-fg",
        stroke: "#000000",
        strokeWidth: 2,
        strokeDashArray: [5, 5],
      } as any);
      this.canvas.add(printAreaFg);
    } else {
      printAreaFg.set(commonOptions);
    }

    // Ensure they are at the bottom but above background image
    // bg at index 1, fg at index 2
    this.canvas.moveObjectTo(printAreaBg, 1);
    this.canvas.moveObjectTo(printAreaFg, 2);

    this.updateObjectsClipPath();
    this.canvas.requestRenderAll();
  }

  /**
   * Apply clip path to a single object
   */
  private applyClipPath(obj: fabric.Object) {
    const printArea = this.canvas
      .getObjects()
      .find((o: any) => o.id === "print-area-fg") as fabric.Rect;
    if (!printArea) return;

    const clipPath = new fabric.Rect({
      left: printArea.left,
      top: printArea.top,
      width: printArea.width,
      height: printArea.height,
      originX: "center",
      originY: "center",
      absolutePositioned: true,
    });

    obj.set({ clipPath });
  }

  /**
   * Update clip path for all design objects
   */
  private updateObjectsClipPath() {
    const printArea = this.canvas
      .getObjects()
      .find((o: any) => o.id === "print-area-fg") as fabric.Rect;
    if (!printArea) return;

    const clipPath = new fabric.Rect({
      left: printArea.left,
      top: printArea.top,
      width: printArea.width,
      height: printArea.height,
      originX: "center",
      originY: "center",
      absolutePositioned: true,
    });

    this.canvas.getObjects().forEach((obj: any) => {
      if (
        obj.id !== "print-area-bg" &&
        obj.id !== "print-area-fg" &&
        obj !== this.canvas.backgroundImage
      ) {
        obj.set({ clipPath });
      }
    });
  }

  /**
   * Align an object relative to the print area
   */
  alignObject(
    obj: fabric.Object,
    horizontal?: "left" | "center" | "right",
    vertical?: "top" | "middle" | "bottom"
  ) {
    const printArea = this.canvas
      .getObjects()
      .find((o: any) => o.id === "print-area-fg") as fabric.Rect;
    if (!printArea) return;

    const bounds = printArea.getBoundingRect();
    const itemBounds = obj.getBoundingRect();

    const zoom = this.canvas.getZoom();
    const areaWidth = bounds.width / zoom;
    const areaHeight = bounds.height / zoom;
    const itemWidth = itemBounds.width / zoom;
    const itemHeight = itemBounds.height / zoom;

    if (horizontal) {
      if (horizontal === "left") {
        obj.set("left", printArea.left - areaWidth / 2 + itemWidth / 2);
      } else if (horizontal === "center") {
        obj.set("left", printArea.left);
      } else if (horizontal === "right") {
        obj.set("left", printArea.left + areaWidth / 2 - itemWidth / 2);
      }
    }

    if (vertical) {
      if (vertical === "top") {
        obj.set("top", printArea.top - areaHeight / 2 + itemHeight / 2);
      } else if (vertical === "middle") {
        obj.set("top", printArea.top);
      } else if (vertical === "bottom") {
        obj.set("top", printArea.top + areaHeight / 2 - itemHeight / 2);
      }
    }

    obj.setCoords();
    this.canvas.requestRenderAll();
  }

  /**
   * Force a render
   */
  render() {
    this.canvas.requestRenderAll();
  }
}
