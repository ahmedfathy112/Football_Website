import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const LaLiga = () => {
  const [matchesLA, setMatchesLA] = useState([]);
  const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

  // الماتشات بتاعت الدوري الاسباني
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/competitions/PD/matches", {
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

        setMatchesLA(upcomingMatches); // تحديث الحالة بالمباريات القادمة
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);
  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <h2 className="text-white text-lg font-semibold mb-4">
        LaLiga - Upcoming Matches
      </h2>
      <div className="space-y-4">
        {matchesLA.slice(0, 10).map((matchLA) => (
          <Link
            to={`/match/${matchLA.id}`}
            key={matchLA.id}
            className="matchDev flex flex-col md:flex-row justify-between items-center bg-[#222222] rounded-lg p-3 gap-3"
          >
            <Link
              to={`/club/${matchLA.homeTeam.id}/${matchLA.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={matchLA.homeTeam.crest}
                alt={matchLA.homeTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-[14px]">
                {matchLA.homeTeam.name}
              </span>
            </Link>

            <span className="text-white">vs</span>

            <Link
              to={`/club/${matchLA.awayTeam.id}/${matchLA.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={matchLA.awayTeam.crest}
                alt={matchLA.awayTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-[14px]">
                {matchLA.awayTeam.name}
              </span>
            </Link>

            {/* تاريخ وتوقيت المباراة */}
            <div className="flex flex-col items-center">
              <span className="text-[#C3CC5A] text-sm">
                {new Date(matchLA.utcDate).toLocaleDateString()}
              </span>
              <span className="text-[#C3CC5A] text-sm">
                {new Date(matchLA.utcDate).toLocaleTimeString([], {
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
