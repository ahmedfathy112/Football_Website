import React, { useEffect, useState } from "react";

const PlayerDetails = ({ playerId }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      const url = `https://transfermarkt-db.p.rapidapi.com/v1/players/info?locale=DE&player_id=${playerId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1f1bc75f47msh073bd64ecaec5afp178778jsn58c2da401a72",
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setPlayer(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{player.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={player.image}
              alt={player.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg">
              <span className="font-semibold">Position:</span> {player.position}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Age:</span> {player.age}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Nationality:</span>{" "}
              {player.nationality}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Club:</span> {player.club}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Market Value:</span>{" "}
              {player.marketValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
