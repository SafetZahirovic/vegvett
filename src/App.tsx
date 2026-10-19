import { Board } from "./scene/Board";
import { useGame } from "./state/store";
import { ExamResult } from "./ui/ExamResult";
import { GuidePanel } from "./ui/GuidePanel";
import { Hud } from "./ui/Hud";
import { InspectPanel } from "./ui/InspectPanel";
import { Learn } from "./ui/Learn";
import { Menu } from "./ui/Menu";
import { SignCatalog } from "./ui/SignCatalog";
import { QuestionPanel } from "./ui/QuestionPanel";
import { RoundResult } from "./ui/RoundResult";
import { Stats } from "./ui/Stats";

export function App() {
  const screen = useGame((s) => s.screen);
  const mode = useGame((s) => s.mode);
  return (
    <div className="app">
      <Board />
      {screen === "play" && (
        <>
          <Hud />
          {mode === "guide" ? <GuidePanel /> : <QuestionPanel />}
          <InspectPanel />
        </>
      )}
      {screen === "menu" && <Menu />}
      {screen === "stats" && <Stats />}
      {screen === "result" && (mode === "prove" ? <ExamResult /> : <RoundResult />)}
      {screen === "signs" && <SignCatalog />}
      {screen === "learn" && <Learn />}
    </div>
  );
}
