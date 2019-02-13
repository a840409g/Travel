const xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',false);
xhr.send();
const hotArray = JSON.parse(localStorage.getItem('hot'))||[];
const xhrJson = JSON.parse(xhr.responseText);
const viewPoint = xhrJson.result.records;
// 上為Json
const seleArea = document.querySelector('.area');
const hot = document.querySelector('.hotArea');
const nowMes = document.querySelector('.nowMes');
const viewData = document.querySelector('.viewData');
const titleClass = document.querySelector('.titleClass');
const zoneClass = document.querySelector('.zoneClass');

// 宣告需要的節點
const dataHtml= (arg) => {
			let content = 
			'<div class="dataDiv">'+
				'<img class="travelImg" src="'+arg.Picture1+'">'+
				'<p class="titleClass">'+arg.Name+'</p>'+
				'<p class="zoneClass">'+arg.Zone+'</p>'+
				'<img class="iconClass" src="assets/icons_clock.png">'+
				'<p class="iconClass iconP">'+arg.Opentime+'</p>'+
				'<br>'+
				'<img class="iconClass" src="assets/icons_pin.png">'+
				'<p class="iconClass iconP">'+arg.Add+'</p>'+
				'<br>'+
				'<img class="iconClass iconPhone" src="assets/icons_phone.png">'+
				'<p class="iconClass iconP">'+arg.Tel+'</p>'+
				'<img class="tagClass" src="assets/icons_tag.png">'+
				'<p class="tagP">'+arg.Ticketinfo+'</p>'+
			'</div>';
			return content;
		};
const choseOne = (e) =>{
	let value = e.target.value;
	nowMes.innerHTML = value;
	// console.log(viewPoint.length);
	let str = "";
	for(let i=0;i<viewPoint.length;i++){
		let zone = viewPoint[i].Zone;
		if( zone == value){
			content = dataHtml(viewPoint[i]);
			str+=content;
			// console.log(str);
		}
	}
		viewData.innerHTML = str;
};
// 渲染整個版面
const hotFunc = (e) =>{
	let value = e.target.value;
	let str = "";
	// hotArray.push(value);
	let hotStr = JSON.stringify(hotArray);
	localStorage.setItem('hot',hotStr);
	if(hotArray.length>3){
		hotArray.splice(0,1);
	}
	if(value == "請選擇行政區"){
		return;
	}else{
		hotArray.push(value);
		for(let i=0;i<4;i++){
			let content = '<div class=div'+(i+1)+'>' + hotArray[i] + '</div>';
			str+=content;
			// console.log(str);
		}
		document.querySelector('.hot').innerHTML = str;
	}
}
	
seleArea.addEventListener('change',choseOne);
seleArea.addEventListener('change',hotFunc);