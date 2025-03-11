import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export const TrendingNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const url =
        "https://transfermarkt-db.p.rapidapi.com/v1/news/list?date=2024-08-13%2008%3A21%3A20&locale=DE";
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
        setNewsItems(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 bg-[#222222] rounded-xl">
      <h2 className="text-white text-2xl font-bold mb-6 border-b-2 border-[#C3CC5A] pb-2">
        Latest News
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {newsItems.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="bg-[#303030] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#C3CC5A] text-sm">
                    {news.timestamp}
                  </span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {news.excerpt}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
