/* 

memory-game logic
what I need for the context api

theme : numbers | icons
numberof players : 1 | 2 | 3 | 4 
game mode : single-player | multi-player
grid size : 4x4 | 6x6
timer : 5 mins

// start-game page
- two buttons that can be used for selecting the game theme to be either icons or numbers
- four buttons that can be used for selecting the number of players to be either 1, 2, 3 or 4s
- two buttons that can be used for selecting the game mode to be either single-player or multi-player
- two buttons that can be used for selecting the grid size to be either 4x4 or 6x6
- a start-game button that will redirect to the game page with the selected options

so it means i will have a context api that will hold the game state and the selected options from the start-game page

note that if it is 1 it is a single-player mode and if it is 2, 3 or 4 it is a multi-player mode

game-options{
theme: numbers | icons
number_of_players: 1 | 2| 3 | 4
grid_size: 4x4 | 6x6
}


maybe a game-state like this
game-state{
theme: numbers
number_of_players: 1
grid_size: 4x4
total_moves: 0
timer: 5 mins
}

// single-player mode
timer: 5 mins
total-moves

// multi-player mode
a tracker for each player that shows current-player for whoever is currently playing
a tracker for each player that shows the number of pairs made by each player
a modal that shows the winner at the end of the game with the number of pairs made by each player


// a setup-game button that returns the whole game state to default and goes back to the start page
// a restart-game button that returns the game state to default and restarts the game without going back to the start page

*/

import React, { createContext, useReducer } from "react";

interface GameState {
  timer: number;
  theme: "numbers" | "icons" | undefined;
  total_moves: number;
  grid_size: "4x4" | "6x6" | undefined;
  number_of_players: 1 | 2 | 3 | 4 | undefined;
  cards: number[];
  flippedCards: number[];
  matchedCards: number[];
  currentPlayer: number;
  playerScores: number[];
  gameStatus: "setup" | "playing" | "finished";
}

interface GameActionProps {
  state: GameState;
  setGameOptions: (options: {
    theme?: "numbers" | "icons" | undefined;
    number_of_players?: 1 | 2 | 3 | 4 | undefined;
    grid_size?: "4x4" | "6x6" | undefined;
  }) => void;
  startGame: () => void;
  setUpNewGame: () => void;
  flipCard: (cardIndex: number) => void;
  restartGame: () => void;
  matchFound: () => void;
  flipBack: () => void;
  updateTimer: () => void;
}

const initialGameState: GameState = {
  timer: 300000, // 5 minutes in milliseconds
  theme: undefined,
  total_moves: 0,
  grid_size: undefined,
  number_of_players: undefined,
  cards: [],
  flippedCards: [],
  matchedCards: [],
  currentPlayer: 0,
  playerScores: [],
  gameStatus: "setup",
};

type gameActions =
  | { type: "START_GAME" }
  | { type: "MATCH_FOUND" }
  | { type: "FLIP_CARD"; payload: { cardIndex: number } }
  | { type: "FLIP_BACK" }
  | { type: "NEXT_TURN" }
  | { type: "UPDATE_TIMER" }
  | { type: "END_GAME" }
  | { type: "RESTART_GAME" }
  | { type: "SETUP_NEW_GAME" }
  | {
      type: "SET_GAME_OPTIONS";
      payload: {
        theme?: "numbers" | "icons";
        number_of_players?: 1 | 2 | 3 | 4;
        grid_size?: "4x4" | "6x6";
      };
    };

const gameReducer = (state: GameState, action: gameActions): GameState => {
  switch (action.type) {
    case "SET_GAME_OPTIONS":
      return {
        ...state,
        theme: action.payload.theme || state.theme,
        number_of_players:
          action.payload.number_of_players || state.number_of_players,
        grid_size: action.payload.grid_size || state.grid_size,
        gameStatus: "setup",
      };
    case "START_GAME":
      let cards: number[] = [];
      if (state.grid_size === "4x4") {
        cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
      } else if (state.grid_size === "6x6") {
        cards = [
          1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
          12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
        ];
      }

      const shuffledCards = [...cards];
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [
          shuffledCards[j],
          shuffledCards[i],
        ];
      }
      const playerScores = new Array(state.number_of_players || 1).fill(0);
      return {
        ...state,
        cards: shuffledCards,
        timer: 300000, //  5 minutes
        total_moves: 0,
        flippedCards: [],
        matchedCards: [],
        currentPlayer: 0,
        playerScores,
        gameStatus: "playing",
      };

    case "FLIP_CARD":
      const cardIndex = action.payload.cardIndex;

      if (
        state.flippedCards.includes(cardIndex) ||
        state.matchedCards.includes(cardIndex) ||
        state.flippedCards.length >= 2 ||
        cardIndex < 0 ||
        cardIndex >= state.cards.length
      ) {
        return state;
      }

      const newFlippedCards = [...state.flippedCards, cardIndex];

      return {
        ...state,
        flippedCards: newFlippedCards,
        total_moves:
          newFlippedCards.length === 2
            ? state.total_moves + 1
            : state.total_moves,
      };

    case "FLIP_BACK":
      const nextPlayer =
        state.number_of_players === 1 || state.number_of_players === undefined
          ? state.currentPlayer
          : (state.currentPlayer + 1) % state.number_of_players;

      return {
        ...state,
        flippedCards: [],
        currentPlayer: nextPlayer,
      };

    case "NEXT_TURN":
      if (
        state.number_of_players === 1 ||
        state.number_of_players === undefined
      )
        return state;

      return {
        ...state,
        currentPlayer: (state.currentPlayer + 1) % state.number_of_players,
      };

    case "MATCH_FOUND":
      const [firstCard, secondCard] = state.flippedCards;
      const newPlayerScores = [...state.playerScores];
      newPlayerScores[state.currentPlayer]++;

      const newMatchedCards = [...state.matchedCards, firstCard, secondCard];

      const totalPairs = state.grid_size === "4x4" ? 8 : 18;
      const isGameComplete = newMatchedCards.length === totalPairs * 2;

      return {
        ...state,
        flippedCards: [],
        matchedCards: newMatchedCards,
        playerScores: newPlayerScores,
        gameStatus: isGameComplete ? "finished" : "playing",
      };

    case "UPDATE_TIMER":
      const newTimer = Math.max(0, state.timer - 1000);

      return {
        ...state,
        timer: newTimer,
        gameStatus:
          newTimer === 0 && state.number_of_players === 1
            ? "finished"
            : state.gameStatus,
      };

    case "END_GAME":
      return {
        ...state,
        gameStatus: "finished",
      };

    case "RESTART_GAME":
      let resetCards: number[] = [];
      if (state.grid_size === "4x4") {
        resetCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
      } else if (state.grid_size === "6x6") {
        resetCards = [
          1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
          12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
        ];
      }

      const resetShuffledCards = [...resetCards];
      for (let i = resetShuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resetShuffledCards[i], resetShuffledCards[j]] = [
          resetShuffledCards[j],
          resetShuffledCards[i],
        ];
      }

      const restartPlayerScores = new Array(state.number_of_players || 1).fill(
        0
      );
      return {
        ...state,
        cards: resetShuffledCards,
        timer: 300000,
        total_moves: 0,
        flippedCards: [],
        matchedCards: [],
        currentPlayer: 0,
        playerScores: restartPlayerScores,
        gameStatus: "playing",
      };

    case "SETUP_NEW_GAME":
      return {
        ...initialGameState,
      };

    default:
      return state;
  }
};

const GameContext = createContext<GameActionProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const value: GameActionProps = {
    state,

    // this helps set game options during the game setup
    setGameOptions: (options) => {
      dispatch({
        type: "SET_GAME_OPTIONS",
        payload: options,
      });
    },

    startGame: () => {
      dispatch({ type: "START_GAME" });
    },

    setUpNewGame: () => {
      dispatch({ type: "SETUP_NEW_GAME" });
    },

    flipCard: (cardIndex) => {
      dispatch({
        type: "FLIP_CARD",
        payload: { cardIndex },
      });
    },

    matchFound: () => {
      dispatch({ type: "MATCH_FOUND" });
    },

    flipBack: () => {
      dispatch({ type: "FLIP_BACK" });
    },

    restartGame: () => {
      dispatch({ type: "RESTART_GAME" });
    },

    updateTimer: () => {
      dispatch({ type: "UPDATE_TIMER" });
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
};

export default GameProvider;
