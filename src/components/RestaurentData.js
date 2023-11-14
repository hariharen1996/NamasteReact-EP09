import React from "react";
import { CDN_URL } from "../utils/constants";

const RestaurentData = ({ swiggyData }) => {
  const {
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    deliveryTime,
    avgRating,
  } = swiggyData?.info;
  return (
    <div className="card">
      <img src={CDN_URL + cloudinaryImageId} alt={name} className="res-logo" />
      <h3>{name}</h3>
      <p>{cuisines.join(", ")}</p>
      <p>DeliveryTime: {deliveryTime}</p>
      <p>{costForTwo}</p>
      <p>Average Rating:{avgRating}</p>
    </div>
  );
};

export default RestaurentData;
