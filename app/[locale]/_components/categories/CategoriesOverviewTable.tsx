import React from "react";
import { Category} from "@types";
import CategoryButton from "./CategoryButton";

type Props = {
    categories: Category[]; // this makes sense for if we send the wrong thing back
    selectCategory: (category:string) => void;
};

const CategoriesOverviewTable: React.FC<Props> = ({categories, selectCategory}: Props) => {
    return (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {categories.map((category, index) => (
                <CategoryButton 
                    name={category.name} 
                    key={index} 
                    selectCategory={selectCategory}
                />
            ))}
        </div>
    );
};

export default CategoriesOverviewTable;