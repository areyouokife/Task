/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city_input = document.getElementById('aqi-city-input');
	var value_input = document.getElementById('aqi-value-input');

	var re_city = /^[a-z\u4e00-\u9fa5]+$/gi; //对输入校验
	var re_value = /^\d+$/g;

	if (re_city.test(city_input.value) && re_value.test(value_input.value)) {
		var city = city_input.value.trim();
		var value = value_input.value.trim();
		aqiData[city] = value; 
	} else {
		alert('城市名必须为中英文字符，空气质量指数必须为整数');
	}
	return aqiData;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');

	table.innerHTML = '<td>城市</td> <td>空气质量</td> <td>操作</td>';
	for (var i in aqiData) {
		table.innerHTML += '<td>' + i + '</td>' + '<td>' + aqiData[i] + '</td>' + '<td><button onclick= "delBtnHandle(\''+i+'\')">删除</button></td>';
	}
}
//注意此处onclick传参的格式

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
function delBtnHandle(city) {
	// do sth.
	delete aqiData[city];
	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById('add-btn').addEventListener('click', addBtnHandle);
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();