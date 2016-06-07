    /**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */



 
 
var aqiData = {cityName:[],aqiValue:[]};
var cityInput=document.getElementById('aqi-city-input');
var valueInput=document.getElementById('aqi-value-input');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=cityInput.value.trim();
	var value=valueInput.value.trim();
  if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
    alert('字符串');
    return;
  } else if (!value.match(/^\d+$/) ) {
    alert('数字');
    return;
  } else {
    aqiData.cityName.push(city);
    aqiData.aqiValue.push(value);
  }
  //aqiData={city,value}
  //console.log(aqiData.city);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table=document.getElementById('aqi-table');
  var tr=document.createElement("tr");
  for (var i = 0; i < aqiData.cityName.length; i++) {
    tr.innerHTML="<td>"+aqiData.cityName[i]+"</td>"+"<td>"+aqiData.aqiValue[i]+"</td>"+"<td><input  class=\"delBtn\" type=\"button\" value=\"DE\"></td>";
    table.appendChild(tr);
  }

    var delBtns=document.getElementsByClassName('delBtn')
  for (var i = delBtns.length - 1; i >= 0; i--) {
    delBtns[i].onclick=delBtnHandle;
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var table=document.getElementById('aqi-table');
  table.removeChild(this.parentNode.parentNode)
  //renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn=document.getElementById('add-btn');
  btn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();