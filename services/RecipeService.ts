// services/RecipeService.ts
import { RecipeInput, Task } from '@/types/Types';

const getRecipesByType = (type: string) => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/recipes' + `/byType/${type}`, {
        method: 'GET',
    });
}

const createRecipe = (recipe: RecipeInput) => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/recipes' + '/create', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        //   Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(recipe)
    });
};

const RecipeService = {
  getRecipesByType,
  createRecipe,
};

export default RecipeService;