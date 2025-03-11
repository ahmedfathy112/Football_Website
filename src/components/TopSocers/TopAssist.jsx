import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import NavBar from "../Shared/NavBar";

const apiKey = data.API_TOKEN;

const TopAssists = () => {
  const [topAssists, setTopAssists] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("PL");
  const [isLoading, setIsLoading] = useState(false);
  const [leagues, setLeagues] = useState([
    { code: "PL", name: "Premier League" },
    { code: "BL1", name: "Bundesliga" },
    { code: "SA", name: "Serie A" },
    { code: "PD", name: "La Liga" },
    { code: "FL1", name: "Ligue 1" },
    { code: "CL", name: "Champions League" },
  ]);

  useEffect(() => {
    const fetchTopAssists = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/competitions/${selectedLeague}/scorers`,
          {
            method: "GET",
            headers: {
              "X-Auth-Token": apiKey,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch top assists");

        const data = await response.json();
        const sortedAssists = (data.scorers || []).sort(
          (a, b) => b.assists - a.assists
        );
        setTopAssists(sortedAssists);
      } catch (error) {
        console.error("Error fetching top assists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopAssists();
  }, [selectedLeague]);

  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <NavBar />
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-white text-lg font-semibold">
          Top Assists -{" "}
          {leagues.find((league) => league.code === selectedLeague)?.name ||
            "Loading..."}
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
          {topAssists.length > 0 ? (
            topAssists.map((player, index) => (
              <div
                key={player.player.id}
                className="flex justify-between items-center bg-[#222222] rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">{index + 1}</span>
                  <img
                    src={player.team.crest || "https://via.placeholder.com/50"}
                    alt={player.team.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-white text-sm">
                    {player.player.name}
                  </span>
                </div>
                <span className="text-[#C3CC5A] text-sm">
                  {player.assists || 0} Assists
                </span>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopAssists;
