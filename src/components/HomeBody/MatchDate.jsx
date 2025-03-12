import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

export const MatchesDate = () => {
  const [matches, setMatches] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Today");
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/matches", {
          headers: {
            "X-Auth-Token": API_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();
        setMatches(data.matches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filtered = matches.filter((match) => {
      const matchDate = new Date(match.utcDate);
      matchDate.setHours(0, 0, 0, 0);

      const dayDiff = (matchDate - today) / (1000 * 60 * 60 * 24);

      if (selectedDay === "Yesterday" && dayDiff === -1) return true;
      if (selectedDay === "Today" && dayDiff === 0) return true;
      if (selectedDay === "Tomorrow" && dayDiff === 1) return true;
      return false;
    });

    setFilteredMatches(filtered);
  }, [selectedDay, matches]);

  return (
    <>
      <h2 className="text-2xl text-white py-2 px-3 bg-[#000000] mt-5 rounded-md">
        Matches
      </h2>
      {/* أزرار الاختيار */}
      <div className="flex space-x-4 mt-4 flex-wrap md:mt-5 max-md:w-auto max-md:gap-3 max-md:flex-row max-md:justify-center">
        {["Yesterday", "Today", "Tomorrow"].map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(day)}
            className={`matchDay text-white bg-[#303030] rounded-lg px-3 py-2 ${
              selectedDay === day ? "bg-[#C3CC5A]" : ""
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-5">
        <div className="bg-[#303030] rounded-lg p-4 my-5 w-full">
          <h2 className="text-white text-lg font-semibold mb-4">
            {selectedDay}'s Matches
          </h2>
          <div className="space-y-4 w-full mt-5">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => (
                <Link
                  to={`/match/${match.id}`}
                  key={match.id}
                  className="matchDev flex flex-col md:flex-row justify-between items-center bg-[#222222] rounded-lg p-3 gap-3"
                >
                  {/* الفريق المضيف */}
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

                  {/* النتيجة أو النص "vs" */}
                  {match.status === "IN_PLAY" || match.status === "PAUSED" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">
                        {match.score.fullTime.home} -{" "}
                        {match.score.fullTime.away}
                      </span>
                      <span className="text-[#C3CC5A] text-sm">Live</span>
                    </div>
                  ) : match.status === "FINISHED" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">
                        {match.score.fullTime.home} -{" "}
                        {match.score.fullTime.away}
                      </span>
                      <span className="text-[#C3CC5A] text-sm">FT</span>
                    </div>
                  ) : (
                    <span className="text-white">vs</span>
                  )}

                  {/* الفريق الضيف */}
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
              ))
            ) : (
              <p className="text-white text-center">No matches found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
