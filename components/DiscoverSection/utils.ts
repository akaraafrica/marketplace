import { TbRuler } from "react-icons/tb";
import itemDs from "../../ds/item.ds";
import { IItem } from "../../types/item.interface";

export const sortItem = (
  data: any[],
  value: string,
  checkValue: string,
  compareValue: string | number
) => {
  let newData;
  if (!data || data.length === 0) return [];

  if (compareValue === "ratings") {
    const itemsRating = data
      .map((item) => {
        if (item?.ratings?.length) {
          const reducer = (accumulator: number, curr: number) =>
            accumulator + curr;
          const { rating } = item.ratings.reduce(reducer);
          let avgRating = rating / item.ratings.length;

          return {
            ...item,
            avgRating,
          };
        }
      })
      .filter((item) => item != undefined);

    value === checkValue
      ? (newData = itemsRating.sort(
          (a: any, b: any) => a?.avgRating - b?.avgRating
        ))
      : (newData = itemsRating.sort(
          (a: any, b: any) => b?.avgRating - a?.avgRating
        ));
    return newData;
  }
  if (compareValue === "verified") {
    value === checkValue
      ? (newData = data.sort(
          (a: any, b: any) => a.owner[compareValue] - b.owner[compareValue]
        ))
      : (newData = data.sort(
          (a: any, b: any) => b.owner[compareValue] - a.owner[compareValue]
        ));
    return newData;
  }
  value === checkValue
    ? (newData = data.sort(
        (a: any, b: any) => a[compareValue] - b[compareValue]
      ))
    : (newData = data.sort(
        (a: any, b: any) => b[compareValue] - a[compareValue]
      ));
  return newData;
};

export const handleChange = async (
  e: React.ChangeEvent<HTMLSelectElement>,
  param: string,
  setData: any,
  setFilter: any,
  setLoading: any
) => {
  let value = e?.target?.value;

  if (param === "RECENT") {
    const val = value === "Recently added" ? "desc" : "asc";
    setFilter({ createdOrder: val });
    setLoading(TbRuler);
    const res = await itemDs.getFilterData("createdOrder", val);
    setLoading(false);
    setData(res);
  }
  if (param === "PRICE") {
    const val = value === "Highest price" ? "desc" : "asc";
    setFilter({ priceOrder: val });
    setLoading(true);
    const res = await itemDs.getFilterData("priceOrder", val);
    setLoading(false);
    setData(res);
  }
  if (param === "LIKES") {
    const val = value === "Most liked" ? "desc" : "asc";
    setFilter({ likesOrder: val });
    setLoading(true);
    const res = await itemDs.getFilterData("likesOrder", val);
    setLoading(false);
    setData(res);
  }
  if (param === "CREATORS") {
    const val = value === "Verified only" ? false : true;
    setFilter({ likesOrder: val });
    setLoading(true);
    const res = await itemDs.getFilterData("creatorOrder", val);
    setLoading(false);
    setData(res);
  }
};

export const handleResetFilter = (setData: any, items: any) => {
  setData([...items]);
};
export const handleSliderChange = async (
  e: any,
  setData: any,
  setFilter: any,
  setLoading: any
) => {
  const value = e.target.value;
  setFilter({ priceRange: value });
  setLoading(true);
  const res = await itemDs.getFilterData("priceRange", value);
  setData(res);
  setLoading(false);
};

type category = "ART" | "GAME" | "PHOTOGRAPHY" | "MUSIC" | "VIDEO" | "ALL";
export const handleCategoryChange = async (
  category: category,
  setData: React.Dispatch<React.SetStateAction<IItem[] | undefined>>,
  items: IItem[] | undefined,
  setLoading: any
) => {
  if (category === "ALL") {
    setData(items);
    return;
  }
  setLoading(true);
  const res = await itemDs.getFilterData("category", category);
  setData(res);
  setLoading(false);
};
