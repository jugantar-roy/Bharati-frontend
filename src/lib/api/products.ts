import { fetchApi } from './client';
import { ProductCard, ProductDetail, PagedResponse } from '@/types/catalog';

export async function getProducts(params?: {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  size?: number;
}): Promise<PagedResponse<ProductCard>> {
  const query = new URLSearchParams();
  if (params?.categorySlug) query.append('categorySlug', params.categorySlug);
  if (params?.minPrice) query.append('minPrice', params.minPrice.toString());
  if (params?.maxPrice) query.append('maxPrice', params.maxPrice.toString());
  if (params?.inStock) query.append('inStock', 'true');
  if (params?.page !== undefined) query.append('page', params.page.toString());
  if (params?.size !== undefined) query.append('size', params.size.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchApi<PagedResponse<ProductCard>>(`/products${queryString}`);
}

export async function getFeaturedProducts(): Promise<ProductCard[]> {
  return fetchApi<ProductCard[]>('/products/featured');
}

export async function getBestSellers(): Promise<ProductCard[]> {
  return fetchApi<ProductCard[]>('/products/best-sellers');
}

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  return fetchApi<ProductDetail>(`/products/${slug}`);
}
