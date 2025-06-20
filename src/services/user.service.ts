import { axiosWithAuth } from "@/api/interceptors";
import { API_URL } from "@/config/api.config";
import { IUser, IUserEditInput } from "@/types/user.types";

class UserService {
  async getAll(searchTerm?: string) {
    const { data } = await axiosWithAuth.get<IUser[]>(API_URL.user(""), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });

    return data;
  }

  async getProfile() {
    const response = await axiosWithAuth.get<IUser>(API_URL.user("/profile"));
    return response;
  }

  async getProfileMiddleware(refreshToken: string) {
    const { data: profile } = await axiosWithAuth.get<IUser>(API_URL.user("/profile"), {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    return profile;
  }

  async toggleFavorite(movieId: string) {
    return axiosWithAuth.post(API_URL.user("/profile/favorites"), {
      movieId,
    });
  }

  async getById(id: string) {
    return axiosWithAuth.get<IUser>(API_URL.user(`/by-id/${id}`));
  }

  async update(id: string, data: IUserEditInput) {
    return axiosWithAuth.put<string>(API_URL.user(`/${id}`), data);
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.user(`/${id}`));
  }
}

export const userService = new UserService();
