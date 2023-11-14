import { useEffect, useState } from "react";
import RestaurentData from "./RestaurentData";
import { API_DATA } from "../utils/constants";
import { Link } from "react-router-dom";
import { ShimmerUI } from "./ShimmerUI";
import useOnlineStatus from "../utils/useOnlineStatus";
import useHomeData from "../utils/useHomeData";

const Body = () => {
  const [search, setSearch] = useState("");
  const onlineStatus = useOnlineStatus();
  const { resData, filteredRes, setFilteredRes } = useHomeData();

  if (onlineStatus === false)
    return <h1>Your are offline! please check your internet connection</h1>;

  return resData.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body">
      <div className="filter-container">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredData = resData.filter(
              (item) => item.info.avgRating >= 4
            );
            setFilteredRes(filteredData);
          }}
        >
          Top Rated Restaurents
        </button>
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="search here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              const searchFilter = resData.filter((item) =>
                item.info.name.toLowerCase().includes(search.toLowerCase())
              );
              setFilteredRes(searchFilter);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="rest-container">
        {filteredRes?.map((swiggyData) => (
          <Link
            key={swiggyData.info.id}
            to={`/restaurant/${swiggyData.info.id}`}
          >
            <RestaurentData swiggyData={swiggyData} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
