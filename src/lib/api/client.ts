export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, data: any, message: string) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject Authorization header if token exists
  if (typeof window !== 'undefined') {
    const authStore = window.localStorage.getItem('bharati-auth');
    if (authStore) {
      try {
        const { state } = JSON.parse(authStore);
        if (state.token) {
          headers.set('Authorization', `Bearer ${state.token}`);
        }
      } catch (e) {}
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data,
      data?.message || response.statusText || 'An unexpected error occurred'
    );
  }

  // Our backend wraps success responses in ApiResponse object: { success: true, message: "...", data: T }
  return data.data as T;
}
