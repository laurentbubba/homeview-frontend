import CategoryService from '@/services/CategoryService';
import { CategoryInput } from '@/types/Types';
import React, { useState } from 'react';
import { mutate } from 'swr';
import ModalBase from '../Common/Modal/ModalBase';
import FormButtons from '../Common/Modal/FormButtons';

interface CreateCategoryModalProps {
    onClose: () => void;
}

function CreateCategoryModal({ onClose }: CreateCategoryModalProps) {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');

    const validate = () => {
        let result = true;
        setErrors([]);

        if (!name.trim()) {
            setErrors((errors) => [...errors, 'Category Name is required.']);
            result = false;
        }

        return result;
    };

    const handleClickCreateCategory = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setStatus('');

        if (!validate()) {
            return;
        }

        const category: CategoryInput = {
            name,
            description,
        };

        const response = await CategoryService.createCategory(category);
        const data = await response.json();

        if (!response.ok) {
            setErrors((errors) => [...errors, data.message]);
        } else {
            setStatus('Category created successfully.');
            mutate('categories');
            setName('');
            setDescription('');
            setTimeout(() => onClose(), 500);
        }
    };

    return (
        <ModalBase onClose={onClose} title="Create New Category">
            <form onSubmit={handleClickCreateCategory}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Category Name
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="name"
                        type="text"
                        placeholder="Category Name"
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

                <FormButtons onClose={onClose} submitText='Create Task Category'/>
            </form>
        </ModalBase>
    );
}

export default CreateCategoryModal;
