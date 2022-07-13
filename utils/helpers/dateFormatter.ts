const getNiceDate = (date: string) => {
  const publish = new Date(date);
  const day = publish.getDate();
  const month = publish.getMonth();
  const year = publish.getFullYear();

  const getMonthString = () => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
    }
  };
  const blogDate = `${day < 10 ? "0" + day : day} ${getMonthString()} ${year}`;
  return blogDate;
};

export default getNiceDate;
