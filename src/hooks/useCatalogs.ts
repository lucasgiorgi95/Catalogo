'use client';

import { useState, useEffect } from 'react';
import { Catalog } from '@/types/catalog';

export const useCatalogs = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  useEffect(() => {
    const savedCatalogs = localStorage.getItem('catalogs');
    if (savedCatalogs) {
      setCatalogs(JSON.parse(savedCatalogs));
    }
  }, []);

  const saveCatalog = (catalog: Catalog) => {
    const updatedCatalogs = [...catalogs, catalog];
    setCatalogs(updatedCatalogs);
    localStorage.setItem('catalogs', JSON.stringify(updatedCatalogs));
  };

  const deleteCatalog = (id: string) => {
    const updatedCatalogs = catalogs.filter(catalog => catalog.id !== id);
    setCatalogs(updatedCatalogs);
    localStorage.setItem('catalogs', JSON.stringify(updatedCatalogs));
  };

  return {
    catalogs,
    saveCatalog,
    deleteCatalog
  };
};