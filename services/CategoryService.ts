import { Category, CategoryInput } from "@/types/Types";

const getAllCategories = () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/categories', {
    method: 'GET'
  });
};

const createCategory = (category: CategoryInput) => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/categories/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
};

const CategoryService = {
  getAllCategories,
  createCategory,
};

export default CategoryService;