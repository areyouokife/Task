* 随机颜色的获取
```javascript
function randomColor(){
  var color = ['#24936E','#D0104C','#A96360','#FB966E','#ECB88A','#90B44B','#00AA90','#994639','#985F2A','#1C1C1C'];
  return color[Math.floor(Math.random()*10)];
}
```
review其他的学到
```javascript
function randomColor(){
	return '#'+Math.floor(Math.random()*0xffffff).toString(16);
}
```
其中0x表示16进制，f在16进制中就表示十进制数15，这样0xffffff就表示一个16进制的数fffffff

* change事件
* 更多的逻辑
* selectedIndex属性