# msrsintez
Online Tatar speech synthesis interface

## Инструкция по установке

1. Подгружайте вот этот JavaScript файл в самом конце вашей страницы, чтобы не тормозить загрузку основного контента:
```html
<script type="text/javascript" src="msrsintez-external.js"></script>
```

2. Вот пример того, как можно вызывать функции:

   - Воспроизведение:
```html
<input id='picPlay' type='image' src='images/btnPlay.png' title="Play" style="vertical-align: middle" onclick="javascript:play( document.getElementById('bigtext').textContent || document.getElementById('bigtext').innerText ); return false;">
```

- Пауза:
```html
<input id='picPause' type='image' src='images/btnPause.png' title="Pause" style="vertical-align: middle" onclick="javascript:pause(); return false;">
```

- Стоп:
```html
<input id='picStop' type='image' src='images/btnStop.png' title="Stop" style="vertical-align: middle" onclick="javascript:stop(); return false;">
```

3. Для тех пользователей, у кого HTML5 не поддерживается, есть поддержка воспроизведения через Flash. Для этого нужно ближе к концу страницы (но перед импортом яваскрипта из пункта 1) вставить эти два куска:
```html
<object id="myFlash" type="application/x-shockwave-flash" data="flash/player.swf" width="1" height="1">
    <param name="movie" value="flash/player.swf" />
    <param name="AllowScriptAccess" value="always" />
</object>
<object id="myFlashNext" type="application/x-shockwave-flash" data="flash/player.swf" width="1" height="1">
    <param name="movie" value="flash/player.swf" />
    <param name="AllowScriptAccess" value="always" />
</object>
```

4. Работа скрипта осуществляется через обращение к онлайн ресурсам проекта "Письменный корпус татарского языка" (www.corpus.tatar). На данный момент доступны следующие синтезаторы татарской речи:
- Талгат
- Тавзих
- *** (в разработке)
