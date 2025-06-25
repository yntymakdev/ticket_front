import Cookies from "js-cookie";

export const tokenUtils = {
  getUserRole: (): string | null => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.log("❌ No token found for role extraction");
      return null;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.error("❌ Invalid token format");
        return null;
      }

      const payload = JSON.parse(atob(parts[1]));
      console.log("✅ Full token payload:", payload);

      // Список возможных полей с ролью
      const possibleRoles = [
        payload.role,
        payload.userRole,
        payload.authority,
        Array.isArray(payload.authorities) ? payload.authorities[0] : undefined,
      ];

      const role = possibleRoles.find((r) => typeof r === "string");

      if (!role) {
        console.warn("⚠️ Роль не найдена в токене");
      } else {
        console.log("✅ Extracted role:", role);
      }

      return role || null;
    } catch (e) {
      console.error("❌ Error parsing token for role:", e);
      return null;
    }
  },
  getUserId: (): string | null => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.log("No token found for userId extraction");
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId || payload.sub || payload.id || payload.user_id;
      console.log("Extracted userId:", userId);
      return userId || null;
    } catch (e) {
      console.error("Error parsing token for userId:", e);
      return null;
    }
  },

  isTokenValid: (): boolean => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.log("No token to validate");
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      const isValid = payload.exp > now;

      console.log("Token validation:", {
        exp: payload.exp,
        now: now,
        expiresAt: new Date(payload.exp * 1000),
        isValid: isValid,
      });

      return isValid;
    } catch (e) {
      console.error("Error validating token:", e);
      return false;
    }
  },

  clearTokens: () => {
    console.log("Clearing all tokens");
    Cookies.remove("acce    ssToken");
    Cookies.remove("refreshToken");
    console.log("✅ Full token payload:");
  },

  getTokenPayload: () => {
    const token = Cookies.get("accessToken");
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Error parsing token payload:", e);
      return null;
    }
  },
};
