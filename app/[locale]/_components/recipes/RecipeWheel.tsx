import React, { useState } from "react";
import { Recipe } from "@types";

type Props = {
    recipes: Array<Recipe>;
    onWinner: (recipe: Recipe) => void;
};

const RecipeWheel: React.FC<Props> = ({ recipes, onWinner }) => {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const spinWheel = () => {
        if (isSpinning || recipes.length === 0) return;

        setIsSpinning(true);
        
        const extraDegree = Math.floor(Math.random() * 360);
        const newRotation = rotation + (360 * 5) + extraDegree;
        
        setRotation(newRotation);
        
        // calculate winner
        setTimeout(() => {
            setIsSpinning(false);
            
            // modulo rotation
            const actualDegree = newRotation % 360;
            
            // clockwise rotation 
            // pointer is at the top, so 0 degrees
            const segmentSize = 360 / recipes.length;
            const winningIndex = Math.floor((360 - actualDegree) / segmentSize) % recipes.length;
            
            onWinner(recipes[winningIndex]);
        }, 3000); 
    };

    if (recipes.length === 0) return null;

    return (
        <div className="flex flex-col items-center my-8">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600 -mt-1 z-10"></div>

            <div className="relative w-64 h-64 border-4 border-gray-800 rounded-full overflow-hidden shadow-xl"
                 style={{ 
                    transition: 'transform 3s cubic-bezier(0.2, 0, 0.2, 1)',
                    transform: `rotate(${rotation}deg)`,
                    background: `conic-gradient(${
                        // Colors
                        recipes.map((_, i) => {
                            const hue = i * (360 / Math.min(recipes.length, 100)); 
                            const color = `hsl(${hue}, 70%, 60%)`;
                            const startDeg = i * (360 / recipes.length);
                            const endDeg = (i + 1) * (360 / recipes.length);
                            
                            return `${color} ${startDeg}deg ${endDeg}deg`;
                        }).join(', ')
                    })`
                 }}>
                {recipes.map((recipe, i) => (
                    <div 
                        key={i}
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom text-xs font-bold pt-2 text-center"
                        style={{ transform: `translateX(-50%) rotate(${i * (360/recipes.length) + (180/recipes.length)}deg)` }}
                    >
                        <span className="[writing-mode:vertical-rl] rotate-180">{recipe.name}</span>
                    </div>
                ))}
            </div>

            <button 
                onClick={spinWheel}
                disabled={isSpinning}
                className={`mt-4 px-6 py-2 rounded-full font-bold text-white transition ${
                    isSpinning ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
                {isSpinning ? 'Choosing...' : 'Spin for Dinner!'}
            </button>
        </div>
    );
};

export default RecipeWheel;