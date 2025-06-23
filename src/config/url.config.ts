export const APP_URL = process.env.APP_URL as string;

export const PUBLIC_URL = {
  root: (url = "") => `${url ? url : ""}`,

  home: () => PUBLIC_URL.root("/"),
  auth: () => PUBLIC_URL.root("/auth/login"),
};

export const DASHBOARD_URL = {
  root: (url = "") => `/tickets/dashboard${url ? "/" + url : ""}`,

  home: () => DASHBOARD_URL.root(),
};

export const ADMIN_URL = {
  root: (url = "") => `/tickets/dashboard${url ? "/" + url : ""}`,

  home: () => ADMIN_URL.root(),

  user: () => ADMIN_URL.root("user"),
  userEdit: (id = "") => ADMIN_URL.root(`user/${id}`),

  ticket: () => ADMIN_URL.root("ticket"),
  ticketEdit: (id = "") => ADMIN_URL.root(`ticket/${id}`),
};
