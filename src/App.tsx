import { Board } from "./scene/Board";
import { useGame } from "./state/store";
import { ExamResult } from "./ui/ExamResult";
import { Hud } from "./ui/Hud";
import { InspectPanel } from "./ui/InspectPanel";
import { Menu } from "./ui/Menu";
import { QuestionPanel } from "./ui/QuestionPanel";
import { Stats } from "./ui/Stats";

export function App() {
  const screen = useGame((s) => s.screen);
  return (
    <div className="app">
      <Board />
      {screen === "play" && (
        <>
          <Hud />
          <QuestionPanel />
          <InspectPanel />
        </>
      )}
      {screen === "menu" && <Menu />}
      {screen === "stats" && <Stats />}
      {screen === "result" && <ExamResult />}
    </div>
  );
}
