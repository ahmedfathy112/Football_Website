import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PrimerLeauge = () => {
  const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";
  const [matchesPL, setMatchesPL] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/competitions/PL/matches", {
          headers: {
            "X-Auth-Token": API_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();

        // تصفية المباريات القادمة فقط
        const currentDate = new Date(); // التاريخ الحالي
        const upcomingMatches = data.matches.filter((match) => {
          const matchDate = new Date(match.utcDate);
          return matchDate > currentDate; // المباريات التي لم يتم لعبها بعد
        });

        setMatchesPL(upcomingMatches); // تحديث الحالة بالمباريات القادمة
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <h2 className="text-white text-lg font-semibold mb-4">
        Premier League - Upcoming Matches
      </h2>
      <div className="space-y-2">
        {matchesPL.slice(0, 10).map((matchPL) => (
          <Link
            to={`/match/${matchPL.id}`}
            key={matchPL.id}
            className="matchDev flex flex-col md:flex-row justify-between items-center bg-[#222222] rounded-lg p-3 gap-3"
          >
            {/* الفريق المضيف */}
            <Link
              to={`/club/${matchPL.homeTeam.id}/${matchPL.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={matchPL.homeTeam.crest}
                alt={matchPL.homeTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-sm md:text-[14px]">
                {matchPL.homeTeam.name}
              </span>
            </Link>

            {/* النص "vs" */}
            <span className="text-white text-sm md:text-[14px]">vs</span>

            {/* الفريق الضيف */}
            <Link
              to={`/club/${matchPL.awayTeam.id}/${matchPL.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={matchPL.awayTeam.crest}
                alt={matchPL.awayTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-sm md:text-[14px]">
                {matchPL.awayTeam.name}
              </span>
            </Link>

            {/* تاريخ وتوقيت المباراة */}
            <div className="flex flex-col items-center">
              <span className="text-[#C3CC5A] text-sm">
                {new Date(matchPL.utcDate).toLocaleDateString()}
              </span>
              <span className="text-[#C3CC5A] text-sm">
                {new Date(matchPL.utcDate).toLocaleTimeString([], {
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
