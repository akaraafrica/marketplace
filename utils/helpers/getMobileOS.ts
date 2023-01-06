const getMobileOS = () => {
  if (navigator.userAgent.match(/Android/i)) {
    return true;
  } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    return true;
  }
  return false;
};
export default getMobileOS;
