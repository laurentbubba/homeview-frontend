import React, { useState } from "react";
import { Ingredient, Recipe } from "@types";

type Props = {
    recipes: Array<Recipe>;
    selectRecipe: (recipe: Recipe) => void;
};

const RecipesOverviewTable: React.FC<Props> = ({recipes, selectRecipe}: Props) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');

    return (
        <>
            {recipes && (
                <table className="w-full table-fixed">
                    <thead className="hidden md:table-header-group">
                        <tr>
                            <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Recipe</th>
                            <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Type</th>
                            <th className="w-[40%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Cooking Steps</th>
                            <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Ingredients</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe, index) => (
                            <tr className="flex justify-between items-center md:table-row md:border-none border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 odd:bg-white even:bg-gray-50 transition duration-150"
                                key={index}
                                onClick={() => selectRecipe(recipe)}
                                role="button">
                                <td className="font-bold text-center md:text-left px-6 py-3 text-sm text-gray-700">{recipe.name}</td>
                                <td className="hidden md:table-cell text-center md:text-left px-6 py-3 text-sm text-gray-700">{recipe.type.name}</td>
                                <td className="text-left px-6 py-3 text-sm text-gray-700">{recipe.cookingDescription}</td>
                                <td className="text-left px-6 py-3 text-sm text-gray-700">
                                    {recipe.ingredients
                                        .map((ingredient: Ingredient) => 
                                            `${ingredient.name} (${ingredient.quantity} ${ingredient.unit})`)
                                            .join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default RecipesOverviewTable;