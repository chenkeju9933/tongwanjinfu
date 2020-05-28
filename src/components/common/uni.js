const unique = function(arr,type) {
  var newArr = [],
    judgeObj = {}; //hash表
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i][type];
    if (judgeObj[item] == undefined) { //如果hash表中没有当前项
      newArr.push(arr[i]);
      judgeObj[item] = true;
    }
  }
  return newArr;
}
export default unique
