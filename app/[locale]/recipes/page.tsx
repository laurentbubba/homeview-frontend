'use client'

import { Recipe, RecipeType, Task } from '@/types/Types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWR from 'swr';
import ContentPage from '../_components/Common/ContentPage';
import RecipeTypeService from '@/services/RecipeTypeService';
import RecipeService from '@/services/RecipeService';
import RecipesOverviewTable from '../_components/recipes/RecipesOverviewTable';
import RecipeWheel from '../_components/recipes/RecipeWheel';
import FormModalMechanic from '../_components/Common/Modal/FullModalMechanism';
import RecipeFormModal from '../_components/recipes/RecipeFormModal';
import ChoicesLogic from '../_components/Common/ChoiceBlock/ChoicesLogic';
import FullModalMechanism from '../_components/Common/Modal/FullModalMechanism';
import { useRecipeTypes } from '@/app/hooks/useCategories';

export default function RecipesByType() {
  const t = useTranslations();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const [visual, setVisual] = useState('table');
  const [visualIcon, setVisualIcon] = useState('📅');
  const switchVisual = () => {
    setVisual(visual === 'table' ? 'wheel' : 'table');
    setVisualIcon(visual === 'table' ? '📅' : '🎡');
    // setSelectedType(undefined);
    setSelectedRecipe(undefined);
  };

  const [selectedType, setSelectedType] = useState<string>();
  const handleSelectType = (type: string) => {
    setSelectedType(type);
  }

  const { data: typesData,isLoading: typesIsLoading, error: typesError } = useRecipeTypes();

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>();
  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  }

  //useSWR will take the two arguments, so we gotta destructure
  const recipesByTypeFetcher = async ([_, type]: [string, string]) => {
    if (!type) return [];
    return await RecipeService.getRecipesByType(type);
  };
  // first argument is conditional based on selectedCategory
  const { data: dataRecipesByType, error: errorRecipesByType, isLoading: isLoadingRecipesByType } = 
  useSWR<Recipe[]>(
    selectedType ? ['recipesByType', selectedType] : null, 
    recipesByTypeFetcher
  );


  // To show recipes
  let recipeBlock;
  if (!selectedType){
    // State 0: Initial/Idle State
    recipeBlock = <div className="text-gray-500">Please select a type to view recipes.</div>;
  } else if (isLoadingRecipesByType) {
    // State 1: Loading
    recipeBlock = <div className="text-gray-500">Loading recipes ...</div>;
  } else if (errorRecipesByType) {
    // State 2: Error
    recipeBlock = <div className="text-red-800">{errorRecipesByType}</div>;
  } else if (!dataRecipesByType || dataRecipesByType.length == 0) {
    // State 3: Empty
    recipeBlock = <div>No recipes have been found.</div>;
  } else if (dataRecipesByType && dataRecipesByType.length > 0) {
    // State 3: Recipes are available
    if (visual === 'table') {
      recipeBlock = <RecipesOverviewTable recipes={dataRecipesByType}/>;
    } else if (visual === 'wheel') {
      recipeBlock =<RecipeWheel recipes={dataRecipesByType} onWinner={handleSelectRecipe}/>;
    }

  }

  let recipeTable;
  if (!selectedType) {
    recipeTable = null;
  } else if (!selectedRecipe) {
    if (visual === 'table') {
    } else if (visual === 'wheel') {
      recipeTable = <div className="text-gray-500">No recipe rolled.</div>;
    }
  } else if (selectedRecipe) {
    recipeTable = <RecipesOverviewTable recipes={[selectedRecipe]} selectRecipe={handleSelectRecipe}/>;
  }


  return (
    <ContentPage title={t('recipes.title')}>
      <button onClick={() => switchVisual()} className="flex-1  p-3 rounded-xl shadow-sm border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md 
        transition-all duration-200 flex items-center justify-center gap-3">{visualIcon}</button>
      <ChoicesLogic<RecipeType>choicesData={typesData} choicesIsLoading={typesIsLoading} 
      choicesError={typesError} selectChoice={handleSelectType} />
      
      <FullModalMechanism openForm={openForm} closeForm={closeForm} isFormOpen={isFormOpen} 
      renderForm={(onClose) => (<RecipeFormModal onClose={onClose} previouslySelectedRecipeType={selectedType}/>)}></FullModalMechanism>
      
      {!typesIsLoading && recipeBlock}
      {!typesIsLoading && recipeTable}
    </ContentPage>
  );
};