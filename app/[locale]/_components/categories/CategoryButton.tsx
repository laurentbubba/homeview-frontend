import React, { useState } from "react";
import { Category, Task } from "@types";
import CategoriesOverviewTable from "./CategoriesOverviewTable";

type Props = {
    name: string;
    key: number;
    selectCategory: (name: string) => void;
};

const CategoryButton: React.FC<Props> = ({ name, selectCategory }: Props) => {
    return(
        <button onClick={() => selectCategory(name)} className="p-4 rounded-xl shadow-sm border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md 
        transition-all duration-200 flex items-center justify-center gap-3">{name}</button>
    );
};

export default CategoryButton;