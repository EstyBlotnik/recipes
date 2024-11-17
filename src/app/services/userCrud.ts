import axios from "axios";
import { apiUrl } from "@/app/services/recipeCrud";

export async function fetchProtectedData() {
  try {
    const response = await axios.get(`${apiUrl}login`, {
      withCredentials: true,
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("שגיאה:", error.response.data.message);
    } else {
      console.log("שגיאה כלשהי:", error);
    }
    return null;
  }
}

export async function loginForToken(email: string) {
  try {
    const response = await axios.post(`${apiUrl}login`, {
      email,
    });
    if (response.data.token) {
      return true;
    }
  } catch (error) {
    console.log(error);

    return false;
  }
}
