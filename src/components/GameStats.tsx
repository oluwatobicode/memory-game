import Moves from "../ui/Moves";
import Timer from "../ui/Timer";

const GameStats = () => {
  return (
    <div className="flex gap-[25px] md:gap-[30px]">
      <Timer />
      <Moves />
    </div>
  );
};

export default GameStats;
