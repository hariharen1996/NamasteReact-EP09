import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import { MenuShimmer } from "./ShimmerUI";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const [show, setShow] = useState(false);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const onChange = () => {
    setShow(!show);
  };

  if (resInfo.data === null) {
    return <MenuShimmer />;
  }

  const { name, cuisines, avgRating, sla, areaName, totalRatingsString } =
    resInfo.data;

  const offers = resInfo.data.aggregatedDiscountInfo.descriptionList;

  const menuFilter = () => {
    if (show) {
      return resInfo.menuItems.filter(
        (item) => item.itemAttribute.vegClassifier === "VEG"
      );
    } else {
      return resInfo.menuItems.filter((item) => item);
    }
  };

  return (
    <div className="menu-container">
      <div className="container">
        <div className="text-container">
          <div>
            <h1 className="text">{name}</h1>
            <span className="pre-text">👨‍🍳{cuisines.join(", ")}</span>
            <br />
            <span className="pre-text">
              ↪ {areaName}, {sla.slaString}
            </span>
          </div>
          <div className="rating-container">
            <p className="rating-number">⭐ {avgRating}</p>
            <p className="rating-text">®{totalRatingsString}</p>
          </div>
        </div>
        <hr className="horizontal" />
        <div className="fee-container">
          <p className="fee-text">
            ❗Far (4 kms) | Additional delivery fee will apply
          </p>
        </div>
      </div>
      <div className="offer-container">
        <div className="offers">
          <p className="offer-text">🔄 {offers[0].meta}</p>
        </div>
        <div className="offers">
          <p className="offer-text">🔄 {offers[1].meta}</p>
        </div>
      </div>

      <div className="veg-button">
        <label htmlFor="veg" className="check-veg">
          Veg Only
        </label>
        <input type="checkbox" checked={show} name="veg" onChange={onChange} />
      </div>
      <hr className="veg-hr" />
      <h1 className="menu-title">Recommmended ({resInfo.menuItems.length})</h1>
      <div className="itemcards-container">
        {menuFilter().map((item, index) => {
          const {
            name,
            defaultPrice,
            price,
            description,
            imageId,
            itemAttribute,
          } = item;
          const { vegClassifier } = itemAttribute;

          return (
            <div
              className="menu-desc-container"
              key={item?.imageId === imageId ? index : item?.imageId}
            >
              <div>
                <h1 className="menu-name">
                  {name}
                  <span className={vegClassifier === "VEG" ? "green" : "red"}>
                    <sup>{vegClassifier === "VEG" ? "VEG" : "NON-VEG"}</sup>
                  </span>
                </h1>
                <p className="menu-text">
                  Rs. {defaultPrice / 100 || price / 100}
                </p>
                <p className="menu-desc">{description}</p>
              </div>
              <div className="image">
                <img
                  alt={name}
                  className="menu-img"
                  src={
                    item.imageId
                      ? `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`
                      : "https://cdn-images-1.medium.com/max/1600/1*oj-8G0PTm_zsbzryG1SzQA.png"
                  }
                />
                <button className="add-cart">Add</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
