'use client'

import React, { useState } from 'react';
import CreateCategoryModal from '../_components/admin/CreateCategoryModal';
import CreateRecipeTypeModal from '../_components/admin/CreateRecipeTypeModal';

export default function AdminPage() {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showRecipeTypeModal, setShowRecipeTypeModal] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Panel</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Create Category Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Task Category</h2>
                        <p className="text-gray-600 mb-6">
                            Add a new task category to organize your tasks.
                        </p>
                        <button
                            onClick={() => setShowCategoryModal(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                        >
                            Create Category
                        </button>
                    </div>

                    {/* Create Recipe Type Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Recipe Type</h2>
                        <p className="text-gray-600 mb-6">
                            Add a new recipe type to categorize your recipes.
                        </p>
                        <button
                            onClick={() => setShowRecipeTypeModal(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                        >
                            Create Recipe Type
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showCategoryModal && (
                <CreateCategoryModal onClose={() => setShowCategoryModal(false)} />
            )}

            {showRecipeTypeModal && (
                <CreateRecipeTypeModal onClose={() => setShowRecipeTypeModal(false)} />
            )}
        </div>
    );
}
