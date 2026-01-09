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
      ...options,
    });

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
        ...options,
      });

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
   * Add or update a dashed rectangle representing the print area
   */
  setPrintArea(options: {
    left: number;
    top: number;
    width: number;
    height: number;
  }) {
    this.printAreaCenter = { x: options.left, y: options.top };

    let printArea = this.canvas
      .getObjects()
      .find((obj: any) => obj.id === "print-area") as fabric.Rect;

    if (!printArea) {
      printArea = new fabric.Rect({
        ...options,
        id: "print-area",
        originX: "center",
        originY: "center",
        fill: "transparent",
        stroke: "#194236",
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
        opacity: 0.5,
      } as any);
      this.canvas.add(printArea);
    } else {
      printArea.set(options);
    }

    // Ensure it's always behind other objects but above background
    this.canvas.moveObjectTo(printArea, 1); // 0 is background image
    this.canvas.requestRenderAll();
  }

  /**
   * Force a render
   */
  render() {
    this.canvas.requestRenderAll();
  }
}
