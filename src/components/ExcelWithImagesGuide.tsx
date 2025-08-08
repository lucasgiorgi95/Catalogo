'use client';

import { AlertTriangle, Download, Upload, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExcelWithImagesGuide() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <h3 className="font-semibold text-amber-900 mb-3">
            ¿Tu Excel tiene imágenes incrustadas? 📊🖼️
          </h3>
          
          <p className="text-amber-800 mb-4">
            Si tu Excel/CSV tiene imágenes directamente en las celdas (no URLs), sigue estos pasos:
          </p>

          <div className="space-y-4">
            {/* Paso 1 */}
            <div className="flex items-start gap-3">
              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-amber-900">Sube tu Excel normalmente</h4>
                <p className="text-sm text-amber-800">
                  Importaremos los datos de texto (nombres, descripciones, precios). 
                  Las imágenes incrustadas no se pueden extraer automáticamente.
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="flex items-start gap-3">
              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-amber-900">Guarda las imágenes por separado</h4>
                <p className="text-sm text-amber-800 mb-2">
                  En Excel, haz clic derecho en cada imagen → "Guardar como imagen"
                </p>
                <div className="bg-white border border-amber-300 rounded p-2 text-xs text-amber-700">
                  💡 <strong>Tip:</strong> Nombra las imágenes igual que los productos para match automático
                  <br />
                  Ejemplo: "hamburguesa-clasica.jpg" para "Hamburguesa Clásica"
                </div>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="flex items-start gap-3">
              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-amber-900">Usa el cargador de imágenes</h4>
                <p className="text-sm text-amber-800">
                  Después de importar el Excel, aparecerá "Subir Imágenes en Lote" 
                  donde podrás subir todas las imágenes de una vez.
                </p>
              </div>
            </div>
          </div>

          {/* Alternativa */}
          <div className="mt-6 p-4 bg-white border border-amber-300 rounded-lg">
            <h4 className="font-semibold text-amber-900 mb-2">
              🚀 Alternativa más rápida
            </h4>
            <p className="text-sm text-amber-800 mb-3">
              Si tienes muchos productos, es más eficiente:
            </p>
            <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
              <li>Crear un Excel/CSV solo con datos de texto</li>
              <li>Poner las imágenes en una carpeta con nombres descriptivos</li>
              <li>Usar nuestro sistema de importación + carga masiva de imágenes</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}