import axios from "axios";

const STRAPI_BASE_URL = "https://backend.vsourceoverseas.com/api";

export const strapiClient = axios.create({
  baseURL: STRAPI_BASE_URL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
  },
});

export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchStrapiCollection<T>(
  endpoint: string,
  params: Record<string, string>,
): Promise<T> {
  try {
    const response = await strapiClient.get<StrapiResponse<T>>(endpoint, {
      params,
    });

    const result = response.data?.data?.[0];

    if (!result) {
      throw new Error(`No data returned from Strapi: ${endpoint}`);
    }

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Strapi API Error:", {
        endpoint,
        message: error.message,
        code: error.code,
        status: error.response?.status,
        response: error.response?.data,
      });
    }

    throw error;
  }
}
