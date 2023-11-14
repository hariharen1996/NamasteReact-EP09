import { useEffect, useState } from "react";
import { API_DATA } from "./constants";

const useHomeData = () => {
  const [resData, setResData] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_DATA);
      const data = await response.json();
      const modifieddata = data?.data?.cards;
      const rest_id = "restaurant_grid_listing";
      for (let arr of modifieddata) {
        if (arr.card.card.id === rest_id) {
          const responseData =
            arr?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          setResData(responseData);
          setFilteredRes(responseData);
        }
      }
      console.log(modifieddata);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(resData);

  return { resData, filteredRes, setFilteredRes };
};

export default useHomeData;
