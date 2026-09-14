import { fetchApi } from './client';
import { CategoryWithCount, Category } from '@/types/catalog';

export async function getCategories(): Promise<CategoryWithCount[]> {
  return fetchApi<CategoryWithCount[]>('/categories');
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return fetchApi<Category>(`/categories/${slug}`);
}
