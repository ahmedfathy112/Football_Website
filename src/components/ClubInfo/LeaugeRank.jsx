import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

export const LeagueRank = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { competitionId, teamId } = useParams();

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(
          `https://api.football-data.org/v4/competitions/${competitionId}/standings`,
          {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          }
        );
        const data = await response.json();
        setStandings(data.standings[0]?.table || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching standings:", error);
        setLoading(false);
      }
    };

    fetchStandings();
  }, [competitionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!standings.length) {
    return <div>No standings data found.</div>;
  }

  const teamStanding = standings.find(
    (team) => team.team.id === parseInt(teamId)
  );

  if (!teamStanding) {
    return <div>No data found for the selected team.</div>;
  }

  return (
    <div className="px-4 mb-5">
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Team</th>
              <th scope="col">Played</th>
              <th scope="col">Won</th>
              <th scope="col">Draw</th>
              <th scope="col">Lost</th>
              <th scope="col">Goals For</th>
              <th scope="col">Goals Against</th>
              <th scope="col">Goal Difference</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.team.id}>
                <td>{team.position}</td>
                <td className="team-name text-start">
                  <img
                    src={team.team.crest}
                    alt={team.team.name}
                    width="30"
                    height="30"
                    className="me-2"
                  />
                  <span>{team.team.name}</span>
                </td>
                <td>{team.playedGames}</td>
                <td>{team.won}</td>
                <td>{team.draw}</td>
                <td>{team.lost}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.goalDifference}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
