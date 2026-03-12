// somehow automatically sync with back-end

export type Status = {
    message: string;
};

export type Task = {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    priority: number;
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
    steps: RecipeStep[];
};

export type RecipeStep = {
    id: number;
    order: number;
    title: string;
    description: string;
    time: number;
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
    priority: number | null;
}

export type RecipeInput = {
    name: string | null;
    typeString: string | null;
    cookingDescription: string | null;
    steps: RecipeStepInput[]
}

export type RecipeStepInput = {
    order: number;
    title: string;
    description: string;
    time: number;
    ingredients: IngredientInput[];
};

export type CategoryInput = {
    name: string;
    description: string;
}

export type RecipeTypeInput = {
    name: string;
    description: string;
}

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type LoginInput = {
    username: string;
    password: string;
}

export type UserData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}