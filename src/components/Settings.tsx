import { useState } from "react";
import { useGameContext } from "../contexts/GameProvider";
import { useNavigate } from "react-router";

const Settings = () => {
  const navigate = useNavigate();
  const { setGameOptions, state, startGame } = useGameContext();

  const [tempSettings, setTempSettings] = useState<{
    theme: "numbers" | "icons" | undefined;
    number_of_players: 1 | 2 | 3 | 4 | undefined;
    grid_size: "4x4" | "6x6" | undefined;
  }>({
    theme: undefined,
    number_of_players: undefined,
    grid_size: undefined,
  });

  const isFormValid = () => {
    return (
      tempSettings.theme !== undefined &&
      tempSettings.number_of_players !== undefined &&
      tempSettings.grid_size !== undefined
    );
  };

  const handleGameOptions = (settings: typeof tempSettings) => {
    if (!isFormValid()) {
      alert("Please select all options before starting the game!");
    }

    setGameOptions({
      theme: settings.theme,
      number_of_players: settings.number_of_players,
      grid_size: settings.grid_size,
    });
    startGame();
    console.log(state);
    navigate("/game");
  };

  return (
    <div className="bg-white w-[327px] h-[386px] md:w-[654px] md:h-[459px] rounded-[20px] flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center w-full mb-0">
        <div className="">
          <p className="text-[#7191A5] font-bold text-bold">Select Theme</p>
          <div className="flex flex-row gap-[11px] md:gap-[30px] mt-1">
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, theme: "numbers" }))
              }
              className={`w-[134px] h-[40px] md:w-[256px] text-[16px] md:text-[26px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.theme === "numbers"
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              Numbers
            </button>
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, theme: "icons" }))
              }
              className={`w-[134px] h-[40px] md:w-[256px] text-[16px] md:text-[26px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.theme === "icons"
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              Icons
            </button>
          </div>
        </div>

        <div className="mt-[32px]">
          <p className="text-[#7191A5] font-bold text-bold ">
            Number of Players
          </p>
          <div className="flex flex-row gap-[11px] md:gap-[30px] mt-1">
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, number_of_players: 1 }))
              }
              className={`w-[62px] h-[40px] text-[16px] md:text-[26px] md:w-[119px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.number_of_players === 1
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              1
            </button>
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, number_of_players: 2 }))
              }
              className={`w-[62px] h-[40px] text-[16px] md:text-[26px] md:w-[119px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.number_of_players === 2
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              2
            </button>
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, number_of_players: 3 }))
              }
              className={`w-[62px] h-[40px] text-[16px] md:text-[26px] md:w-[119px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.number_of_players === 3
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              3
            </button>
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, number_of_players: 4 }))
              }
              className={`w-[62px] h-[40px] text-[16px] md:text-[26px] md:w-[119px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.number_of_players === 4
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              4
            </button>
          </div>
        </div>

        <div className="mt-[32px]">
          <p className="text-[#7191A5] font-bold text-bold">Select Grid</p>
          <div className="flex flex-row gap-[11px] md:gap-[30px] mt-1">
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, grid_size: "4x4" }))
              }
              className={`w-[134px] h-[40px] text-[16px] md:text-[26px] md:w-[256px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.grid_size === "4x4"
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              4x4
            </button>
            <button
              onClick={() =>
                setTempSettings((prev) => ({ ...prev, grid_size: "6x6" }))
              }
              className={`w-[134px] h-[40px] text-[16px] md:text-[26px] md:w-[256px] md:h-[52px] rounded-[52px] cursor-pointer font-bold hover:bg-[#6395B8] ${
                tempSettings.grid_size === "6x6"
                  ? "bg-[#304859] text-[#FCFCFC]"
                  : "bg-[#BCCED9] text-[#FCFCFC]"
              }`}
            >
              6x6
            </button>
          </div>
        </div>

        <button
          disabled={!isFormValid()}
          onClick={() => handleGameOptions(tempSettings)}
          className={`w-[279px] h-[48px] text-[18px] mt-[32px] md:w-[541px] md:h-[70px] rounded-[35px] font-bold md:text-[32px] ${
            isFormValid()
              ? "bg-[#FDA214] text-[#FCFCFC] hover:bg-[#e8910f] cursor-pointer"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Settings;
