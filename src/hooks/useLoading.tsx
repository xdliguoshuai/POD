import React, { createContext, useContext, useState, useCallback } from "react";
import { Spin, ConfigProvider } from "antd";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const THEME = {
  token: {
    colorPrimary: "#194236",
  },
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <ConfigProvider theme={THEME}>
        {children}
        {isLoading && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur-[2px] animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-xl shadow-2xl border flex flex-col items-center gap-4">
              <Spin size="large" />
              <span className="text-sm font-medium text-primary animate-pulse">
                Processing...
              </span>
            </div>
          </div>
        )}
      </ConfigProvider>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
