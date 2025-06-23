// import Cookies from "js-cookie";
// export const tokenUtils = {
//   // Получить роль из токена
//   getUserRole: (): string | null => {
//     const token = Cookies.get("accessToken");
//     if (!token) return null;

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.role || null;
//     } catch (e) {
//       console.error("Error parsing token for role:", e);
//       return null;
//     }
//   },

//   // Получить ID пользователя из токена
//   getUserId: (): string | null => {
//     const token = Cookies.get("accessToken");
//     if (!token) return null;

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.userId || payload.sub || null;
//     } catch (e) {
//       console.error("Error parsing token for userId:", e);
//       return null;
//     }
//   },

//   // Проверить валидность токена
//   isTokenValid: (): boolean => {
//     const token = Cookies.get("accessToken");
//     if (!token) return false;

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const now = Math.floor(Date.now() / 1000);
//       return payload.exp > now;
//     } catch (e) {
//       return false;
//     }
//   },

//   // Очистить все токены
//   clearTokens: () => {
//     Cookies.remove("accessToken");
//     Cookies.remove("refreshToken");
//   },
// };

import Cookies from "js-cookie";

export const tokenUtils = {
  // Получить роль из токена
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
  // Получить ID пользователя из токена
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

  // Проверить валидность токена
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

  // Очистить все токены
  clearTokens: () => {
    console.log("Clearing all tokens");
    Cookies.remove("acce    ssToken");
    Cookies.remove("refreshToken");
    console.log("✅ Full token payload:");
  },

  // Получить весь payload токена для отладки
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
