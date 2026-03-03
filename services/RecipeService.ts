import { apiClient } from "@/lib/api";
import { Recipe, RecipeInput } from '@/types/Types';

const RecipeService = {
  getRecipesByType: (type: string) => 
    apiClient<Recipe[]>(`/recipes/byType/${type}`),

  createRecipe: (recipe: RecipeInput) => 
    apiClient<Recipe>('/recipes/create', {
      method: 'POST',
      body: JSON.stringify(recipe),
    }),
};

export default RecipeService;