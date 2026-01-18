import { Category } from "@/types/Types";

const getAllCategories = () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/categories', {
    method: 'GET'
  });
};

const CategoryService = {
  getAllCategories,
};

export default CategoryService;