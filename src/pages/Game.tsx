import { useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GameStats from "../components/GameStats";
import Navbar from "../ui/Navbar";
import { useGameContext } from "../contexts/GameProvider";
import Results from "../components/Results";
import MultiPlayerStats from "../components/MultiPlayerStats";

const useGameTime = () => {
  const { state, updateTimer } = useGameContext();

  useEffect(() => {
    let interval: number;

    if (state.gameStatus === "playing" && state.number_of_players === 1) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.gameStatus, state.number_of_players]);
};

const Game = () => {
  useGameTime();

  return (
    <main className="min-h-screen bg-[#ffff] p-4">
      <div className="container mx-auto px-4 py-6 max-w-[1200px]">
        <Navbar />
        <div className="flex flex-col items-center">
          <GameBoard />
          <GameStats />
          <MultiPlayerStats />
        </div>
        <Results />
      </div>
    </main>
  );
};

export default Game;
