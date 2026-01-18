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

export type TaskInput = {
    name: string | null;
    description: string | null;
    categoryName: string | null;
}