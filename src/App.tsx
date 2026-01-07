import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { ProductListingPage } from "./pages/ProductListingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CustomizerPage } from "./pages/CustomizerPage";
import { LoadingProvider } from "./hooks/useLoading";

export default function App() {
  return (
    <LoadingProvider>
      <Router>
        <Routes>
          {/* Main Site Routes (with Header/Footer) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductListingPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
          </Route>

          {/* Standalone Routes (No Header/Footer) */}
          <Route path="customize" element={<CustomizerPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}
