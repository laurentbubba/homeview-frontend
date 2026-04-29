import RecipeService from '@/services/RecipeService';
import { IngredientInput, Recipe, RecipeInput, RecipeStepInput } from '@/types/Types';
import React, { useEffect, useState } from 'react';
import { mutate } from 'swr';
import ModalBase from '../Common/Modal/ModalBase';
import FormButtons from '../Common/Modal/FormButtons';
import { useRecipeTypes } from '@/app/hooks/useCategories';
import { getErrorMessage } from '@/lib/functions';

interface RecipeFormModalProps {
    onClose: () => void;
    previouslySelectedRecipeType?: string;
    recipe?: Recipe | null; // For edit mode
    recipeId?: string; // For edit mode - the ID to update
}

// You will pass the close function from the parent
function RecipeFormModal({ onClose, previouslySelectedRecipeType, recipe, recipeId }: RecipeFormModalProps) {
    const isEdit = !!recipe || !!recipeId;
    
    const [name, setName] = useState<string | null>(null);
    const [typeString, setTypeString] = useState<string>(
        previouslySelectedRecipeType === 'ALL' ? '' : (previouslySelectedRecipeType || '')
    );
    const [cookingDescription, setCookingDescription] = useState<string | null>(null);
    const [steps, setSteps] = useState<RecipeStepInput[]>([
        {
            order: 1,
            title: '',
            description: '',
            time: 0,
            ingredients: []
        }
    ]);
    const [expandedStepIndex, setExpandedStepIndex] = useState<number>(0);

    // Populate form when in edit mode
    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setTypeString(recipe.type?.name || '');
            setCookingDescription(recipe.cookingDescription);
            setSteps(recipe.steps.map(step => ({
                order: step.order,
                title: step.title,
                description: step.description,
                time: step.time,
                ingredients: step.ingredients.map(ing => ({
                    name: ing.name,
                    quantity: ing.quantity,
                    unit: ing.unit
                }))
            })));
            setExpandedStepIndex(0);
        } else if (recipeId) {
            // Fetch recipe by ID if only recipeId is provided
            RecipeService.getRecipeById(recipeId).then((fetchedRecipe) => {
                setName(fetchedRecipe.name);
                setTypeString(fetchedRecipe.type?.name || '');
                setCookingDescription(fetchedRecipe.cookingDescription);
                setSteps(fetchedRecipe.steps.map(step => ({
                    order: step.order,
                    title: step.title,
                    description: step.description,
                    time: step.time,
                    ingredients: step.ingredients.map(ing => ({
                        name: ing.name,
                        quantity: ing.quantity,
                        unit: ing.unit
                    }))
                })));
                setExpandedStepIndex(0);
            }).catch((err) => {
                setErrors((errors) => [...errors, getErrorMessage(err)]);
            });
        }
    }, [recipe, recipeId]);

    const { data: typesData,isLoading: typesIsLoading, error: typesError } = useRecipeTypes();

    // Step management functions
    const addStep = (insertAfterIndex?: number) => {
        const newStep: RecipeStepInput = {
            order: (insertAfterIndex !== undefined ? insertAfterIndex + 1 : steps.length) + 1,
            title: '',
            description: '',
            time: 0,
            ingredients: []
        };
        
        let newSteps: RecipeStepInput[];
        if (insertAfterIndex !== undefined) {
            // Insert after the specified index
            const before = steps.slice(0, insertAfterIndex + 1);
            const after = steps.slice(insertAfterIndex + 1).map(s => ({ ...s, order: s.order + 1 }));
            newSteps = [...before, newStep, ...after];
        } else {
            newSteps = [...steps, newStep];
        }
        
        // Reorder all steps
        newSteps = newSteps.map((step, i) => ({ ...step, order: i + 1 }));
        setSteps(newSteps);
        setExpandedStepIndex(insertAfterIndex !== undefined ? insertAfterIndex + 1 : newSteps.length - 1);
    };

    const removeStep = (stepIndex: number) => {
        if (steps.length > 1) {
            const newSteps = steps.filter((_, i) => i !== stepIndex).map((step, i) => ({
                ...step,
                order: i + 1
            }));
            setSteps(newSteps);
            if (expandedStepIndex >= newSteps.length) {
                setExpandedStepIndex(Math.max(0, newSteps.length - 1));
            }
        }
    };

    const moveStep = (stepIndex: number, direction: 'up' | 'down') => {
        if (direction === 'up' && stepIndex === 0) return;
        if (direction === 'down' && stepIndex === steps.length - 1) return;

        const newSteps = [...steps];
        const swapIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
        
        // Swap the steps
        [newSteps[stepIndex], newSteps[swapIndex]] = [newSteps[swapIndex], newSteps[stepIndex]];
        
        // Update order numbers
        newSteps.forEach((step, i) => {
            step.order = i + 1;
        });
        
        setSteps(newSteps);
    };

    const handleStepChange = (stepIndex: number, field: keyof RecipeStepInput, value: string | number) => {
        const newSteps = [...steps];
        if (field === 'time' || field === 'order') {
            (newSteps[stepIndex][field] as number) = Number(value);
        } else {
            (newSteps[stepIndex][field as 'title' | 'description'] as string) = String(value);
        }
        setSteps(newSteps);
    };

    // Ingredient management functions (per step)
    const addIngredientLine = (stepIndex: number) => {
        const newIngredient: IngredientInput = { 
            name: '', 
            quantity: 0, 
            unit: '' 
        };
        const newSteps = [...steps];
        newSteps[stepIndex].ingredients.push(newIngredient);
        setSteps(newSteps);
    };

    const removeIngredientLine = (stepIndex: number, ingredientIndex: number) => {
        const newSteps = [...steps];
        if (newSteps[stepIndex].ingredients.length > 0) {
            newSteps[stepIndex].ingredients = newSteps[stepIndex].ingredients.filter((_, i) => i !== ingredientIndex);
            setSteps(newSteps);
        }
    };

    const handleIngredientChange = (stepIndex: number, ingredientIndex: number, field: keyof IngredientInput, value: string | number) => {
        const newSteps = [...steps];
        if (field === 'quantity') {
            (newSteps[stepIndex].ingredients[ingredientIndex][field] as number) = Number(value);
        } else {
            const stringField = field as 'name' | 'unit';
            newSteps[stepIndex].ingredients[ingredientIndex][stringField] = String(value);
        }
        setSteps(newSteps);
    };

    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');
    
    const validate = () => {
        let result = true;
        setErrors([]);

        if (!name) {
            setErrors((errors) => [...errors, 'Recipe Name is required.']);
            result = false;
        }

        if (steps.length === 0 || steps.some(step => !step.title || !step.description)) {
            setErrors((errors) => [...errors, 'All steps must have a title and description.']);
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setStatus('');

        if (!validate()) {
            return;
        }

        const recipe: RecipeInput = {
            name,
            typeString,
            cookingDescription,
            steps
        };

        try {
            if (isEdit && recipeId) {
                await RecipeService.updateRecipe(recipeId, recipe);
                setStatus('Recipe updated successfully.');
                mutate(`recipe-${recipeId}`);
                mutate(['recipesByType', typeString]);
            } else {
                await RecipeService.createRecipe(recipe);
                setStatus('Recipe created successfully.');
                mutate(['recipesByType', typeString]);
            }
        } catch (error: unknown) {
            setErrors((errors) => [...errors, getErrorMessage(error)]);
        }
    };

    return (
        <ModalBase onClose={onClose} title={isEdit ? 'Edit Recipe' : 'Create New Recipe'}>
            <form onSubmit={handleSubmit}>
                {/* Recipe Basic Info */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input 
                        value={name || ''} 
                        onChange={(e) => setName(e.target.value)} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        id="name" 
                        type="text" 
                        placeholder="Recipe Name" 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
                    <select 
                        id="types"
                        value={typeString}
                        onChange={(e) => setTypeString(e.target.value)}
                        disabled={typesIsLoading}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {(!typeString || typesIsLoading) && (
                            <option value="" disabled>
                                {typesIsLoading ? "Fetching types..." : "Select a Type..."}
                            </option>
                        )}

                        {typesData?.map((type) => (
                            <option key={type.id} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cookingDescription">Recipe Description</label>
                    <textarea 
                        value={cookingDescription || ''} 
                        onChange={(e) => setCookingDescription(e.target.value)} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        id="description" 
                        placeholder="Cooking Description"
                    />
                </div>

                {/* Steps Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-3">Steps</label>
                    
                    <div className="space-y-2 mb-4">
                        {steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="border rounded bg-gray-50">
                                {/* Step Header */}
                                <div 
                                    onClick={() => setExpandedStepIndex(expandedStepIndex === stepIndex ? -1 : stepIndex)}
                                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 transition"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                            {step.order}
                                        </span>
                                        <div>
                                            <p className="font-semibold text-gray-800">{step.title || 'Untitled Step'}</p>
                                            <p className="text-xs text-gray-600">{step.ingredients.length} ingredient(s) • {step.time} min</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* Move Up Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); moveStep(stepIndex, 'up'); }}
                                            disabled={stepIndex === 0}
                                            className={`p-1 rounded transition ${stepIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
                                            title="Move Up"
                                        >
                                            ↑
                                        </button>
                                        {/* Move Down Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); moveStep(stepIndex, 'down'); }}
                                            disabled={stepIndex === steps.length - 1}
                                            className={`p-1 rounded transition ${stepIndex === steps.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
                                            title="Move Down"
                                        >
                                            ↓
                                        </button>
                                        <span className="text-lg text-blue-500 font-bold border border-blue-300 rounded px-1.5 py-0.5">{expandedStepIndex === stepIndex ? '−' : '+'}</span>
                                    </div>
                                </div>

                                {/* Step Details */}
                                {expandedStepIndex === stepIndex && (
                                    <div className="p-4 border-t">
                                        {/* Step Title */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">Step Title</label>
                                            <input
                                                type="text"
                                                value={step.title}
                                                onChange={(e) => handleStepChange(stepIndex, 'title', e.target.value)}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="e.g., Prepare Fries"
                                            />
                                        </div>

                                        {/* Step Description */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">Description</label>
                                            <textarea
                                                value={step.description}
                                                onChange={(e) => handleStepChange(stepIndex, 'description', e.target.value)}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="What to do in this step..."
                                                rows={3}
                                            />
                                        </div>

                                        {/* Step Time */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">Time (minutes)</label>
                                            <input
                                                type="number"
                                                value={step.time}
                                                onChange={(e) => handleStepChange(stepIndex, 'time', e.target.value)}
                                                className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="0"
                                            />
                                        </div>

                                        {/* Step Ingredients */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">Ingredients for this step</label>
                                            
                                            <div className="max-h-48 overflow-y-auto border rounded p-2 mb-2 bg-white">
                                                {step.ingredients.length === 0 ? (
                                                    <p className="text-gray-500 text-xs p-2">No ingredients yet</p>
                                                ) : (
                                                    step.ingredients.map((ingredient, ingIndex) => (
                                                        <div key={ingIndex} className="flex items-center gap-2 mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Name"
                                                                value={ingredient.name}
                                                                onChange={(e) => handleIngredientChange(stepIndex, ingIndex, 'name', e.target.value)}
                                                                className="shadow border rounded flex-1 py-1 px-2 text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                            <input
                                                                type="number"
                                                                placeholder="Qty"
                                                                value={ingredient.quantity}
                                                                onChange={(e) => handleIngredientChange(stepIndex, ingIndex, 'quantity', e.target.value)}
                                                                className="shadow border rounded w-20 py-1 px-2 text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Unit"
                                                                value={ingredient.unit}
                                                                onChange={(e) => handleIngredientChange(stepIndex, ingIndex, 'unit', e.target.value)}
                                                                className="shadow border rounded w-20 py-1 px-2 text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeIngredientLine(stepIndex, ingIndex)}
                                                                className="text-red-500 hover:text-red-700 font-bold px-2 transition duration-200"
                                                                title="Remove Ingredient"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => addIngredientLine(stepIndex)}
                                                className="text-xs bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none transition duration-200"
                                            >
                                                + Add Ingredient
                                            </button>
                                        </div>

                                        {/* Remove Step Button */}
                                        {steps.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeStep(stepIndex)}
                                                className="text-xs bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none transition duration-200 mr-2"
                                            >
                                                Remove Step
                                            </button>
                                        )}
                                        {/* Add Step In Between Button */}
                                        <button
                                            type="button"
                                            onClick={() => addStep(stepIndex)}
                                            className="text-xs bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none transition duration-200"
                                        >
                                            + Add Step After
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add Step Button */}
                    <button
                        type="button"
                        onClick={() => addStep()}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none transition duration-200"
                    >
                        + Add Step
                    </button>
                </div>

                {/* Errors and Status */}
                {errors.length > 0 && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded">
                        {errors.map((error, idx) => (
                            <p key={idx} className='text-red-600 text-sm'>{error}</p>
                        ))}
                    </div>
                )}
                
                {status && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded">
                        <p className='text-green-600 text-sm'>{status}</p>
                    </div>
                )}
                
                <FormButtons onClose={onClose} submitText={isEdit ? 'Save Changes' : 'Add Recipe'}/>
            </form>
        </ModalBase>
    );
}

export default RecipeFormModal;