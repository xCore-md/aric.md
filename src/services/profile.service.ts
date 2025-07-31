import { apiInstance } from "@/utils/api";
import type { ApiResponse, User } from "@/types";

class ProfileService {
  private clientApi = apiInstance;

  get() {
    console.log("Fetching profile data");

    return this.clientApi.get("customer/profile").json<ApiResponse<User>>();
  }

  update(data: Partial<User>) {
    return this.clientApi
      .patch("customer/profile", { json: data })
      .json<ApiResponse<User>>();
  }

  updateEmail(email: string) {
    return this.clientApi
      .patch("customer/profile/email", { json: { email } })
      .json<ApiResponse<User>>();
  }
}

export const profileService = new ProfileService();
