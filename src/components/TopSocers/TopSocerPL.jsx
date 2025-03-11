import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import NavBar from "../Shared/NavBar";

const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";
const TopScorers = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("PL");
  const [isLoading, setIsLoading] = useState(false);

  const leagues = [
    { code: "PL", name: "Premier League" },
    { code: "PD", name: "La Liga" },
    { code: "SA", name: "Serie A" },
    { code: "BL1", name: "Bundesliga" },
    { code: "FL1", name: "Ligue 1" },
    { code: "CL", name: "Champions League" },
  ];

  useEffect(() => {
    const fetchTopScorers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.football-data.org/v4/competitions/${selectedLeague}/scorers`,
          {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top scorers");
        }

        const data = await response.json();
        setTopScorers(data.scorers);
      } catch (error) {
        console.error("Error fetching top scorers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopScorers();
  }, [selectedLeague]);

  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <NavBar />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">
          Top Scorers -{" "}
          {leagues.find((league) => league.code === selectedLeague)?.name}
        </h2>
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="bg-[#222222] text-white rounded-lg px-3 py-2"
        >
          {leagues.map((league) => (
            <option key={league.code} value={league.code}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader color="#C3CC5A" size={40} />
        </div>
      ) : (
        <div className="space-y-4">
          {topScorers.map((scorer, index) => (
            <div
              key={scorer.player.id}
              className="flex justify-between items-center bg-[#222222] rounded-lg p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">{index + 1}</span>
                <img
                  src={scorer.team.crest}
                  alt={scorer.team.name}
                  className="w-6 h-6"
                />
                <span className="text-white text-sm">{scorer.player.name}</span>
              </div>
              <span className="text-[#C3CC5A] text-sm">
                {scorer.goals} Goals
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopScorers;
