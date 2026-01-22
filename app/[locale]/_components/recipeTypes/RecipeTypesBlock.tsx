import React, { useState } from "react";
import { RecipeType } from "@types";
import RecipeTypesOverviewTable from "./RecipeTypesOverviewTable";

type Props = {
    recipeTypesError: Error | undefined;
    recipeTypesIsLoading: boolean;
    recipeTypesData: RecipeType[] | undefined; // this makes sense for if we send the wrong thing back
    selectRecipeType: (recipeType: string) => void;
};

const RecipeTypesBlock: React.FC<Props> = ({recipeTypesError, recipeTypesIsLoading, recipeTypesData, selectRecipeType}: Props) => {

    if (recipeTypesError) {
        return (
            <p>ERROR: {recipeTypesError.message}</p>
        )
    }
    else if (recipeTypesIsLoading) {
        return (
            <p>LOADING ... </p>
        );
    }
    else if (recipeTypesData) {
        return (
            <RecipeTypesOverviewTable recipeTypes={recipeTypesData} selectRecipeType={selectRecipeType}></RecipeTypesOverviewTable>
            // <RecipeSpinningWheel categories={recipeTypesData} selectCategory={selectCategory}></RecipeSpinningWheel>
        );
    }
};

export default RecipeTypesBlock;