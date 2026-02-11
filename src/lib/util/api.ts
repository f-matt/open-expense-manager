import { goto } from "$app/navigation";
import { TOKEN_NAME } from "$lib/stores/auth";
import { CustomRuntimeError } from "./CustomRuntimeError";
import { TokenExpiredError } from "./TokenExpiredError";

async function apiRequest(url: string, options: {} | null, firstTry: boolean) {
  try {
    const tokenStr = localStorage.getItem(TOKEN_NAME);
    if (!tokenStr) {
      goto("/login");
      throw new CustomRuntimeError("Access denied.");
    }

    let token = JSON.parse(tokenStr);
    let accessToken = token.access;

    if (!accessToken) {
      goto("/login");
      throw new CustomRuntimeError("Access denied.");
    }

    if (!options) {
      options = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      };
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status == 401)  
        throw new TokenExpiredError("Your token has expired.");
      
      const error = await response.json();
      throw new CustomRuntimeError(error.detail);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      if (firstTry) {
        throw error;
      } else {
        localStorage.removeItem(TOKEN_NAME);
        goto("/login");
      }
    }

    throw new CustomRuntimeError("Error performing API request.");
  }
}

export async function api(url: string, options: {} | null = null) {
  try {
    return await apiRequest(url, options, true);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // TODO: token refresh
      return await apiRequest(url, options, false);
    }

    throw error;
  }
}

