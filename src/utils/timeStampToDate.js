export default (time) => {
  const splitedTime = time.split("-");
  const yearAndMonth = `${splitedTime[0]}年 ${splitedTime[1]}月`;
  const day = splitedTime[2].substring(0, 2);
  return `${yearAndMonth} ${day}日`;
};
