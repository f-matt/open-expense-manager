import { goto } from "$app/navigation";
import { TOKEN_NAME } from "$lib/stores/auth";
import type { LayoutLoad } from "../$types";

export const load: LayoutLoad = async ({ fetch }) => {
  const token = localStorage.getItem(TOKEN_NAME);
  if (!token)
    goto("/login");
};
