import { FaFootballBall } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import NavBar from "../Shared/NavBar";
import { ClubInfo } from "./ClubInfo";
import { TeamSquad } from "./TeamSquad";
import { LeagueRank } from "./LeaugeRank";

const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

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

const ClubDetails = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `https://api.football-data.org/v4/teams/${params.teamId}/matches?status=SCHEDULED`,
          {
            headers: {
              "X-Auth-Token": API_TOKEN,
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
