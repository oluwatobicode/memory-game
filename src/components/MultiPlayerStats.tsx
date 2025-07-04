import { useGameContext } from "../contexts/GameProvider";

const MultiPlayerStats = () => {
  const { state } = useGameContext();
  console.log(state);

  if (state.number_of_players === 1) return null;

  const currPlayerScores = state.playerScores.map((score, index) => ({
    player: index + 1,
    score,
  }));

  const whoPlayers = currPlayerScores;

  const currPlayer = state.currentPlayer + 1;

  return (
    <div className="flex flex-row gap-[25px]">
      {whoPlayers.map((el, i) => (
        <div className="flex flex-col">
          <div
            key={i}
            className={`w-[64px] h-[70px] md:w-[255px] md:h-[72px] flex flex-col md:flex-row items-center justify-between p-3 rounded-[10px] ${
              currPlayer === i + 1
                ? `bg-[#FDA214] text-[#fff]`
                : `bg-[#DFE7EC] text-[#7191A5]`
            }`}
          >
            <span className="text-[15px] md:text-[18px] font-bold md:inline hidden">
              Player {el.player}
            </span>
            <span className="text-[15px] md:text-[18px] font-bold inline md:hidden">
              P{el.player}
            </span>
            <p
              className={`text-[24px] md:text-[32px] font-bold ${
                currPlayer === i + 1 ? `text-[#ffff]` : `text-[#304859]`
              }`}
            >
              {el.score}
            </p>
          </div>
          <p className="text-center mt-2 text-[13px] text-[#152938] font-bold md:inline hidden">
            {currPlayer === i + 1 ? "CURRENT TURN" : ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MultiPlayerStats;

/* 
if it is player it should not render
if it is more than one player it should render 
if is 2 players the score board for 3 and 4 should not render
if it is 3 players the score board for 4 should not render
if it is 4 players the score board should all render
the points gotten here are based on the number of pairs made sucessfully

map all the numbers of players with a score

*/
