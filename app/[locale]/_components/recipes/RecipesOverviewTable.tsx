import React, { useState } from "react";
import { Ingredient, Recipe, RecipeStep } from "@types";
import { Link } from "@/i18n/navigation";

type Props = {
    recipes: Array<Recipe>;
    selectRecipe?: (recipe: Recipe) => void;
};

const RecipesOverviewTable: React.FC<Props> = ({recipes, selectRecipe}: Props) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');

    return (
        <>
            {recipes && (
                <table className="">
                    <thead className="">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Recipe</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Time</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Description</th>      
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Total Ingredients</th>                   
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe, index) => (
                            <tr className="table-row justify-between items-center border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 odd:bg-white even:bg-gray-50 transition duration-150"
                                key={index}
                                onClick={() => selectRecipe && selectRecipe(recipe)}
                                role="button">
                                <td className="font-bold text-center px-6 py-3 text-sm text-gray-700">
                                    <Link 
                                        href={`/recipes/${recipe.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {recipe.name}
                                    </Link>
                                </td>
                                <td className="text-left px-6 py-3 text-sm text-gray-700">{recipe.cookingDescription}</td>
                                {/* <td className="text-left px-6 py-3 text-sm text-gray-700">{recipe.totalTime}</td> */}
                                <td className="text-left px-6 py-3 text-sm text-gray-700">
                                    <div className="mb-1 columns-1 sm:columns-4 gap-2 space-y-1">
                                        {recipe.steps.map((step: RecipeStep) => (
                                            step.ingredients.map((ingredient: Ingredient) => (
                                                <p key={ingredient.id} className="text-sm text-slate-500 flex items-center border rounded p-0.5 border-blue-300 break-inside-avoid">
                                                    {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                                                </p>
                                            )))
                                        )}
                                    </div>
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