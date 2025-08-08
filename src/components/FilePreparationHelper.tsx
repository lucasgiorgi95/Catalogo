'use client';

import { FileText, Image, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FilePreparationHelper() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText size={20} />
        Preparación de Archivos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opción 1: Excel con URLs */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="border border-green-200 rounded-lg p-4 bg-green-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-green-600" size={20} />
            <h3 className="font-semibold text-green-900">Opción Ideal</h3>
          </div>
          
          <h4 className="font-medium text-green-800 mb-2">Excel/CSV con URLs</h4>
          <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
            <li>Sube imágenes a Google Drive, Dropbox, etc.</li>
            <li>Copia los links públicos</li>
            <li>Pégalos en la columna "imagen"</li>
            <li>¡Importación 100% automática!</li>
          </ul>
        </motion.div>

        {/* Opción 2: Archivos separados */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="border border-blue-200 rounded-lg p-4 bg-blue-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <Image className="text-blue-600" size={20} />
            <h3 className="font-semibold text-blue-900">Opción Común</h3>
          </div>
          
          <h4 className="font-medium text-blue-800 mb-2">Excel + Imágenes separadas</h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Excel solo con datos de texto</li>
            <li>Carpeta con imágenes bien nombradas</li>
            <li>Importación en 2 pasos</li>
            <li>Match automático por nombres</li>
          </ul>
        </motion.div>
      </div>

      {/* Proceso paso a paso */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">🔄 Proceso recomendado</h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-700 flex-wrap">
          <span className="bg-white px-2 py-1 rounded border">1. Preparar Excel</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="bg-white px-2 py-1 rounded border">2. Importar datos</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="bg-white px-2 py-1 rounded border">3. Subir imágenes</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="bg-green-100 px-2 py-1 rounded border border-green-300 text-green-800">✅ Listo</span>
        </div>
      </div>

      {/* Tips adicionales */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">💡 Tips para nombrar imágenes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
          <div>
            <p className="font-medium mb-1">✅ Buenos nombres:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>hamburguesa-clasica.jpg</li>
              <li>pizza-margherita.png</li>
              <li>ensalada-cesar.jpg</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1">❌ Evitar:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>IMG_001.jpg</li>
              <li>foto.png</li>
              <li>imagen1.jpg</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}