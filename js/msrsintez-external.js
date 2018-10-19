/*!
 * msrsintez-external module
 * Version 3.2-2018.08.03
 *
 * Examples at: http://corpus.tatar/en
 * Copyright (c) 2015-2018 Mansur Saykhunov
 *
 * Thanks to Rustem Khusainov, Alex and Marat Khakimov for some excellent contributions!
 */

var global_msrtext = "";
var global_msrpos = 0;
var global_msrsize = 0;
var global_paused = 0;
var global_stop = 1;
var global_temp = "";
var global_url = "";
var global_continue = false;
var global_timerId;
var global_timerId2;
var global_isHtml5Mp3 = true;
var msraudio_html5;
var msraudio_html5_next;
var msraudio_html5_temp;
var msraudio_flash;
var msraudio_flash_next;
var msraudio_flash_temp;

function showPlay()
{
	document.getElementById("picPlay").style.display = "inline-block";
	document.getElementById("picPause").style.display = "none";
}

function showPause()
{
	document.getElementById("picPlay").style.display = "none";
	document.getElementById("picPause").style.display = "inline-block";
}

function fint2cyrtr(strin)
{
	var arrayft = { 'a':'а', 'ä':'ә', 'b':'б', 'v':'в', 'g':'г', 'd':'д', 'e':'е', 'c':'җ', 'z':'з', 'i':'и', 'y':'й', 'k':'к', 'l':'л', 'm':'м', 'n':'н', 'ñ':'ң', 'o':'о', 'ö':'ө', 'p':'п', 'r':'р', 's':'с', 't':'т', 'u':'у', 'ü':'ү', 'f':'ф', 'h':'һ', 'ç':'ч', 'ş':'ш', 'ı':'ы', 
			'A':'А', 'Ä':'Ә', 'B':'Б', 'V':'В', 'G':'Г', 'D':'Д', 'E':'Е', 'C':'Җ', 'Z':'З', 'I':'И', 'Y':'Й', 'K':'К', 'L':'Л', 'M':'М', 'N':'Н', 'Ñ':'Ң', 'O':'О', 'Ö':'Ө', 'P':'П', 'R':'Р', 'S':'С', 'T':'Т', 'U':'У', 'Ü':'Ү', 'F':'Ф', 'H':'Һ', 'Ç':'Ч', 'Ş':'Ш', 'I':'Ы' };
	var strout = "";
	var length = strin.length;
	for(var i=0; i<length; i++) {
		strout += arrayft[strin[i]] || strin[i]; 
	}
	return strout;
}
function checkHtml5AudioMp3Support()
{
	var a = document.createElement('audio');
	return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
}
function checkFlash()
{
	try { // if the movie is blocked then PercentLoaded() should through an exception
		if (msraudio_flash.PercentLoaded() > 0) { // Movie loaded or is loading
			return true;
		}
	}
	catch (e) { // Movie is blocked
		return false;
	}
}
function selectTTS()
{
	//global_url = "https://talgat.corpus.tatar/search/rhvoice.php?t="; // talgat
	var e = document.getElementById("tts");
	if (e === null) {
		global_url = "https://talgat.corpus.tatar/search/rhvoice.php?t="; // talgat
	} else {
		var strTTS = e.options[e.selectedIndex].value;
		if(strTTS == "talgat") {
			global_url = "https://talgat.corpus.tatar/search/rhvoice.php?t="; // talgat
		} else {
			global_url = "https://tavzikh.corpus.tatar/?t="; // tavzikh
		}
	}
}
function isAppLoaded()
{
	return true;
}
function loadAudio(uri)
{
	var audio = new Audio();
	audio.addEventListener('canplaythrough', isAppLoaded, false); 
	audio.src = uri;
	return audio;
}
function strip(html)
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
}
function onInit() {}
function onUpdate() 
{
	global_temp = encodeURI(global_msrtext[global_msrpos]);
	if(global_isHtml5Mp3) {
		// Switch audio players
		msraudio_html5_temp = msraudio_html5;
		msraudio_html5 = msraudio_html5_next;
		msraudio_html5_next = msraudio_html5_temp;
        
		if(global_msrpos < global_msrsize) {
			global_continue = true;
		} else {
			global_continue = false;
		}
		clearTimeout(global_timerId);
		msraudio_html5.play();
		if(global_continue == true) {
			setUpdateTimer2(function(){onUpdate()});
			// Preload next sentence
			global_temp = encodeURI(global_msrtext[global_msrpos + 1]);
			msraudio_html5_next.src = global_url+global_temp;
		} else {
			setUpdateTimer2(function(){stop()});
		}
	} else {
		msraudio_flash.SetVariable("method:stop", "");
		
		// Switch audio players
		msraudio_flash_temp = msraudio_flash;
		msraudio_flash = msraudio_flash_next;
		msraudio_flash_next = msraudio_flash_temp;
		
		msraudio_flash.SetVariable("method:setUrl", global_url+global_temp);
		if(global_msrpos < global_msrsize) {
			msraudio_flash.SetVariable("method:setContinue", "true");
		} else {
			msraudio_flash.SetVariable("method:setContinue", "false");
		}
		msraudio_flash.SetVariable("method:play", "");
		
		// Preload next sentence
		if(global_msrpos < global_msrsize) {
		global_temp = encodeURI(global_msrtext[global_msrpos + 1]);
			msraudio_flash_next.SetVariable("method:setUrl", global_url+global_temp);
			msraudio_flash_next.SetVariable("method:play", "");
			msraudio_flash_next.SetVariable("method:pause", "");
		}
	}
	global_msrpos++;
}
function setUpdateTimer()
{
	global_timerId = setTimeout(function msr_playing() {
		if(msraudio_html5.ended == true && global_paused == 0) {
			onUpdate();
		} else {
			global_timerId = setTimeout(msr_playing, 100);
		}
	}, 100);
}
function setUpdateTimer2(callback)
{
	clearTimeout(global_timerId2);
	global_timerId2 = setTimeout(function msr_playing2() {
		if(msraudio_html5.ended == true) {
			callback();
		} else {
			global_timerId2 = setTimeout(msr_playing2, 100);
		}
	}, 100);
}
function checkState()
{
	return msraudio_html5.currentTime > 0 && !msraudio_html5.paused && !msraudio_html5.ended && msraudio_html5.readyState > 2;
}
function play(msrtext) 
{
	if(global_paused == 1) {
		if(!checkState()) {
			unpause();
		}
	} else {
		if(global_stop == 1 || !msraudio_html5) {
			
			if(msraudio_html5) {
				msraudio_html5.pause();
				msraudio_html5.currentTime = 0;
			}
			
			msraudio_html5 = new Audio();
			msraudio_html5_next = new Audio();
			
			msraudio_flash = document.getElementById("myFlash");
			msraudio_flash_next = document.getElementById("myFlashNext");
			selectTTS();
			msrtext = strip(msrtext);
			global_isHtml5Mp3 = checkHtml5AudioMp3Support();

			msrtext = msrtext.replace(/[&<>"']/g, "");
			msrtext = msrtext.replace(/\s+/g, " "); // \s == [ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]
			msrtext = msrtext.replace(/^ +/g, "");
			msrtext = msrtext.replace(/ +$/g, "");
			msrtext = msrtext.replace(/([^\n.!?]{20,200}[.!?]+)[^$]/g, "$1\n");
			msrtext = msrtext.replace(/([^\n.!?]{100,200}[,:;]+)[^$]/g, "$1\n");
			/*
			if (fintat.checked) {
				msrtext = fint2cyrtr(msrtext);
			}
			*/
			global_msrpos = 0;
			global_msrtext = msrtext.split(/\n/);
			global_msrsize = global_msrtext.length - 1;
			global_temp = encodeURI(global_msrtext[global_msrpos]);
			if(global_isHtml5Mp3) {
				msraudio_html5.src = global_url+global_temp;
				if(global_msrpos < global_msrsize) {
					global_continue = true;
				} else {
					global_continue = false;
				}
			} else {
				msraudio_flash.SetVariable("method:setUrl", global_url+global_temp);
				if(global_msrpos < global_msrsize) {
					msraudio_flash.SetVariable("method:setContinue", "true");
				} else {
					msraudio_flash.SetVariable("method:setContinue", "false");
				}
			}
			global_msrpos++;

			global_paused = 0;
			if(global_isHtml5Mp3) {
				msraudio_html5.play();
				if(global_continue == true) {
					setUpdateTimer();
					// Preload next sentence
					global_temp = encodeURI(global_msrtext[global_msrpos]);
					msraudio_html5_next.src = global_url+global_temp;
				} else {
					setUpdateTimer2(function(){stop()});
				}
			} else {
				msraudio_flash.SetVariable("method:play", "");
				
				// Preload next sentence
				global_temp = encodeURI(global_msrtext[global_msrpos]);
				msraudio_flash_next.SetVariable("method:setUrl", global_url+global_temp);
				msraudio_flash_next.SetVariable("method:play", "");
				msraudio_flash_next.SetVariable("method:pause", "");
			}
			
			showPause();
		}
		global_stop = 0;
	}
}
function pause() 
{
	showPlay();
	
	global_paused = 1;
	if(global_isHtml5Mp3) {
		if(checkState()) {
			msraudio_html5.pause();
		} else {
			unpause();
		}
	} else {
		msraudio_flash.SetVariable("method:pause", "");		
	}
}
function unpause()
{
	global_paused = 0;
	msraudio_html5.play();
	
	clearTimeout(global_timerId);
	setUpdateTimer();
	
	showPause();
}
function stop() 
{
	global_paused = 0;
	global_stop = 1;
	if(global_isHtml5Mp3) {
		msraudio_html5.pause();
		msraudio_html5.currentTime = 0;
	} else {
		msraudio_flash.SetVariable("method:stop", "");
		msraudio_flash_next.SetVariable("method:stop", "");
	}
	
	showPlay();
}
