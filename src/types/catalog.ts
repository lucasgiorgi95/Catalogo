export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface CatalogTheme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
}

export interface PremiumFeatures {
  whatsapp?: {
    enabled: boolean;
    number: string;
  };
  socialMedia?: {
    enabled: boolean;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  categories?: {
    enabled: boolean;
  };
  contactInfo?: {
    enabled: boolean;
    phone?: string;
    address?: string;
    hours?: string;
  };
}

export interface Catalog {
  id: string;
  name: string;
  storeName: string;
  logo?: string;
  backgroundImage?: string;
  businessInfo: string;
  products: Product[];
  theme: CatalogTheme;
  premiumFeatures?: PremiumFeatures;
  createdAt: Date;
}