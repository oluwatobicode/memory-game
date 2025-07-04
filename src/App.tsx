import { BrowserRouter, Route, Routes } from "react-router";
import Start from "./pages/Start";
import Game from "./pages/Game";
import GameProvider from "./contexts/GameProvider";
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <GameProvider>
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
