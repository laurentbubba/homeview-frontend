const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const config: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // GLOBAL ERROR HANDLING: 
    // If the backend says 401 (Unauthorized), you could redirect to /login here
    // if (response.status === 401) {
    //    window.location.href = '/login';
    // }

    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return response.json();
}