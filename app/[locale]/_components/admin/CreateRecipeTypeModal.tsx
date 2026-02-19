import RecipeTypeService from '@/services/RecipeTypeService';
import { RecipeTypeInput } from '@/types/Types';
import React, { useState } from 'react';
import { mutate } from 'swr';
import ModalBase from '../Common/Modal/ModalBase';
import FormButtons from '../Common/Modal/FormButtons';

interface CreateRecipeTypeModalProps {
    onClose: () => void;
}

function CreateRecipeTypeModal({ onClose }: CreateRecipeTypeModalProps) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');

    const validate = () => {
        let result = true;
        setErrors([]);

        if (!name.trim()) {
            setErrors((errors) => [...errors, 'Recipe Type Name is required.']);
            result = false;
        }

        return result;
    };

    const handleClickCreateRecipeType = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setStatus('');

        if (!validate()) {
            return;
        }

        const recipeType: RecipeTypeInput = {
            name,
            description,
        };

        const response = await RecipeTypeService.createRecipeType(recipeType);
        const data = await response.json();

        if (!response.ok) {
            setErrors((errors) => [...errors, data.message]);
        } else {
            setStatus('Recipe Type created successfully.');
            mutate('recipeTypes');
            setName('');
            setDescription('');
            setTimeout(() => onClose(), 500);
        }
    };

    return (
        <ModalBase onClose={onClose} title="Create New Recipe Type">
            <form onSubmit={handleClickCreateRecipeType}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Recipe Type Name
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="name"
                        type="text"
                        placeholder="Recipe Type Name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="description"
                        placeholder="Description (optional)"
                    />
                </div>

                {errors.length > 0 && <p className="text-red-600 mb-4">{errors.join(', ')}</p>}
                {status && <p className="text-green-600 mb-4">{status}</p>}

                <FormButtons onClose={onClose} submitText='Create Recipe type'/>
            </form>
        </ModalBase>
    );
}

export default CreateRecipeTypeModal;
