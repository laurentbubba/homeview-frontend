import React from "react";
import ChoiceButton from "./ChoiceButton";

type ChoicesOverviewProps<T> = {
    choicesData: T[];
    selectChoice: (choice:string) => void;
};

const ChoicesOverview = <T extends { name: string }>({choicesData, selectChoice}: ChoicesOverviewProps<T>) => {
    return (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {choicesData.map((choice, index) => (
                <ChoiceButton 
                    name={choice.name} 
                    key={index} 
                    selectChoice={selectChoice}
                />
            ))}
        </div>
    );
};

export default ChoicesOverview;