import React from "react";
import ChoicesOverview from "./ChoicesOverview";

type ChoicesLogicProps<T extends { name: string }> = {
    choicesError: Error | undefined;
    choicesIsLoading: boolean;
    choicesData: T[] | undefined;
    selectChoice: (choice: string) => void
};

const ChoicesLogic = <T extends { name: string }>({choicesError, choicesIsLoading, choicesData, selectChoice}: ChoicesLogicProps<T>) => {

    if (choicesError) {
        return (
            <p>ERROR: {choicesError.message}</p>
        )
    }
    else if (choicesIsLoading) {
        return (
            <p>LOADING ... </p>
        );
    }
    else if (choicesData) {
        return (
            <ChoicesOverview choicesData={choicesData} selectChoice={selectChoice}></ChoicesOverview>
        );
    }
};

export default ChoicesLogic;