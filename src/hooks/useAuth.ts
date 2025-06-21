// import { api } from "@/redux/api";
// import { useEffect, useState } from "react";

// function getCookie(name: string): string | null {
//   if (typeof document === "undefined") return null;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
//   return null;
// }

// function setCookie(name: string, value: string, days: number = 7): void {
//   if (typeof document === "undefined") return;
//   const expires = new Date(Date.now() + days * 864e5).toUTCString();
//   document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict; Secure`;
// }

// function deleteCookie(name: string): void {
//   if (typeof document === "undefined") return;
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   // Используйте мутации из вашего API
//   const [login] = api.useLoginMutation();
//   const [logout] = api.useLogoutMutation();

//   // Проверяем наличие токена при загрузке
//   useEffect(() => {
//     const token = getCookie("accessToken");
//     setIsAuthenticated(!!token);
//     setIsLoading(false);
//   }, []);

//   const handleLogin = async (credentials: { email: string; password: string }) => {
//     try {
//       const result = await login(credentials).unwrap();
//       setIsAuthenticated(true);
//       return result;
//     } catch (error) {
//       console.error("Ошибка входа:", error);
//       throw error;
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//     } catch (error) {
//       console.error("Ошибка выхода:", error);
//     } finally {
//       setIsAuthenticated(false);
//     }
//   };

//   const setToken = (token: string, refreshToken?: string) => {
//     setCookie("accessToken", token);
//     if (refreshToken) {
//       setCookie("refreshToken", refreshToken);
//     }
//     setIsAuthenticated(true);
//   };

//   const clearTokens = () => {
//     deleteCookie("accessToken");
//     deleteCookie("refreshToken");
//     setIsAuthenticated(false);
//   };

//   return {
//     isAuthenticated,
//     isLoading,
//     login: handleLogin,
//     logout: handleLogout,
//     setToken,
//     clearTokens,
//   };
// };
