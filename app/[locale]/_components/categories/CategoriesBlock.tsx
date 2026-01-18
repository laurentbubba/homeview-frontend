import React, { useState } from "react";
import { Category, Task } from "@types";
import CategoriesOverviewTable from "./CategoriesOverviewTable";

type Props = {
    categoriesError: any;
    categoriesIsLoading: boolean;
    categoriesData: Category[] | undefined; // this makes sense for if we send the wrong thing back
    selectCategory: (category: string) => void;
};

const CategoriesBlock: React.FC<Props> = ({categoriesError, categoriesIsLoading, categoriesData, selectCategory}: Props) => {

    if (categoriesError) {
        return (
            <p>ERROR: {categoriesError}</p>
        )
    }
    else if (categoriesIsLoading) {
        return (
            <p>LOADING ... </p>
        );
    }
    else if (categoriesData) {
        return (
            <CategoriesOverviewTable categories={categoriesData} selectCategory={selectCategory}></CategoriesOverviewTable>
        );
    }
};

export default CategoriesBlock;