
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = [];

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
};


/**
 * 渲染图表
 */

 //随机颜色

// function randomColor(){
//   var color = ['#24936E','#D0104C','#A96360','#FB966E','#ECB88A','#90B44B','#00AA90','#994639','#985F2A','#1C1C1C'];
//   return color[Math.floor(Math.random()*10)];
// }
function randomColor(){
	return '#'+Math.floor(Math.random()*0xffffff).toString(16);
}

//图标数据
function renderChart() {
  document.getElementById('list').innerHTML = '';
  var nowCityData =  chartData[pageState.nowSelectCity];
  if (pageState.nowGraTime == 'day')
  {
    for(var daytime in nowCityData)
    {
      var chartLine = document.createElement('li');
      chartLine.setAttribute('title',daytime+ '\n' +nowCityData[daytime]);
      chartLine.style.background = randomColor();
      chartLine.style.height = nowCityData[daytime];
      chartLine.style.width = '12px';
      document.getElementById('list').appendChild(chartLine);
    }
  }

  else if(pageState.nowGraTime == 'week')//周的情况
  {
    var week = [];
    var average = 0;
    for (var key in nowCityData)
    {
      week.push(nowCityData[key]);
    }

    var weekNum = week.length/7;
    var weekLeft = week.length%7;

    for (var i = 0; i < weekNum; i++)
    {
      for (var j = 0; j < 7; j++)
      {
        average += week[i*7+j]; 
      }
      average = average / 7;
      var chartLine  = document.createElement('li');
      chartLine.setAttribute('title','第'+(i+1)+ '周' + '\n' +average);
      chartLine.style.background = randomColor();
      chartLine.style.height = average;
      chartLine.style.width = '84px';
      document.getElementById('list').appendChild(chartLine);
     
    }

  }

  else if (pageState.nowGraTime == 'month')//月的情况
  {
    var month = [];
    var average = 0;
    for (var key in nowCityData)
    {
      month.push(nowCityData[key]);
    }
    var monthNum = month.length/30;
    for (var i = 0; i<monthNum; i++)
    {
      for (var j=0; j<30; j++)
      {
        average += month[i*30+j];
      }
      average = average/30;
      var chartLine  = document.createElement('li');
      chartLine.setAttribute('title','第'+(i+1)+ '月' + '\n' +average);
      chartLine.style.background = randomColor();
      chartLine.style.height = average;
      chartLine.style.width = '360px';
      document.getElementById('list').appendChild(chartLine);
    }
  }
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var aGratime = document.getElementsByName('gra-time');
  for (var i = 0; i < aGratime.length; i++)
  {
  	if(aGratime[i].checked)
  	{
  		pageState.nowGraTime = aGratime[i].value;
  		renderChart();
  	}
  }
 
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var cityIndex = document.getElementById('city-select').selectedIndex;
  // 设置对应数据
  if (cityIndex != pageState.nowSelectCity)
  {
  	pageState.nowSelectCity = cityIndex;
  }
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var aLabel = document.getElementsByTagName('label');
  for (var i =0; i<aLabel.length; i++)
  {
  	aLabel[i].addEventListener('click',graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var option = '';
  for (var city in aqiSourceData)
  {
  	option += '<option>'+ city +'</option>';
  }
  document.getElementById('city-select').innerHTML = option;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  document.getElementById('city-select').addEventListener('change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
 
  // 处理好的数据存到 chartData 中
  for (var key in aqiSourceData)
  {
  	chartData.push(aqiSourceData[key]);
  }
   renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();