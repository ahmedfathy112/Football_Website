import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../Shared/NavBar";

const apiToken = data.API_TOKEN;
const MatchDetails = ({ matchId }) => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [goals, setGoals] = useState([]);
  const [headToHead, setHeadToHead] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`/api/matches/${params.matchId}`, {
          headers: { "X-Auth-Token": apiToken },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setMatch(data);

        if (data.status === "IN_PLAY" || data.status === "PAUSED") {
          setElapsedTime(data.minute);
        }

        setGoals(data.goals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [params.matchId]);

  useEffect(() => {
    const fetchHeadToHead = async () => {
      try {
        const response = await fetch(
          `/api/matches/${params.matchId}/head2head?limit=50`,
          {
            headers: { "X-Auth-Token": apiToken },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch head-to-head data");
        const data = await response.json();
        setHeadToHead(data.matches || []);
      } catch (err) {
        console.error("Error fetching head-to-head data:", err);
      }
    };

    fetchHeadToHead();
  }, [matchId]);

  useEffect(() => {
    if (match?.status === "IN_PLAY") {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [match]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <NavBar />
      {/* Header */}
      <div>
        <div className="flex justify-between items-center border-b pb-4">
          <img
            src={match.competition.emblem}
            alt="League Logo"
            className="w-16"
          />
          <h1 className="text-2xl font-bold">{match.competition.name}</h1>
          <img src={match.area.flag} alt="Country Flag" className="w-10" />
        </div>
        {/* Match Info */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">
            Matchday {match.matchday} - {match.venue}
          </h2>
          <p className="text-gray-400">
            {new Date(match.utcDate).toLocaleString()}
          </p>
          <p className="text-gray-400">Attendance: {match.attendance}</p>
          {match.status === "IN_PLAY" && (
            <p className="text-green-400 text-lg font-bold">
              Live: {elapsedTime}'
            </p>
          )}
        </div>
        {/* Teams */}
        <div className="flex justify-between items-center mt-8 max-md:flex-col max-md:gap-3">
          <Link
            to={`/club/${match.homeTeam.id}/${match.competition.id}`}
            className="text-center matchDev text-white"
          >
            <img
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              className="w-20 mx-auto"
            />
            <h3 className="text-lg font-bold">{match.homeTeam.name}</h3>
          </Link>
          <span className="text-3xl font-bold">
            {match.status === "FINISHED"
              ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
              : "VS"}
          </span>
          <Link
            to={`/club/${match.awayTeam.id}/${match.competition.id}`}
            className="text-center matchDev text-white"
          >
            <img
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              className="w-20 mx-auto"
            />
            <h3 className="text-lg font-bold">{match.awayTeam.name}</h3>
          </Link>
        </div>
        {/* Head-to-Head Matches */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Previous Encounters
          </h2>
          {headToHead.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {headToHead.map((match, index) => (
                <Link
                  to={`/match/${match.id}`}
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg matchDev text-white"
                >
                  <h3 className="text-lg font-bold text-center">
                    {match.homeTeam.name}{" "}
                    <span className="p-2 rounded-lg block">
                      {match.score.fullTime.home} -{match.score.fullTime.away}
                    </span>
                    {match.awayTeam.name}
                  </h3>
                  <p className="text-gray-400 text-center">
                    Venue: {match.venue}
                  </p>
                  {match.scorers && match.scorers.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold">Goals:</h4>
                      <ul className="text-sm text-gray-300 list-disc pl-4">
                        {match.scorers.map((scorer, i) => (
                          <li key={i}>
                            {scorer.minute}' - {scorer.player.name} (
                            {scorer.team.name})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No previous matches found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
