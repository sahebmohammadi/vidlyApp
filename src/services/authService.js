import http from "./htttpServices";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";

export function login(email, password) {
  return http.post(apiEndPoint, { email, password });
}
