import axios from "axios";
import { apiBaseURL } from "@/config/config";

export async function invokeApi({
  baseURL = apiBaseURL,
  path = "",
  method = "GET",
  headers = {},
  postData = {},
}) {
  const base = baseURL || "";
  const url = base.endsWith("/") || path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;

  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (["POST", "PUT", "DELETE"].includes(method.toUpperCase())) {
    config.data = postData;
  }

  console.log("<===REQUEST-OBJECT===>", config);

  try {
    const response = await axios(config);

    console.log("<===Api-Success-Result===>", response.data);
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    const data = error?.response?.data;

    console.log("<===Api-Error===>", { path, status, message: data });

    if (status === 401) {
      console.warn("Unauthorized request:", path);
    }

    return {
      code: status || 500,
      message: data?.message || "Network error",
    };
  }
}
