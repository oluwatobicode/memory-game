import { useGameContext } from "../contexts/GameProvider";
import { useEffect } from "react";

const GameBoard = () => {
  const { state, flipCard, matchFound, flipBack } = useGameContext();

  // Handle card matching logic
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const [firstIndex, secondIndex] = state.flippedCards;
      const firstCard = state.cards[firstIndex];
      const secondCard = state.cards[secondIndex];

      const timer = setTimeout(() => {
        if (firstCard === secondCard) {
          console.log("Match found!");
          matchFound();
        } else {
          console.log("No match - flipping back");
          flipBack();
        }
      }, 1000); // 1 second delay to show both cards

      return () => clearTimeout(timer);
    }
  }, [state.flippedCards, state.cards]);

  const handleCardClick = (cardIndex: number) => {
    if (state.gameStatus !== "playing") return;

    if (
      state.flippedCards.includes(cardIndex) ||
      state.matchedCards.includes(cardIndex)
    )
      return;

    if (state.flippedCards.length >= 2) return;

    flipCard(cardIndex);
  };

  const isCardFlipped = (index: number) => {
    return (
      state.flippedCards.includes(index) || state.matchedCards.includes(index)
    );
  };

  const isCardMatched = (index: number) => {
    return state.matchedCards.includes(index);
  };

  const getCardDisplay = (index: number) => {
    if (isCardFlipped(index)) {
      if (state.theme === "numbers") {
        return state.cards[index];
      } else {
        // For icons theme, you can map numbers to icons
        const iconMap: { [key: number]: string } = {
          1: "🌟",
          2: "🎯",
          3: "🚀",
          4: "🎨",
          5: "🌈",
          6: "🔥",
          7: "💎",
          8: "🎵",
          9: "🌸",
          10: "🦋",
          11: "🌙",
          12: "⭐",
          13: "🎪",
          14: "🎭",
          15: "🎲",
          16: "🎊",
          17: "🎈",
          18: "🎁",
        };
        return iconMap[state.cards[index]] || state.cards[index];
      }
    }
    return "";
  };

  // Determine grid layout based on grid size
  const gridCols = state.grid_size === "4x4" ? "grid-cols-4" : "grid-cols-6";
  const cardSize =
    state.grid_size === "4x4"
      ? "w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
      : "w-[60px] h-[60px] md:w-[75px] md:h-[75px]";

  return (
    <div className="flex flex-col items-center mt-10">
      <div className={`grid ${gridCols} gap-[15px] mb-8`}>
        {state.cards.map((_, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`
              ${cardSize} 
              flex items-center justify-center 
              text-[#FCFCFC] 
              rounded-[59px] 
              cursor-pointer
              transition-all duration-300
              select-none
              ${
                isCardFlipped(index)
                  ? isCardMatched(index)
                    ? "bg-[#FDA214] shadow-lg" // Matched cards - orange
                    : "bg-[#6395B8] shadow-lg" // Flipped but not matched - blue
                  : "bg-[#304859] hover:bg-[#3a5a75]" // Face down - dark blue
              }
              ${
                state.grid_size === "4x4"
                  ? "text-[24px] md:text-[32px]"
                  : "text-[18px] md:text-[24px]"
              }
            `}
          >
            {getCardDisplay(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
