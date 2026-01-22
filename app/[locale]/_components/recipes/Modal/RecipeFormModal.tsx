import RecipeService from '@/services/RecipeService';
import TaskService from '@/services/TaskService';
import { IngredientInput, RecipeInput } from '@/types/Types';
import React, { useState } from 'react';

interface RecipeFormModalProps {
    onClose: () => void; 
}

// You will pass the close function from the parent
function RecipeFormModal({ onClose }: RecipeFormModalProps) {
    const [name, setName] = useState<string | null>(null);
    const [typeString, setTypeString] = useState<string>("");
    const [cookingDescription, setCookingDescription] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<IngredientInput[] | []>([]);

    const addIngredient = (name: string, quantity: number, unit: string) => {
        const newIngredient: IngredientInput = { 
            name, 
            quantity, 
            unit 
        };

        setIngredients([...ingredients, newIngredient]);
    };

    const addIngredientLine = () => {
        let name = '', quantity = 0, unit = '';
        const newIngredient: IngredientInput = { 
            name, 
            quantity, 
            unit 
        };
        setIngredients([...ingredients, newIngredient]);
    };

    const removeIngredientLine = (index: number) => {
        if (ingredients.length > 1) {
            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
        }
    };

    const handleIngredientChange = (index: number, field: keyof IngredientInput, value: string | number) => {
        const newIngredients = [...ingredients];
        // TOLE
        if (field === 'quantity') {
            (newIngredients[index][field] as number) = Number(value);
        }else {
            (newIngredients[index] as any)[field] = value;
        }
        setIngredients(newIngredients);
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

        return result;
    };

    const handleClickCreateRecipe = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setStatus('');

        if (!validate()) {
            return;
        }

        const recipe: RecipeInput = {
            name,
            typeString,
            cookingDescription,
            ingredients
        };

        const response = await RecipeService.createRecipe(recipe);
        const data = await response.json();

        if (!response.ok) {
            setErrors((errors) => [...errors, data.message]);
        } else {
            setStatus('Recipe created successfully.');
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]" 
            onClick={onClose} // Close modal when clicking outside
        >
            <div 
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} // Stop click from bubbling up to the backdrop
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Recipe</h3>
                
                <form onSubmit={handleClickCreateRecipe}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" type="text" placeholder="Recipe Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
                        <select 
                            onChange={(e) => setTypeString(e.target.value)}
                            value={typeString}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            id="category"
                        >
                            <option value="" disabled>Select a Type...</option>
                            <option value="main course">Main Course</option>
                            <option value="dessert">Dessert</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="beverage">Beverage</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cookingDescription">Cooking Description</label>
                        <textarea onChange={(e) => setCookingDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="description" placeholder="Cooking Description"></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
                        
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={ingredient.name}
                                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                    className="shadow border rounded w-1/2 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                    className="shadow border rounded w-20 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Unit"
                                    value={ingredient.unit}
                                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                    className="shadow border rounded w-24 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                
                                {/* Only show remove button if there is more than 1 ingredient */}
                                {ingredients.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeIngredientLine(index)}
                                        className="text-red-500 hover:text-red-700 font-bold px-2 transition duration-200"
                                        title="Remove Ingredient"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addIngredientLine}
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded focus:outline-none transition duration-200"
                        >
                            + Add Ingredient
                        </button>
                    </div>

                    <p className='text-red-600'>{errors}</p>
                    
                    {/* Submit and Close Buttons */}
                    <div className="flex items-center justify-between">
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150" 
                            type="submit"
                        >
                            Submit Task
                        </button>
                        <button 
                            className="text-gray-500 hover:text-gray-800 font-bold py-2 px-4 rounded" 
                            type="button" 
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecipeFormModal;