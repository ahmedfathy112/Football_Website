import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

export const ChampionsLeauge = () => {
  const [matchesCL, setMatchesCL] = useState([]);
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/competitions/SA/matches", {
          headers: {
            "X-Auth-Token": API_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();

        // تصفية المباريات القادمة فقط
        const currentDate = new Date();
        const upcomingMatches = data.matches.filter((match) => {
          const matchDate = new Date(match.utcDate);
          return matchDate > currentDate;
        });

        setMatchesCL(upcomingMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);
  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <h2 className="text-white text-lg font-semibold mb-4">
        Seria A - Upcoming Matches
      </h2>
      <div className="space-y-4">
        {matchesCL.slice(0, 10).map((match) => (
          <Link
            to={`/match/${match.id}`}
            key={match.id}
            className="matchDev flex flex-col md:flex-row justify-between items-center bg-[#222222] rounded-lg p-3 gap-3"
          >
            <Link
              to={`/club/${match.homeTeam.id}/${match.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-[14px]">
                {match.homeTeam.name}
              </span>
            </Link>

            <span className="text-white">vs</span>

            <Link
              to={`/club/${match.awayTeam.id}/${match.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-[14px]">
                {match.awayTeam.name}
              </span>
            </Link>

            {/* تاريخ وتوقيت المباراة */}
            <div className="flex flex-col items-center">
              <span className="text-[#C3CC5A] text-sm">
                {new Date(match.utcDate).toLocaleDateString()}
              </span>
              <span className="text-[#C3CC5A] text-sm">
                {new Date(match.utcDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
