import { Category } from "@/types/Types";

const getAllRecipeTypes = () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/recipeTypes', {
    method: 'GET'
  });
};

const RecipeTypeService = {
  getAllRecipeTypes,
};

export default RecipeTypeService;