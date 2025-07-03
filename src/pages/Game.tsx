import GameBoard from "../components/GameBoard";
import GameStats from "../components/GameStats";
import Navbar from "../ui/Navbar";

const Game = () => {
  return (
    <main className="min-h-screen bg-[#ffff] p-4">
      <div className="container mx-auto px-4 py-6 max-w-[1200px]">
        <Navbar />
        <GameBoard />
        <GameStats />
      </div>
    </main>
  );
};

export default Game;
