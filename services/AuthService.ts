// services/AuthService.ts
import { apiClient } from "@/lib/api";
import { LoginInput, User } from "@/types/Types";

export const AuthService = {
  login: (credentials: LoginInput) => 
    apiClient<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () => 
    apiClient<boolean>('/auth/logout', {
        method: 'POST' 
    }),
};