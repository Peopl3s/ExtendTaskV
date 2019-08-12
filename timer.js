function soundClick() {
  var audio = new Audio(); 
  audio.src = 'Sound1.wav'; 
  audio.autoplay = true; 
}

function createTimeoutWindow(){
	let timeOutWindow = window.open("","");
	timeOutWindow.document.write('<body style = "background-color:#b8d1fc;"><center><h1>Timeout</h1></center></body>')
	timeOutWindow.document.write('<head><title>Timeout</title></head>');
	timeOutWindow.document.write('<audio src="Sound1.wav" autoplay="autoplay"></audio>')
	return timeOutWindow;
};

function invokeAlert(){
const sec = parseFloat($('#secondLeft').text());
const message = $('#message').text();
//console.log(sec);
window.setTimeout(function(){
	let timeOutWindow = createTimeoutWindow();
	soundClick();
	timeOutWindow.setTimeout(function(){ timeOutWindow.alert(message);}, 1000);
	timeOutWindow.setTimeout(function(){ window.close();}, 2000);
	}, (sec - 3) * 1000);
};


$( document ).ready(function() {
   window.setTimeout(invokeAlert,2000);
});