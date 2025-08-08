"use client";

import { useState } from "react";
import { Catalog, Product } from "@/types/catalog";
import { Plus, X, Upload, Save, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { colorPalettes } from "@/utils/colorPalettes";
import ExcelImporter from "@/components/ExcelImporter";
import BulkImageUploader from "@/components/BulkImageUploader";
import FilePreparationHelper from "@/components/FilePreparationHelper";

interface CatalogFormProps {
  onSave: (catalog: Catalog) => void;
}

export default function CatalogForm({ onSave }: CatalogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    storeName: "",
    logo: "",
    backgroundImage: "",
    businessInfo: "",
  });

  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0].id);
  const [theme, setTheme] = useState(colorPalettes[0].theme);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "background" | "product"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (type === "logo") {
          setFormData((prev) => ({ ...prev, logo: result }));
        } else if (type === "background") {
          setFormData((prev) => ({ ...prev, backgroundImage: result }));
        } else {
          setCurrentProduct((prev) => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (
      currentProduct.name &&
      currentProduct.description &&
      currentProduct.price
    ) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: currentProduct.name,
        description: currentProduct.description,
        price: parseFloat(currentProduct.price),
        image: currentProduct.image || undefined,
      };
      setProducts([...products, newProduct]);
      setCurrentProduct({ name: "", description: "", price: "", image: "" });
    }
  };

  const handleExcelImport = (importedProducts: Product[]) => {
    setProducts([...products, ...importedProducts]);
  };

  const handleBulkImagesUpload = (images: {
    [productName: string]: string;
  }) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        image: images[product.name] || product.image,
      }))
    );
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.storeName &&
      formData.businessInfo &&
      products.length > 0
    ) {
      const catalog: Catalog = {
        id: Date.now().toString(),
        name: formData.name,
        storeName: formData.storeName,
        logo: formData.logo || undefined,
        backgroundImage: formData.backgroundImage || undefined,
        businessInfo: formData.businessInfo,
        products,
        theme,
        createdAt: new Date(),
      };
      onSave(catalog);
      router.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Crear Nuevo Catálogo
        </h1>
        <p className="text-purple-200">
          Completa la información para crear tu catálogo digital
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información básica */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Información Básica</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Catálogo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Catálogo Primavera 2024"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Tienda *
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storeName: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Boutique Elegancia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo del Negocio
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "logo")}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload size={16} />
                  Subir Logo
                </label>
                {formData.logo && (
                  <img
                    src={formData.logo}
                    alt="Logo"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen de Fondo
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "background")}
                  className="hidden"
                  id="background-upload"
                />
                <label
                  htmlFor="background-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload size={16} />
                  Subir Fondo
                </label>
                {formData.backgroundImage && (
                  <img
                    src={formData.backgroundImage}
                    alt="Fondo"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Información del Negocio *
            </label>
            <textarea
              value={formData.businessInfo}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  businessInfo: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Describe brevemente tu negocio..."
              required
            />
          </div>
        </div>

        {/* Selección de Paleta de Colores */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Paleta de Colores</h2>
          <p className="text-gray-600 mb-6">
            Elige una paleta profesional para el catálogo
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colorPalettes.map((palette) => (
              <motion.div
                key={palette.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedPalette(palette.id);
                  setTheme(palette.theme);
                }}
                className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${
                  selectedPalette === palette.id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Preview de colores */}
                <div className="h-20 flex">
                  <div
                    className="flex-1"
                    style={{ backgroundColor: palette.preview.background }}
                  />
                  <div
                    className="flex-1"
                    style={{ backgroundColor: palette.preview.primary }}
                  />
                  <div
                    className="flex-1"
                    style={{ backgroundColor: palette.preview.secondary }}
                  />
                </div>

                {/* Información */}
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {palette.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {palette.description}
                  </p>
                </div>

                {/* Check mark */}
                {selectedPalette === palette.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check size={12} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Vista previa del tema seleccionado */}
          <div className="mt-6 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Vista Previa
            </h3>
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                fontFamily: theme.fontFamily,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {formData.logo && (
                  <img
                    src={formData.logo}
                    alt="Logo"
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <h4
                  className="text-xl font-bold"
                  style={{ color: theme.textColor }}
                >
                  {formData.storeName || "Nombre de la Tienda"}
                </h4>
              </div>
              <div
                className="inline-block px-4 py-2 rounded-lg text-sm font-medium mb-3"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: theme.textColor,
                }}
              >
                Producto de Ejemplo - $25.99
              </div>
              <p className="text-sm opacity-80">
                {formData.businessInfo ||
                  "Información del negocio aparecerá aquí"}
              </p>
            </div>
          </div>
        </div>

        {/* Guía de preparación de archivos */}
        <FilePreparationHelper />

        {/* Importar desde Excel */}
        <ExcelImporter onImport={handleExcelImport} />

        {/* Subir imágenes en lote (solo si hay productos) */}
        {products.length > 0 && (
          <BulkImageUploader
            onImagesUploaded={handleBulkImagesUpload}
            productNames={products.map((p) => p.name)}
          />
        )}

        {/* Agregar productos manualmente */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Agregar Producto Manualmente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del producto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={currentProduct.description}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="Descripción del producto"
            />
          </div>

          <div className="flex items-center gap-4 mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "product")}
              className="hidden"
              id="product-image-upload"
            />
            <label
              htmlFor="product-image-upload"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload size={16} />
              Imagen del Producto
            </label>
            {currentProduct.image && (
              <img
                src={currentProduct.image}
                alt="Producto"
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
          </div>

          <motion.button
            type="button"
            onClick={addProduct}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            Agregar Producto
          </motion.button>
        </div>

        {/* Lista de productos */}
        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Productos Agregados ({products.length})
              </h2>
              <button
                type="button"
                onClick={() => setProducts([])}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Limpiar todos
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow"
                >
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm"
                  >
                    <X size={14} />
                  </button>

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        // Si la imagen falla al cargar, mostrar placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}

                  {/* Placeholder para cuando no hay imagen o falla */}
                  <div
                    className={`w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center ${
                      product.image ? "hidden" : ""
                    }`}
                  >
                    <span className="text-gray-400 text-2xl font-bold">
                      {product.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1 pr-6">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Estadísticas rápidas */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.length}
                  </p>
                  <p className="text-sm text-gray-600">Productos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter((p) => p.image).length}
                  </p>
                  <p className="text-sm text-gray-600">Con imagen</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${Math.min(...products.map((p) => p.price)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Precio mínimo</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${Math.max(...products.map((p) => p.price)).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Precio máximo</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 border border-purple-300 rounded-lg text-white hover:bg-purple-500 transition-colors"
          >
            Cancelar
          </button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors font-semibold"
            disabled={
              !formData.name ||
              !formData.storeName ||
              !formData.businessInfo ||
              products.length === 0
            }
          >
            <Save size={16} />
            Guardar Catálogo
          </motion.button>
        </div>
      </form>
    </div>
  );
}
