import { useState } from "react";
import { useGameContext } from "../contexts/GameProvider";

const Navbar = () => {
  const { setUpNewGame, restartGame } = useGameContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRestart = () => {
    restartGame();
    setIsMenuOpen(false);
  };

  const handleNewGame = () => {
    setUpNewGame();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="flex max-w-[1200px] mt-2 px-4 md:px-6">
        <div className="flex flex-row w-full items-center">
          <div className="flex items-center">
            <img src="../logo.svg" className="mr-4" alt="memory-game-logo" />
          </div>

          {/* Desktop buttons - hidden on mobile */}
          <div className="hidden md:flex flex-row gap-[16px] ml-auto">
            <button
              onClick={handleRestart}
              className="bg-[#FDA214] text-[#fff] w-[127px] h-[52px] text-[20px] rounded-[26px] font-bold hover:bg-[#e8910f] transition-colors"
            >
              Restart
            </button>
            <button
              onClick={handleNewGame}
              className="bg-[#DFE7EC] text-[#304859] w-[149px] h-[52px] text-[20px] rounded-[26px] font-bold hover:bg-[#c5d4df] transition-colors"
            >
              New Game
            </button>
          </div>

          {/* Mobile menu button - shown only on mobile */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="bg-[#FDA214] text-[#fff] w-[78px] h-[40px] text-[16px] rounded-[20px] font-bold hover:bg-[#e8910f] transition-colors flex items-center justify-center"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden">
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-[20px] shadow-2xl mx-4 w-full max-w-[327px] h-[224px] p-6">
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleRestart}
                className="bg-[#FDA214] text-[#fff] w-[279px] h-[48px] text-[16px] rounded-[26px] font-bold hover:bg-[#e8910f] transition-colors"
              >
                Restart
              </button>

              <button
                onClick={handleNewGame}
                className="bg-[#DFE7EC] text-[#304859] w-[279px] h-[48px] text-[16px] rounded-[26px] font-bold hover:bg-[#c5d4df] transition-colors"
              >
                New Game
              </button>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-gray-200 text-[#304859] w-[279px] h-[48px] text-[18px] rounded-[26px] font-bold hover:bg-gray-300 transition-colors mt-2"
              >
                Resume Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
