import { FaFootballBall } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { data } from "autoprefixer";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import NavBar from "../Shared/NavBar";

const ApiToken = data.API_TOKEN;

const UpcomingMatchLeague = ({ match }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
      <div className="bg-dark text-white p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center max-md:flex-col max-md:justify-center">
          <Link
            to={`/club/${match.homeTeam.id}/${match.competition.id}`}
            className="text-white TeamLink text-center"
          >
            <img
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              className="rounded-circle max-md:mx-auto max-md:my-2"
              style={{ width: "50px", height: "50px" }}
            />
            <p>{match.homeTeam.name}</p>
          </Link>
          <div
            className="text-center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p>{match.competition.name}</p>
            <div className="d-flex gap-5">
              <span>({match.score.fullTime.home})</span>
              <span>({match.score.fullTime.away})</span>
            </div>
            {/* إضافة معاد المباراة هنا */}
            <div className="mt-2">
              <p className="mb-0">
                {new Date(match.utcDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mb-0">
                {new Date(match.utcDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <Link
            to={`/club/${match.homeTeam.id}/${match.competition.id}`}
            className="TeamLink text-white text-center"
          >
            <img
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              className="rounded-circle max-md:mx-auto max-md:my-2"
              style={{ width: "50px", height: "50px" }}
            />
            <p>{match.awayTeam.name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const UpcomingMatchChampions = ({ match }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
      {/* <h3 className="mb-3 text-start text-white">Upcoming Champions Matches</h3> */}
      <div className="bg-dark text-white p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center max-md:flex-col max-md:justify-center">
          <Link
            to={`/club/${match.homeTeam.id}/${match.competition.id}`}
            className="TeamLink text-white text-center"
          >
            <img
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              className="rounded-circle max-md:my-2 max-md:mx-auto"
              style={{ width: "50px", height: "50px" }}
            />
            <p>{match.homeTeam.name}</p>
          </Link>
          <div
            className="text-center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p>{match.competition.name}</p>
            <div className="mt-2">
              <p className="mb-0">
                {new Date(match.utcDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mb-0">
                {new Date(match.utcDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="d-flex gap-5">
              <span>({match.score.fullTime.home})</span>
              <span>({match.score.fullTime.away})</span>
            </div>
          </div>
          <Link
            to={`/club/${match.homeTeam.id}/${match.competition.id}`}
            className="TeamLink text-white text-center"
          >
            <img
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              className="rounded-circle max-md:my-2 max-md:mx-auto"
              style={{ width: "50px", height: "50px" }}
            />
            <p>{match.awayTeam.name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ClubInfo = () => {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const response = await fetch(`/api/teams/${params.teamId}`, {
          headers: {
            "X-Auth-Token": ApiToken,
          },
        });
        const data = await response.json();
        setClub(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching club info:", error);
        setLoading(false);
      }
    };

    fetchClubInfo();
  }, [params.teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!club) {
    return <div>No club data found.</div>;
  }

  return (
    <>
      <div className="row align-items-stretch">
        {/* معلومات النادي */}
        <div className="w-full bg-dark text-center text-white p-4 d-flex flex-column justify-content-center">
          {/* صورة المدرب */}
          <div
            className="rounded-circle mx-auto mb-3 overflow-hidden"
            style={{ width: "170px", height: "170px" }}
          >
            <img
              src={club.coach?.photo || club.crest}
              alt="Coach"
              className="w-100 h-100 object-fit-cover"
            />
          </div>

          {/* اسم المدرب */}
          <span>Coash: </span>
          <h2 className="mb-3">{club.coach?.name || "No Coach Data"}</h2>
          <span>{club.coach?.nationality}</span>
          <div className="flex flex-col">
            <span>From: {club?.coach?.contract?.start}</span>
            <span>Until: {club?.coach?.contract?.until}</span>
          </div>

          {/* معلومات إضافية */}
          <div className="container d-flex gap-5 justify-content-center mb-4 px-5 mt-4">
            {/* Team Kit */}
            <div>
              <div
                className="rounded-circle border border-light d-flex align-items-center justify-content-center mb-2 bg-secondary text-white"
                style={{ width: "60px", height: "60px" }}
              >
                <FaFootballBall size={40} />
              </div>
              <p>Team Kit</p>
              <span>{club.clubColors}</span>
            </div>

            {/* تاريخ التأسيس */}
            <div>
              <div
                className="rounded-circle border border-light d-flex align-items-center justify-content-center mb-2 bg-secondary text-white"
                style={{ width: "60px", height: "60px" }}
              >
                <p className="mb-0">{club.founded || "N/A"}</p>
              </div>
              <p>Established</p>
            </div>

            {/* الموقع الرسمي */}
            <div>
              <div
                className="rounded-circle border border-light d-flex align-items-center justify-content-center mb-2 bg-secondary text-white"
                style={{ width: "60px", height: "60px" }}
              >
                <p className="mb-0 fs-1">🌐</p>
              </div>
              <a
                href={club.website || "#"} // رابط افتراضي إذا لم يكن متوفرًا
                className="text-light text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mb-4 mt-4 text-dark">
        <div className="">
          <div className="row justify-content-center">
            {/* Club Logo */}
            <div className="col-12 text-center mb-4">
              <img
                src={club.crest}
                alt="Club Logo"
                style={{ width: "auto", height: "230px", borderRadius: "10px" }}
              />
            </div>

            {/* Club Info */}
            <div
              className="col-lg-12 px-4 col-md-12"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="flex w-full justify-around max-md:flex-col max-md:justify-center">
                {/* Basic Info */}
                <div className=" mb-3 text-white">
                  <h4 className="text-primary">Club Information</h4>
                  <p>
                    <strong>Club Name:</strong> {club.name}
                  </p>
                  <p>
                    <strong>Founded:</strong> {club.founded}
                  </p>
                  <p>
                    <strong>City:</strong> {club.area.name}
                  </p>
                  <p>
                    <strong>Stadium:</strong> {club.venue}
                  </p>
                </div>

                {/* Achievements */}
                <div className=" mb-3 text-white">
                  <h4 className="text-danger">Best Champions</h4>
                  <p>
                    {club.runningCompetitions.map((champion) => {
                      return (
                        <>
                          <p>{champion.name}</p>
                        </>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const TeamSquad = () => {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const response = await fetch(`/api/teams/${params.teamId}`, {
          headers: {
            "X-Auth-Token": ApiToken,
          },
        });
        const data = await response.json();
        setClub(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching club info:", error);
        setLoading(false);
      }
    };

    fetchClubInfo();
  }, [params.teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!club) {
    return <div>No Squad data found.</div>;
  }

  return (
    <>
      <div className="px-4 mb-5">
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col" className="text-[21px]">
                  Name
                </th>
                <th scope="col" className="text-[21px]">
                  Position
                </th>
                <th scope="col" className="text-[21px]">
                  Nationality
                </th>
                <th scope="col" className="text-[21px]">
                  BirthDay
                </th>
              </tr>
            </thead>
            <tbody>
              {club?.squad?.map((player) => (
                <tr key={player.id}>
                  <th
                    scope="row"
                    className="d-flex align-items-center gap-2 text-[17px]"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <span>{player.name}</span>
                  </th>
                  <td className="text-[17px]">{player?.position || "N/A"}</td>
                  <td className="text-[17px]">
                    {player?.nationality || "N/A"}
                  </td>
                  <td className="text-[17px]">{player.dateOfBirth || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const LeagueRank = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { competitionId, teamId } = useParams();

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(
          `/api/competitions/${competitionId}/standings`,
          {
            headers: {
              "X-Auth-Token": ApiToken,
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

const ClubDetails = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `/api/teams/${params.teamId}/matches?status=SCHEDULED`,
          {
            headers: {
              "X-Auth-Token": ApiToken,
            },
          }
        );
        const data = await response.json();
        setMatches(data.matches);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [params.teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" text-light  " style={{ overflow: "hidden" }}>
      <NavBar />
      {/* Club Details */}
      <ClubInfo />

      {/* Matches Section */}
      <div className="container mb-5 mt-2">
        <div className="row mt-5">
          <h2>All Upcoming Matches</h2>
          {matches.map((match) =>
            match.competition.type === "LEAGUE" ? (
              <UpcomingMatchLeague key={match.id} match={match} />
            ) : (
              <UpcomingMatchChampions key={match.id} match={match} />
            )
          )}
        </div>
      </div>

      {/* ترتيب الدوري الإنجليزي */}
      <div className="px-4 fs-3 text-primary text-start">
        <p>Premier League Team Standings</p>
      </div>
      <LeagueRank />

      {/* Ranking of Top English Premier League Players */}
      <div className="px-4 fs-3 text-primary text-start">
        <p>Team Squad</p>
        <TeamSquad />
      </div>
    </div>
  );
};

export default ClubDetails;
