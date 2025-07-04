import { useNavigate } from "react-router";
import { useGameContext } from "../contexts/GameProvider";

const Results = () => {
  const navigate = useNavigate();
  const { state, restartGame, setUpNewGame } = useGameContext();
  // Don't render if game isn't finished
  if (state.gameStatus !== "finished") {
    return null;
  }

  const handleRestart = () => {
    restartGame();
  };

  const handleNewGame = () => {
    setUpNewGame();
    navigate("/");
  };

  // Calculate time spent (5 minutes = 300000ms)
  const timeSpent = 300000 - state.timer;
  const minutes = Math.floor(timeSpent / 60000);
  const seconds = Math.floor((timeSpent % 60000) / 1000);

  // Check if game was completed successfully
  const totalPairs = state.grid_size === "4x4" ? 8 : 18;
  const gameCompleted = state.matchedCards.length === totalPairs * 2;

  // For single player
  const isSinglePlayer = state.number_of_players === 1;

  // For multiplayer - find winner
  const getWinner = () => {
    if (isSinglePlayer) return null;

    const maxScore = Math.max(...state.playerScores);
    const winners = state.playerScores
      .map((score, index) => ({ player: index + 1, score }))
      .filter((p) => p.score === maxScore);

    return winners.length === 1 ? winners[0] : null;
  };

  const winner = getWinner();

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white rounded-[20px] flex flex-col items-center justify-center w-[327px] h-[488px] md:w-[654px] md:h-[580px] mx-4 text-center">
          <div className="mb-6">
            {isSinglePlayer ? (
              gameCompleted ? (
                <div>
                  <h2 className="md:text-[48px] text-[24px] font-bold text-[#152938] mb-2">
                    You did it!
                  </h2>
                  <p className="text-[#7191A5] text-[14px] md:text-[18px]">
                    Game over! Here’s how you got on…
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-[18px] font-bold text-[#7191A5] mb-2">
                    Time Elapsed
                  </h2>
                  <p className="text-gray-600">Better luck next time!</p>
                </div>
              )
            ) : (
              <div>
                {winner ? (
                  <h1 className="text-[24px] font-bold text-[#152938] md:text-[48px]">
                    Player {winner.player} wins!
                  </h1>
                ) : (
                  <p className="text-[24px] font-bold text-[#152938] md:text-[48px]">
                    It's a tie!
                  </p>
                )}

                <p className="md:text-[18px] text-[14px] font-bold text-[#7191A5] mb-2">
                  Game over! Here are the results…
                </p>
              </div>
            )}
          </div>

          <div className="mb-6 space-y-5">
            {isSinglePlayer && (
              <>
                <div className="flex justify-between items-center bg-[#DFE7EC] p-2 rounded-[10px] w-[279px] h-[48px] md:w-[542px] md:h-[72px]">
                  <span className="text-[#7191A5] font-bold text-[13px] md:text-[18px]">
                    Time Spent:
                  </span>
                  <span className="font-bold text-[#304859] text-[20px] md:text-[32px]">
                    {minutes}:{seconds.toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-[#DFE7EC] p-2 rounded-[10px] w-[279px] h-[48px] md:w-[542px] md:h-[72px]">
                  <span className="text-[#7191A5] font-bold text-[13px] md:text-[18px]">
                    Moves Taken:
                  </span>
                  <span className="font-bold text-[#304859] text-[20px] md:text-[32px]">
                    {state.total_moves} Moves
                  </span>
                </div>
              </>
            )}

            {!isSinglePlayer && (
              <div className="space-y-2">
                {state.playerScores.map((score, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center rounded-[5px] p-5 w-[279px] md:w-[542px] h-[48px] md:h-[72px] ${
                      winner?.player === index + 1
                        ? `bg-[#152938]  text-[#fff]`
                        : `bg-[#DFE7EC] text-[#7191A5]`
                    }`}
                  >
                    <span className="font-bold text-[13px] md:text-[18px]">
                      Player {index + 1}{" "}
                      {winner?.player === index + 1 ? "(Winner!)" : ""}
                    </span>
                    <span className="font-bold text-[20px] md:text-[32px]">
                      {score} Pairs
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="w-[279px] h-[48px] md:w-[264px] md:h-[52px] cursor-pointer bg-[#FDA214] text-white font-bold rounded-[26px]"
            >
              Play Again
            </button>
            <button
              onClick={handleNewGame}
              className="w-[279px] h-[48px] md:w-[264px] md:h-[52px] cursor-pointer bg-[#DFE7EC] text-[#304859] font-bold rounded-[26px]"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
