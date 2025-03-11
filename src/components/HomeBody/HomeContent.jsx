import React, { useEffect, useState } from "react";
import { HeroImageSec } from "./HeroImage";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { MatchesDate } from "./MatchDate";
const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

// كمبوننت عرض مبارات الدوري الانجليزي

export const PrimerLeauge = () => {
  const [matchesPL, setMatchesPL] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "https://api.football-data.org/v4/competitions/PL/matches",
          {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          }
        );

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

        setMatchesPL(upcomingMatches); // تحديث الحالة بالمباريات القادمة
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <h2 className="text-white text-lg font-semibold mb-4">
        Premier League - Upcoming Matches
      </h2>
      <div className="space-y-2">
        {matchesPL.slice(0, 10).map((matchPL) => (
          <Link
            to={`/match/${matchPL.id}`}
            key={matchPL.id}
            className="matchDev flex flex-col md:flex-row justify-between items-center bg-[#222222] rounded-lg p-3 gap-3"
          >
            {/* الفريق المضيف */}
            <Link
              to={`/club/${matchPL.homeTeam.id}/${matchPL.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={matchPL.homeTeam.crest}
                alt={matchPL.homeTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-sm md:text-[14px]">
                {matchPL.homeTeam.name}
              </span>
            </Link>

            {/* النص "vs" */}
            <span className="text-white text-sm md:text-[14px]">vs</span>

            {/* الفريق الضيف */}
            <Link
              to={`/club/${matchPL.awayTeam.id}/${matchPL.competition.id}`}
              className="TeamLink flex items-center gap-2"
            >
              <img
                src={matchPL.awayTeam.crest}
                alt={matchPL.awayTeam.name}
                className="w-6 h-6"
              />
              <span className="text-white text-sm md:text-[14px]">
                {matchPL.awayTeam.name}
              </span>
            </Link>

            {/* تاريخ وتوقيت المباراة */}
            <div className="flex flex-col items-center">
              <span className="text-[#C3CC5A] text-sm">
                {new Date(matchPL.utcDate).toLocaleDateString()}
              </span>
              <span className="text-[#C3CC5A] text-sm">
                {new Date(matchPL.utcDate).toLocaleTimeString([], {
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

// كمبوننت عرض مباريات الدوري الاسباني
export const LaLiga = () => {
  const [matchesLA, setMatchesLA] = useState([]);
  // الماتشات بتاعت الدوري الاسباني
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "https://api.football-data.org/v4/competitions/PD/matches",
          {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          }
        );

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

// كمبوننت عرض مباريات دوري الابطال
const ChampionsLeauge = () => {
  const [matchesCL, setMatchesCL] = useState([]);
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "https://api.football-data.org/v4/competitions/CL/matches",
          {
            headers: {
              "X-Auth-Token": API_TOKEN,
            },
          }
        );

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

        setMatchesCL(upcomingMatches); // تحديث الحالة بالمباريات القادمة
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);
  return (
    <div className="bg-[#303030] rounded-lg p-4">
      <h2 className="text-white text-lg font-semibold mb-4">
        Champions League - Upcoming Matches
      </h2>
      <div className="space-y-4">
        {matchesCL.slice(0, 10).map((match) => (
          <Link
            to={`/match/${match.id}`}
            key={match.id}
            className="matchDev flex flex-col md:flex-row justify-between items-center bg-[#222222] rounded-lg p-3 gap-3"
          >
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

            <span className="text-white">vs</span>

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
        ))}
      </div>
    </div>
  );
};

// البطولات المتاحه
const OurChampions = () => {
  const Leaugs = [
    {
      name: "Primer Leauge",
      iD: "PL",
    },
    {
      name: "Bundesliga",
      iD: "BL1",
    },
    {
      name: "UEFA Champions League",
      iD: "CL",
    },
    {
      name: " Ligue 1",
      iD: "PD",
    },
    {
      name: "Serie A",
      iD: "SA",
    },
    {
      name: "European Championship",
      iD: "EC",
    },
    {
      name: "FIFA World Cup",
      iD: "WC",
    },
  ];
  return (
    <>
      <h2 className="text-2xl text-white py-2 px-3 bg-[#000000] my-3 rounded-md">
        Our competitions
      </h2>
      <div className="flex space-x-4 mt-4 flex-wrap md:mt-5 gap-2 max-md:flex-row max-md:justify-center">
        {Leaugs.map((leauge) => (
          <Link
            to={`/LeaugeTable/${leauge.iD}/${leauge.name}`}
            key={leauge.iD}
            className="matchDay text-white bg-[#303030] rounded-lg px-3 py-2"
          >
            {leauge.name}
          </Link>
        ))}
      </div>
    </>
  );
};

// البحث داخل الموقع

const SearchFeature = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`/api/search?query=${searchQuery}`);
        if (!response.ok) throw new Error("Failed to fetch suggestions");
        const data = await response.json();
        setSuggestions(data.results || []);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery.trim()}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/details/${suggestion.id}`);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center space-x-4 w-full">
        <span className="text-white text-lg font-semibold">Live</span>
        <input
          type="text"
          placeholder="Search For Matches"
          className="bg-[#303030] text-white rounded-lg px-4 py-2 outline-none w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute bg-[#303030] text-white rounded-lg w-full mt-2 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 hover:bg-[#505050] cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const HomeContent = () => {
  return (
    <main className="grid grid-cols-12 gap-4 p-4 max-md:w-full">
      {/* Sidebar Section */}
      <div className="col-span-2 relative ">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="col-span-10 max-md:col-span-12">
        {/* Hero Image Section */}
        <HeroImageSec />

        {/* Search and Days Section */}
        <div className="flex flex-col justify-between items-center mb-6 bg-[#222222] p-3">
          {/* <SearchFeature /> */}
          <OurChampions />
          <MatchesDate />
        </div>

        {/* Matches Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#222222] p-3">
          {/* Match Group 1 champions leauge */}
          <ChampionsLeauge />

          {/* Match Group 2 LaLiga */}
          <LaLiga />
          {/* match groub 3 Primer leauge */}
          <PrimerLeauge />
        </div>
      </div>
      <div className="col-span-12 max-md:col-span-12">
        {/* <TrendingNews /> */}
      </div>
    </main>
  );
};
