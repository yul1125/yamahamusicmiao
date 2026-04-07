class MusicPlayer {
    constructor(songList) {
        this.songList = songList;
        this.currentSongIndex = 0;
        this.audio = new Audio();
        this.loadLastPlayedSong();
    }

    loadLastPlayedSong() {
        const lastSongIndex = localStorage.getItem('lastPlayedSong');
        if (lastSongIndex && lastSongIndex < this.songList.length) {
            this.currentSongIndex = lastSongIndex;
            this.playSong();
        }
    }

    playSong() {
        if (this.currentSongIndex >= 0 && this.currentSongIndex < this.songList.length) {
            this.audio.src = this.songList[this.currentSongIndex];
            this.audio.play()
                .then(() => {
                    localStorage.setItem('lastPlayedSong', this.currentSongIndex);
                    this.highlightCurrentSong();
                })
                .catch(error => {
                    console.error('Error playing song:', error);
                    this.handleNetworkError();
                });
        } else {
            console.error('Invalid song index:', this.currentSongIndex);
        }
    }

    highlightCurrentSong() {
        const songElements = document.querySelectorAll('.song');
        songElements.forEach((elem, index) => {
            if (index === this.currentSongIndex) {
                elem.classList.add('active');
            } else {
                elem.classList.remove('active');
            }
        });
    }

    nextSong() {
        this.currentSongIndex++;
        if (this.currentSongIndex >= this.songList.length) {
            this.currentSongIndex = 0;
        }
        this.playSong();
    }

    handleNetworkError() {
        alert('Network error, please check your connection.');
    }
}

// Example usage:
const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
const player = new MusicPlayer(songs);

// Bind next song on end of audio
player.audio.addEventListener('ended', () => player.nextSong());