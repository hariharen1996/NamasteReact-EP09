import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [data, setData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchResData();
  }, []);

  const fetchResData = async () => {
    const response = await fetch(MENU_API + resId);
    const json = await response.json();
    const restaurantData =
      json?.data?.cards
        ?.map((x) => x.card)
        ?.find(
          (x) =>
            x &&
            x.card["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        )?.card?.info || null;
    setData(restaurantData);
    const menuData =
      json?.data?.cards
        .find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
        ?.filter(
          (x) =>
            x["@type"] ==
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
        ?.map((x) => x.itemCards)
        .flat()
        .map((x) => x.card?.info) || [];
    setMenuItems(menuData);
  };

  return { data, menuItems };
};

export default useRestaurantMenu;
