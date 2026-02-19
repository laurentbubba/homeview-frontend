import { RecipeTypeInput } from "@/types/Types";

const getAllRecipeTypes = () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/recipeTypes', {
    method: 'GET'
  });
};

const createRecipeType = (recipeType: RecipeTypeInput) => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/recipeTypes/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeType),
  });
};

const RecipeTypeService = {
  getAllRecipeTypes,
  createRecipeType,
};

export default RecipeTypeService;