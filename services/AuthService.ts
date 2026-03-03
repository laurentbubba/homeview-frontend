// services/AuthService.ts
import { apiClient } from "@/lib/api";
import { LoginInput, User, UserData } from "@/types/Types";

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

  signup: (userData: UserData) => 
    apiClient<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};