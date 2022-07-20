export const sortItem = (
  data: any[],
  value: string,
  checkValue: string,
  compareValue: string | number
) => {
  let newData;
  if (compareValue === "ratings") {
    const itemsRating = data
      .map((item) => {
        if (item.Rating.length) {
          const reducer = (accumulator: number, curr: number) =>
            accumulator + curr;
          const { rating } = item.Rating.reduce(reducer);
          let avgRating = rating / item.Rating.length;

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
export const handleChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  param: string,
  setData: any,
  data: any
) => {
  let value = e?.target?.value;
  let newData;

  switch (param) {
    case "RECENT":
      newData = sortItem(data, value, "First added", "id");
      setData([...newData]);
      break;
    case "PRICE":
      newData = sortItem(data, value, "Lowest price", "price");
      setData([...newData]);
      break;
    case "LIKES":
      newData = sortItem(data, value, "Least liked", "ratings");
      setData([...newData]);
      break;
    case "CREATORS":
      newData = sortItem(data, value, "Non verified only", "verified");
      setData([...newData]);
      break;

    default:
      break;
  }
};

export const handleResetFilter = (setData: any, items: any) => {
  setData([...items]);
};
export const handleSliderChange = (e: any, setData: any, items: any) => {
  const value = e.target.value;

  const newData = items.filter((item: any) => Math.floor(item.price) <= value);
  setData([...newData]);
};
