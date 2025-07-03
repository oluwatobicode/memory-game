import { useGameContext } from "../contexts/GameProvider";

const Moves = () => {
  const { state } = useGameContext();
  return (
    <div className="w-[151px] h-[70px] md:w-[255px] md:h-[72px] bg-[#DFE7EC] rounded-[10px] flex flex-col md:flex-row items-center md:justify-between p-2 md:p-5">
      <h1 className="text-[15px] md:text-[18px] font-bold text-[#7191A5]">
        Moves
      </h1>
      <h1 className="text-[24px] md:text-[32px] text-[#304859] font-bold">
        {state.matchedCards.length}
      </h1>
    </div>
  );
};

export default Moves;
