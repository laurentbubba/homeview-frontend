import CategoryService from '@/services/CategoryService';
import RecipeTypeService from '@/services/RecipeTypeService';
import { Category, RecipeType } from '@/types/Types';
import useSWR from 'swr';

const categoriesFetcher = async () => {
    const categories = await CategoryService.getAllCategories();
    return categories.json();
};

export const useCategories = () => {
    const { data, error, isLoading } = useSWR<Category[]>('Categories', categoriesFetcher);
    return {
        data,
        isLoading,
        error
    };
};

const typesFetcher = async () => {
    const types = await RecipeTypeService.getAllRecipeTypes();
    return types.json();
};

export const useRecipeTypes = () => {
    const { data, error, isLoading } = useSWR<RecipeType[]>('Types', typesFetcher);
    return {
        data,
        isLoading,
        error
    };
};