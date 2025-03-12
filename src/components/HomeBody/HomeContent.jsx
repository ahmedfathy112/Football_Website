import React, { useEffect, useState } from "react";
import { HeroImageSec } from "./HeroImage";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { MatchesDate } from "./MatchDate";
import { ChampionsLeauge } from "./ChampionsMatchs";
import { LaLiga } from "./LaligaMatchs";
import { PrimerLeauge } from "./PrimerMatchs";
const API_TOKEN = "6a31cc8761ba4eaa84e25bc8c960a181";

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
          {/* Match champions leauge */}
          <ChampionsLeauge />

          {/* Match LaLiga */}
          <LaLiga />
          {/* match Primer leauge */}
          <PrimerLeauge />
        </div>
      </div>
      <div className="col-span-12 max-md:col-span-12">
        {/* <TrendingNews /> */}
      </div>
    </main>
  );
};
