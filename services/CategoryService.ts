import { apiClient } from "@/lib/api";
import { Category, CategoryInput } from "@/types/Types";

const CategoryService = {
  getAllCategories: () => 
    apiClient<Category[]>('/categories'),

  createCategory: (category: CategoryInput) => 
    apiClient<Category>('/categories/create', {
      method: 'POST',
      body: JSON.stringify(category),
    }),
};

export default CategoryService;