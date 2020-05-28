const timeSer = {
  expirationTime (date) {
    let expiryTime = ''
    let newDate = new Date();
    if (date) {
      newDate.setTime(date);
      let year = newDate.getFullYear();
      let mounth = newDate.getMonth() + 1;
      mounth = mounth >= 10 ? mounth : '0' + mounth;
      let day = newDate.getDate();
      day = day >= 10 ? day : '0' + day;
      let hour = newDate.getHours();
      hour = hour >= 10 ? hour : '0' + hour;
      let minute = newDate.getMinutes();
      minute = minute >= 10 ? minute : '0' + minute;
      let second = newDate.getSeconds();
      second = second >= 10 ? second : '0' + second;
      let milSecond = newDate.getMilliseconds();
      milSecond = milSecond >= 10 ? milSecond : '0' + milSecond;
      expiryTime = year + '-' + mounth + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      return expiryTime;
    }
  }
};

export default timeSer
