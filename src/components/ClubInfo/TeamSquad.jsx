import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

export const TeamSquad = () => {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const response = await fetch(`/api/teams/${params.teamId}`, {
          headers: {
            "X-Auth-Token": API_TOKEN,
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
