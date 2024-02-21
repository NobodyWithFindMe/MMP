document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const stopButton = document.getElementById('stop');
    const volumeControl = document.getElementById('volume');
    const chooseFileButton = document.getElementById('choose-file');
    const songName = document.getElementById('song-name');
    const languageToggle = document.getElementById('language-toggle');
    const progress = document.getElementById('progress');
    const elapsedTime = document.getElementById('elapsed-time');
    const totalTime = document.getElementById('total-time');

    // Загрузка текстов на русском и английском
    const texts = {
        ru: {
            title: 'Мой Аудио Плеер',
            play: 'Воспроизвести',
            pause: 'Пауза',
            stop: 'Стоп',
            chooseFile: 'Выбрать файл',
            volume: 'Громкость',
            language: 'Русский'
        },
        en: {
            title: 'My Audio Player',
            play: 'Play',
            pause: 'Pause',
            stop: 'Stop',
            chooseFile: 'Choose File',
            volume: 'Volume',
            language: 'English'
        }
    };

    // Установка начального языка
    let currentLanguage = 'ru';
    updateLanguage(currentLanguage);

    function updateLanguage(lang) {
        document.getElementById('title').textContent = texts[lang].title;
        playPauseButton.textContent = audioPlayer.paused ? texts[lang].play : texts[lang].pause;
        stopButton.textContent = texts[lang].stop;
        chooseFileButton.textContent = texts[lang].chooseFile;
        document.getElementById('volume-label').textContent = texts[lang].volume;
        languageToggle.textContent = texts[lang].language;
    }

    // Обработчик изменения языка
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
        updateLanguage(currentLanguage);
    });

    chooseFileButton.addEventListener('click', function() {
        // Симулируем клик по скрытому элементу input типа "file"
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'audio/*';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const fileURL = URL.createObjectURL(file);
            audioPlayer.src = fileURL;
            songName.textContent = file.name; // Обновляем название аудиозаписи
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    });

    playPauseButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = texts[currentLanguage].pause;
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = texts[currentLanguage].play;
        }
    });

    stopButton.addEventListener('click', function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });

    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = volumeControl.value;
    });

    progress.addEventListener('input', () => {
        const { duration } = audioPlayer;
        const selectedTime = (progress.value * duration) / 100;
        audioPlayer.currentTime = selectedTime;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audioPlayer;
        const progressPercentage = (currentTime / duration) * 100;
        progress.value = progressPercentage;
        
        const elapsedMinutes = Math.floor(currentTime / 60);
        const elapsedSeconds = Math.floor(currentTime % 60);
        const totalTimeMinutes = Math.floor(duration / 60);
        const totalTimeSeconds = Math.floor(duration % 60);
        
        const formattedElapsedTime = `${elapsedMinutes}:${elapsedSeconds < 10 ? '0' : ''}${elapsedSeconds}`;
        const formattedTotalTime = `${totalTimeMinutes}:${totalTimeSeconds < 10 ? '0' : ''}${totalTimeSeconds}`;
        
        elapsedTime.textContent = formattedElapsedTime;
        totalTime.textContent = formattedTotalTime;
    });
});
