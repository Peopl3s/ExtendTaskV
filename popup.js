var divIndex = 1;
var dataA = ' ';
var  divs = [];

function getInfo(){
	let data_time = new Date();
	$('#info').text(data_time);
};
	
function getWeekNumber(){
	let d = new Date, dt = d.getTime (); d.setMonth (8, 2);
	if (d.getTime () > dt) d.setFullYear (d.getFullYear () - 1);
	let n = Math.floor ((dt - d.getTime ()) / 8.64e7 / 7);
	//console.log(n);
	let week = ((n / 2 == 0) || (n == 0 )) ? 'Знаменательная неделя': 'Числительная неделя';
	$('#info').html('<p>'+$('#info').html() +'<br>'+ week + '</p>')
};

function loadChromeStorage(){
	
	chrome.storage.sync.get('index', function(res) {
    if (res.index)
	{
		this.divIndex = res.index;
	}
  });
		  
chrome.storage.sync.get('data', function(res) {
    if (res.data)
	{
		this.dataA = res.data;
		divs = res.data.split('`');
		for(str of res.data.split('`'))
		{
			$("#content").append(str);
		}
	} 
  });
};

function copyOnBuffer(e){
	//console.log('test',$(this).text());
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(this).text()).select();
	document.execCommand("copy");
	$temp.remove();
};

function createTask(e){
        e.preventDefault();
		
		let task = prompt('‚ведите задачу в формате: «адача/год.мес¤ц.число/часы.минуты')
		let headline = '<div id=\"task'+ divIndex + '\">'+task+' #'+divIndex+'</div>';     //!!!!!! <hr></div>
		divs[divIndex] = headline;  // !!!!!
		$("#content").append(headline);		
		divIndex += 1;
		dataA = divs.join('`');  
		
		chrome.storage.sync.set({index: divIndex}, function() {
      console.log('Index is', divIndex);
    });
		chrome.storage.sync.set({data: dataA}, function() {
      console.log('data is', dataA);
    });	
};
	
function removeTask(e){
        e.preventDefault();
		
		let task = prompt('‚ведите номер задачи:')
		$('#task'+task).remove();
		delete divs[task]
		dataA = divs.join('`');
		
		chrome.storage.sync.set({data: dataA}, function() {
      console.log('data is', dataA);
    });
};	

function clearTaskSheldue(e){
        e.preventDefault();
		
		divIndex = 1;
		dataA = '';
		divs = [];
		$("#content").empty();
		
		chrome.storage.sync.set({index: divIndex}, function() {
      console.log('data is', 1);
    });
		chrome.storage.sync.set({data: dataA}, function() {
      console.log('data is', '');});
};


function setTimerOnTask(e){
        e.preventDefault();
		
		let numberTask = prompt('Выберете номер задачи, на которую будет установлен таймер')
		
		if ( $('#task'+numberTask).text() !=''){
			let d_tm = prompt('Введите дату и время в формате: год/месяц/число/час/минуты')
			//console.log(d_tm);
			let now = new Date();
			let endDate = new Date(d_tm.split('/')[0], d_tm.split('/')[1]-1, 
			                       d_tm.split('/')[2], d_tm.split('/')[3],d_tm.split('/')[4]);
			//console.log(now)
			//console.log(endDate)
			//console.log(((endDate.getTime() - now.getTime()) / 1000));
			sec = ((endDate.getTime() - now.getTime()) / 1000);
			let msg = $('#task' + numberTask).text();
			let newWin = window.open("timer.html", "Timer", "width=200,height=200");
			newWin.onload= function(){
				newWin.$("body").append(`<center><div id="secondLeft"><p><b>${sec}</b></p></div></center>`);
				newWin.$("body").append(`<center><div id="message"><p><b>${msg}</b></p></div><center>`);
			};
		} else {
			alert('Нет такой задачи')
		}
};

function searchTask(e){
        e.preventDefault();
		
		let elements = new Array(...$("div[id^='task']"));
		let pattern = prompt('Введите слово или номер задачи через #')
	    if (pattern == ''){
			elements.forEach(function (e){
				$(e).show();
			});
		} else {
			//console.log(pattern);
			let reg = new RegExp(pattern.toLowerCase());
			elements.forEach(function (e){
				if (!reg.test(e.innerHTML.toLowerCase())){
					$(e).hide();
				} else {
					$(e).show();
				}
			});
		}
};
	
window.setInterval(getInfo, 10);
window.setInterval(getWeekNumber, 10);

$(document).ready(function(){	
getInfo();
getWeekNumber();
loadChromeStorage();
  
$("body").on('click', "div[id^='task']", copyOnBuffer);
$('#btn_add').click(createTask);
$('#btn_remove').click(removeTask);
$('#btn_clear').click(clearTaskSheldue);	
$('#btn_timer').click(setTimerOnTask);
$('#btn_search').click(searchTask);
});





