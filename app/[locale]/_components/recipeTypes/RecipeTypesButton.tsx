import React, { useState } from "react";

type Props = {
    name: string;
    key: number;
    selectRecipeType: (name: string) => void;
};

const RecipeTypesButton: React.FC<Props> = ({ name, selectRecipeType }: Props) => {
    return(
        <button onClick={() => selectRecipeType(name)} className="flex-1 min-w-[120px] max-w-fit p-4 rounded-xl shadow-sm border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md 
        transition-all duration-200 flex items-center justify-center gap-3">{name}</button>
    );
};

export default RecipeTypesButton;