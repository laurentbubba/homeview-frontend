import { apiClient } from "@/lib/api"; // Assuming you put the helper in lib/api
import { RecipeType, RecipeTypeInput } from "@/types/Types";

const RecipeTypeService = {
  getAllRecipeTypes: () => 
    apiClient<RecipeType[]>('/recipeTypes'),

  createRecipeType: (recipeType: RecipeTypeInput) => 
    apiClient<RecipeType>('/recipeTypes/create', {
      method: 'POST',
      body: JSON.stringify(recipeType),
    }),
};

export default RecipeTypeService;