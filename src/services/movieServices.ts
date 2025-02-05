const BASE_URL = "http://localhost:8080/api/v1/movies";

const apiClient = async (url: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  if (!response.ok) {
    const errorResponse = await response.json().catch(() => null);
    throw new Error(errorResponse?.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const fetchAllMovies = async () => {
  return await apiClient(BASE_URL);
};

export const fetchMoviesByGenre = async (genre: string) => {
  return apiClient(`${BASE_URL}/?genre=${encodeURIComponent(genre)}`);
};

export const fetchMovieByTitle = async (id: number, title: string) => {
  return apiClient(
    `http://localhost:8080/api/v1/${id}?title=${encodeURIComponent(title)}`
  );
};

export const deleteMovieById = async (id: number) => {
  return apiClient(`http://localhost:8080/api/v1/deleteMovie/${id}`, {
    method: "DELETE",
  });
};

export const insertMovie = async (movieData: Record<string, any>) => {
  return apiClient(`http://localhost:8080/api/v1/addMovie`, {
    method: "POST",
    body: JSON.stringify(movieData),
  });
};

export const updateMovieById = async (movieData: Record<string, any>) => {
  return await apiClient(
    `http://localhost:8080/api/v1/updateMovie/${movieData.id}`,
    {
      method: "PUT",
      body: JSON.stringify(movieData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
