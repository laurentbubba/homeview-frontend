'use client'

import { getErrorMessage } from '@/lib/functions';
import RecipeService from '@/services/RecipeService';
import { Ingredient, Recipe, RecipeStep } from '@/types/Types';
import { useParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import ContentPage from '../../_components/Common/ContentPage';
import { useTranslations } from 'next-intl';

export default function RecipeDetails() {
    const t = useTranslations();
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');
    const [recipeTitle, setRecipeTitle] = useState<string>('');    

    const params = useParams<{ id: string }>()
    const id = params.id;

    const fetcher = (id: string) => RecipeService.getRecipeById(id);

    const { data: recipe, error, isLoading } = useSWR(
        id ? `recipe-${id}` : null, 
        () => fetcher(id)
    );

    let content = null;

    if (error) {
        content = <div className="text-red-500">Failed to load recipe.</div>;
    }
    if (isLoading) {
        content = <div>Loading recipe...</div>;
    }
    if (!recipe) {
        content = <div>Recipe not found.</div>;
    }

    else {
        // setRecipeTitle(recipe.name);
        content = (
            <main className="w-[90%] flex flex-col justify-items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 py-1 px-2">Ingredients</h2>
                        <div className="columns-2 sm:columns-4 space-y-1 text-left text-sm text-gray-700 p-1 m-1">
                            {recipe.steps.map((step: RecipeStep) => (
                                step.ingredients.map((ingredient: Ingredient) => (
                                    <p key={ingredient.id} className="text-sm text-slate-800 flex items-center justify-center text-center border rounded border-amber-600 break-inside-avoid">
                                        {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                                    </p>
                                )))
                            )}
                        </div>
                </div>
                <h2 className="text-xl font-bold text-slate-800 py-1 px-2">Steps</h2>
                <div className="flex flex-col mb-5">
                    {recipe.steps.map((step: RecipeStep) => (
                        <div key={step.order} className="border p-3 m-1 rounded border-blue-300">
                                {/* Header: Bold and distinct */}
                            <p className="font-bold text-slate-800 border-b pb-1 mb-2">
                                {step.order}. {step.title} <span className="text-slate-400 font-normal text-sm ml-2">({step.time} min)</span>
                            </p>

                            {/* Should make 1/2 columns depending on amount of ingredients */}
                            <div className="mb-1 border border-blue-400 rounded w-fit">
                                {step.ingredients.map((ingredient: Ingredient) => (
                                    <p key={ingredient.id} className="text-sm text-slate-500 flex items-center px-1 py-0.2">
                                        <span className="mr-1 text-blue-400">•</span>
                                        {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                                    </p>
                                ))}
                            </div>

                            <p className="text-slate-900">
                                {step.description}
                            </p>
                        </div>
                ))}
            </div>
        </main>
        );
    }

    return (
        <ContentPage title={(recipe && recipe.name) || 'Recipe Details'}>
            {content}
        </ContentPage>
    );
}