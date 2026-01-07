import React, { useState, useCallback } from "react";
import { Upload, Button, Progress, Tooltip, message, ConfigProvider, Modal } from "antd";
import { 
  UploadCloud, 
  Trash2, 
  Plus, 
  FileImage,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { CanvasController } from "../../lib/CanvasController";

const { Dragger } = Upload;

// --- Types & Mock Data ---

interface Asset {
  id: string;
  url: string;
  name: string;
  type: "png" | "jpg" | "svg";
  size: string;
  dpi: number;
}

const MOCK_ASSETS: Asset[] = [
  { id: "1", url: "https://placehold.co/150x150/png", name: "Logo_Dark.png", type: "png", size: "1.2MB", dpi: 300 },
  { id: "2", url: "https://placehold.co/150x150/jpg", name: "Photo_Vintage.jpg", type: "jpg", size: "3.5MB", dpi: 72 },
  { id: "3", url: "https://placehold.co/150x150/svg", name: "Icon_Star.svg", type: "svg", size: "0.5MB", dpi: 300 },
];

const THEME = {
  token: {
    colorPrimary: "#194236",
    borderRadius: 6,
  },
};

export const UploadsPanel: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [uploadingFile, setUploadingFile] = useState<UploadFile | null>(null);
  const [validationStatus, setValidationStatus] = useState<"validating" | "success" | "error" | "warning" | null>(null);
  const [validationMsg, setValidationMsg] = useState<string>("");

  // --- Handlers ---

  const handleUploadChange: UploadProps["onChange"] = (info) => {
    const file = info.file;
    setUploadingFile(file);

    if (file.status === "uploading") {
      setValidationStatus("validating");
      return;
    }
    
    // Mock Validation Logic
    if (file.status === "done" || file.status === "error" || file.originFileObj) { // Antd Dragger sometimes treats local as done/error immediately
       validateFile(file);
    }
  };

  const validateFile = (file: UploadFile) => {
    setTimeout(() => {
        // Mock checks
        const size = file.size || 0;
        const isTooLarge = size > 20 * 1024 * 1024; // 20MB
        
        if (isTooLarge) {
            setValidationStatus("error");
            setValidationMsg("File too large (Max 20MB)");
            return;
        }

        // Mock DPI check (random for demo)
        const isLowDpi = Math.random() > 0.7;
        if (isLowDpi) {
            setValidationStatus("warning");
            setValidationMsg("Low resolution image (may print blurry)");
        } else {
            setValidationStatus("success");
            setValidationMsg("Ready to add");
        }
    }, 1500);
  };

  const addToAssets = () => {
    if (!uploadingFile) return;
    
    const newAsset: Asset = {
        id: Date.now().toString(),
        url: URL.createObjectURL(uploadingFile.originFileObj as Blob),
        name: uploadingFile.name,
        type: uploadingFile.type?.includes("svg") ? "svg" : uploadingFile.type?.includes("png") ? "png" : "jpg",
        size: `${((uploadingFile.size || 0) / 1024 / 1024).toFixed(1)}MB`,
        dpi: validationStatus === "warning" ? 72 : 300,
    };

    setAssets([newAsset, ...assets]);
    resetUpload();
    message.success("Asset added to library");
  };

  const addToCanvas = async (asset: Asset) => {
    try {
        const controller = CanvasController.getInstance();
        await controller.addImage(asset.url);
        message.success("Added to canvas");
    } catch (e) {
        console.error(e);
        message.error("Canvas not ready");
    }
  };

  const handleAddAndPlace = async () => {
     if(uploadingFile) {
         // Create asset first
         const newAsset: Asset = {
            id: Date.now().toString(),
            url: URL.createObjectURL(uploadingFile.originFileObj as Blob),
            name: uploadingFile.name,
            type: uploadingFile.type?.includes("svg") ? "svg" : uploadingFile.type?.includes("png") ? "png" : "jpg",
            size: `${((uploadingFile.size || 0) / 1024 / 1024).toFixed(1)}MB`,
            dpi: validationStatus === "warning" ? 72 : 300,
        };
        setAssets([newAsset, ...assets]);
        resetUpload();
        await addToCanvas(newAsset);
     }
  };

  const resetUpload = () => {
    setUploadingFile(null);
    setValidationStatus(null);
    setValidationMsg("");
  };

  const deleteAsset = (id: string) => {
    Modal.confirm({
        title: 'Delete Asset?',
        content: 'This will remove the image from your library. Layers using this image may be affected.',
        okText: 'Delete',
        okType: 'danger',
        onOk() {
            setAssets(assets.filter(a => a.id !== id));
            message.info("Asset deleted");
        }
    });
  };

  const customRequest = ({ file, onSuccess }: any) => {
      setTimeout(() => {
          onSuccess("ok");
      }, 1000);
  };

  return (
    <ConfigProvider theme={THEME}>
      <div className="flex flex-col h-full gap-6 p-1">
        
        {/* 1. Upload Entry Area */}
        {!uploadingFile ? (
            <div className="animate-fade-in">
                <Dragger 
                    accept=".png,.jpg,.jpeg,.svg"
                    showUploadList={false}
                    customRequest={customRequest}
                    onChange={handleUploadChange}
                    className="bg-gray-50 border-gray-200 hover:border-[#194236]"
                >
                    <p className="ant-upload-drag-icon text-[#194236] flex justify-center">
                        <UploadCloud size={48} />
                    </p>
                    <p className="ant-upload-text font-medium text-gray-700">Click or drag file to upload</p>
                    <p className="ant-upload-hint text-xs text-gray-400 mt-2">
                        PNG / JPG / SVG · Max 20MB · RGB
                    </p>
                </Dragger>
                <Button type="primary" block className="mt-4 h-10 bg-[#194236]" onClick={() => document.getElementById('hidden-upload')?.click()}>
                    Upload Image
                </Button>
            </div>
        ) : (
            /* 2. Upload Processing & Validation State */
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded border flex items-center justify-center text-[#194236]">
                        <FileImage size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-gray-800">{uploadingFile.name}</p>
                        <p className="text-xs text-gray-400">
                             {validationStatus === "validating" ? "Analyzing..." : validationMsg}
                        </p>
                    </div>
                </div>

                {validationStatus === "validating" && <Progress percent={60} status="active" showInfo={false} size="small" strokeColor="#194236" />}
                
                {validationStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-xs mt-2">
                        <AlertCircle size={14} /> <span>Validation Failed</span>
                    </div>
                )}
                 {validationStatus === "warning" && (
                    <div className="flex items-center gap-2 text-orange-500 text-xs mt-2">
                        <AlertCircle size={14} /> <span>Low Quality Warning</span>
                    </div>
                )}
                 {validationStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600 text-xs mt-2">
                        <CheckCircle size={14} /> <span>Verified</span>
                    </div>
                )}

                {/* 3. Validation Actions */}
                {validationStatus && validationStatus !== "validating" && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <Button onClick={addToAssets} disabled={validationStatus === "error"}>Add to Assets</Button>
                        <Button type="primary" onClick={handleAddAndPlace} disabled={validationStatus === "error"} className="bg-[#194236]">Add to Canvas</Button>
                        <Button type="text" danger className="col-span-2 text-xs" onClick={resetUpload}>Cancel</Button>
                    </div>
                )}
            </div>
        )}

        {/* 4. Uploaded Assets List */}
        <div className="flex-1 overflow-y-auto pr-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your Assets</h3>
            <div className="grid grid-cols-2 gap-3">
                {assets.map(asset => (
                    <div 
                        key={asset.id} 
                        className="group relative bg-gray-50 rounded-md border border-gray-200 hover:border-[#194236] transition-all overflow-hidden"
                        draggable
                        onDragEnd={() => addToCanvas(asset)} // Simple drag mock
                    >
                        <div className="aspect-square p-2 flex items-center justify-center">
                            <img src={asset.url} alt={asset.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-1 left-1 flex gap-1">
                            <span className="bg-black/60 text-white text-[9px] px-1 rounded backdrop-blur-sm uppercase">{asset.type}</span>
                            {asset.dpi < 150 && <span className="bg-orange-500/90 text-white text-[9px] px-1 rounded backdrop-blur-sm">Low DPI</span>}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#194236]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                             <Button 
                                type="primary" 
                                size="small" 
                                icon={<Plus size={14} />} 
                                className="w-full text-[10px] h-7 bg-white text-[#194236] hover:bg-gray-100 border-none"
                                onClick={() => addToCanvas(asset)}
                             >
                                Add
                             </Button>
                             <Button 
                                type="text" 
                                size="small" 
                                icon={<Trash2 size={14} />} 
                                className="text-white/80 hover:text-white hover:bg-white/10"
                                onClick={(e) => { e.stopPropagation(); deleteAsset(asset.id); }}
                             />
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </ConfigProvider>
  );
};

// Re-export as UploadsTab for backward compatibility if needed, 
// but we prefer using the new name in parent.
export { UploadsPanel as UploadsTab };
