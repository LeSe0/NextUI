import axios, { AxiosResponse, Method } from "axios";

const HOST = process.env.HOST;

export type CustomStructureForRequest<T> = {
  data: T;
  meta: {
    error: number | null;
    status: number;
  };
};

export default class ApiSlice {
  static baseURL = `${HOST}`;
  static defaultAuth = false;

  static async request<DataTypes>(
    url: string,
    method: Method = "GET",
    payload: unknown = null,
    options: { headers?: object; auth?: boolean } | null = null
  ) {
    let headers: HeadersInit = {
      language: localStorage.getItem("lang") == "en" ? "eng" : "arm",
    };

    if (this.defaultAuth || options?.auth) {
      headers.Authorization = `Bearer ${localStorage.getItem("admin-token")}`;
    }

    if (options) {
      if (options.headers) {
        headers = { ...headers, ...options.headers };
      }
    }

    try {
      const response: AxiosResponse<CustomStructureForRequest<DataTypes>> =
        await axios({
          method,
          url: `${this.baseURL}${url}`,
          data: payload ?? {},
          headers,
        });
      if ("data" in response) return response.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
