export const SERVER_URL = `${process.env.SERVER_URL}` as string;

export const API_URL = {
  root: (url = "") => `${url ? url : ""}`,
  auth: (url = "") => API_URL.root(`/auth${url}`),
  ticket: (url = "") => API_URL.root(`/ticket${url}`),
  user: (url = "") => API_URL.root(`/user${url}`),
};
