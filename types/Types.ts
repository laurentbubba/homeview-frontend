// somehow automatically sync with back-end

export type Status = {
    message: string;
};

export type Task = {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
}

export type Category = {
    id: number;
    name: string;
    description: string;
}

export type RecipeType = {
    id: number;
    name: string;
    description: string;
}

export type Recipe = {
    id: number;
    name: string;
    type: RecipeType;
    cookingDescription: string;
    ingredients: Ingredient[];
};

export type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
};

export type IngredientInput = {
    name: string;
    quantity: number;
    unit: string;
};

export type TaskInput = {
    name: string | null;
    description: string | null;
    categoryName: string | null;
}

export type RecipeInput = {
    name: string | null;
    typeString: string | null;
    cookingDescription: string | null;
    ingredients: IngredientInput[]
}

export type CategoryInput = {
    name: string;
    description: string;
}

export type RecipeTypeInput = {
    name: string;
    description: string;
}