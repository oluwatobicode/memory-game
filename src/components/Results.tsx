import { useGameContext } from "../contexts/GameProvider";

const Results = () => {
  const { state, restartGame, setUpNewGame } = useGameContext();

  // Don't render if game isn't finished
  if (state.gameStatus !== "finished") {
    return null;
  }

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
        <div className="bg-white rounded-lg flex flex-col items-center justify-center w-[327px] h-[376px] md:w-[654px] md:h-[510px] mx-4 text-center">
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
                <h2 className="md:text-[48px] text-[24px] font-bold text-[#152938] mb-2">
                  Game Over!
                </h2>
                {winner ? (
                  <p className="text-gray-600">Player {winner.player} wins!</p>
                ) : (
                  <p className="text-gray-600">It's a tie!</p>
                )}
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
                <h3 className="font-semibold text-gray-700">Final Scores:</h3>
                {state.playerScores.map((score, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span
                      className={`${
                        winner?.player === index + 1
                          ? "text-blue-600 font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      Player {index + 1}:
                    </span>
                    <span
                      className={`font-semibold ${
                        winner?.player === index + 1 ? "text-blue-600" : ""
                      }`}
                    >
                      {score} pairs
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <button
              onClick={restartGame}
              className="w-[279px] h-[48px] md:w-[264px] md:h-[52px] cursor-pointer bg-[#FDA214] text-white font-bold rounded-[26px]"
            >
              Play Again
            </button>
            <button
              onClick={setUpNewGame}
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
