import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaSearch } from "react-icons/fa";
import "./MatchTable.css";
import { Link, useParams } from "react-router-dom";
import NavBar from "../Shared/NavBar";
const LeaugeTable = () => {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const params = useParams();

  useEffect(() => {
    fetch(`/api/competitions/${params.id}/standings`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result?.standings?.[0]?.table || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = selectedTeam
    ? data.filter((team) => team.team?.name === selectedTeam)
    : data;

  return (
    <div className="match-container p-3">
      <NavBar />
      <div className="p-3 mt-1">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 w-100">
          <select
            className="form-select w-auto mt-2"
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">All Teams</option>
            {data.map((team, index) => (
              <option key={index} value={team.team?.name}>
                {team.team?.name || "Unknown Team"}
              </option>
            ))}
          </select>

          <dvi className="input-group w-auto mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search For Club ..."
              style={{ minWidth: "180px" }}
            />
            <span className="input-group-text">
              <FaSearch />
            </span>
          </dvi>
        </div>
      </div>

      <div className="match-header d-flex align-items-center gap-2 p-3">
        <h5 className="mb-0">{params.LeaugeName} - Standings</h5>
      </div>

      <div className="table-wrapper">
        <table className="table table-bordered text-center bg-[#303030]">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Drawn</th>
              <th>Lost</th>
              <th>Goals For</th>
              <th>Goals Against</th>
              <th>Goal Difference</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((team, index) => (
              <tr key={index}>
                <td className="text-start">{team.position}</td>
                <Link
                  to={`/club/${team.team.id}/${params.id}`}
                  className="team-name text-start matchDev"
                >
                  <img
                    src={team.team?.crest || "default-image.png"}
                    alt="Club Logo"
                    width="30"
                  />
                  <span>{team.team?.name || "Unknown"}</span>
                </Link>
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

export default LeaugeTable;
