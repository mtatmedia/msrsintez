# msrsintez
Online Tatar speech synthesis interface


1) Подгружайте вот этот JavaScript файл в самом конце вашей страницы, чтобы не тормозить загрузку основного контента:
https://sintez.corpus.tatar/search/js/msrsintez-external.js

2) Вот пример того, как можно вызывать функции:

- Воспроизведение:
~~~~
<input id='picPlay' type='image' src='https://sintez.corpus.tatar/search/images/btnPlay.png' title="Play" style="vertical-align: middle" onclick="javascript:play( document.getElementById('bigtext').textContent || document.getElementById('bigtext').innerText ); return false;">
~~~~

- Пауза:
~~~~
<input id='picPause' type='image' src='https://sintez.corpus.tatar/search/images/btnPause.png' title="Pause" style="vertical-align: middle" onclick="javascript:pause(); return false;">
~~~~

- Стоп:
~~~~
<input id='picStop' type='image' src='https://sintez.corpus.tatar/search/images/btnStop.png' title="Stop" style="vertical-align: middle" onclick="javascript:stop(); return false;">
~~~~

3) Насколько я помню, мой скрипт, вроде, сам чистит текст от HTML тегов. Но это надо проверить.

4) Для тех пользователей, у кого HTML5 не поддерживается (коих от года к году все меньше и меньше), есть поддержка воспроизведения через Flash. Для этого нужно ближе к концу страницы (но перед импортом яваскрипта пункта 2) вставить эти два куска:
~~~~
<object id="myFlash" type="application/x-shockwave-flash" data="https://sintez.corpus.tatar/search/flash/player.swf" width="1" height="1">
    <param name="movie" value="https://sintez.corpus.tatar/search/flash/player.swf" />
    <param name="AllowScriptAccess" value="always" />
</object>
<object id="myFlashNext" type="application/x-shockwave-flash" data="https://sintez.corpus.tatar/search/flash/player.swf" width="1" height="1">
    <param name="movie" value="https://sintez.corpus.tatar/search/flash/player.swf" />
    <param name="AllowScriptAccess" value="always" />
</object>
~~~~





