import React from "react";
import { RecipeType} from "@types";
import RecipeTypesButton from "./RecipeTypesButton";

type Props = {
    recipeTypes: RecipeType[]; // this makes sense for if we send the wrong thing back
    selectRecipeType: (recipeType: string) => void;
};

const RecipeTypesOverviewTable: React.FC<Props> = ({recipeTypes, selectRecipeType}: Props) => {
    return (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {recipeTypes.map((recipeType, index) => (
                <RecipeTypesButton 
                    name={recipeType.name} 
                    key={index} 
                    selectRecipeType={selectRecipeType}
                />
            ))}
        </div>
    );
};

export default RecipeTypesOverviewTable;