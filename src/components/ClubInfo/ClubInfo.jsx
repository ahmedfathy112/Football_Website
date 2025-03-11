import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

export const ClubInfo = () => {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const response = await fetch(
          `https://api.football-data.org/v4/teams/${params.teamId}`,
          {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          }
        );
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
