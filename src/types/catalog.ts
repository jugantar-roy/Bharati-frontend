export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryWithCount extends Category {
  productCount: number;
}

export interface ProductCard {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  discountedPrice: number;
  primaryImageUrl: string;
  badges: string[];
  inStock: boolean;
}

export interface ProductMedia {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta: number;
  stockQuantity: number;
  skuSuffix: string;
}

export interface ProductDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  basePrice: number;
  discountedPrice: number;
  sku: string;
  inStock: boolean;
  badges: string[];
  media: ProductMedia[];
  variants: ProductVariant[];
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
