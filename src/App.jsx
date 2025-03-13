import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/HomeBody/Home";
import LeaugeTable from "./components/TableLeauge/LaLiga";
import TopScorers from "./components/TopSocers/TopSocerPL";
import TopAssists from "./components/TopSocers/TopAssist";
import ClubDetails from "./components/ClubInfo/ClubDetails";
import MatchDetails from "./components/Match/MatchDetails";
import { Analytics } from "@vercel/analytics/react";

function App() {
  // console.log(process.env.API_TOKEN);
  return (
    <>
      <div className="min-h-dvh bg-[#303030]">
        <main className="">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/LeaugeTable/:id/:LeaugeName"
              element={<LeaugeTable />}
            ></Route>
            <Route path="/topSocer" element={<TopScorers />}></Route>
            <Route path="/TopAssists" element={<TopAssists />}></Route>
            <Route
              path="/club/:teamId/:competitionId"
              element={<ClubDetails />}
            />
            <Route path="/match/:matchId" element={<MatchDetails />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
