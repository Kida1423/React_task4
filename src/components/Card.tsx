import React, {useState, useEffect, useRef} from 'react'
import "./../assets/css/card.css"
import musics from "./../assets/data"
import {timer} from "./utils/timer"

interface CardProps{
    musicNumber: number;
    setMusicNumber: (number: number) => void;
    setOpen: (open: boolean) => void;
}


const Card: React.FC<CardProps> = ({ musicNumber, setMusicNumber, setOpen} ) => {    
    const [duration, setDuration] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(50)
    const [showVolume, setShowVolume] = useState(false)
    const [repeat, setRepeat] = useState('repeat')

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handleLoadStart = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audio = audioRef.current;
    
        if (audio) {
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
            };
    
            if (play) {
                audio.play();
            }
        }
    };
    

    const handlePlayingAudio = () => {
        const audio = audioRef.current;
        if (audio) {
            if (play) { 
                audio.pause();
                setPlay(false)
            } else {
                audio.play();
                setPlay(true)
            }
        }
    };

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime; 
        setCurrentTime(currentTime)
        
    };
    
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            const seekTime = (Number(e.target.value) / 100) * duration;
            audio.currentTime = seekTime;4
            setCurrentTime(seekTime); 
        }
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentTime = Number(e.target.value)
        audioRef.current.currentTime = currentTime;
        setCurrentTime(currentTime)
    };
    
    const handleNextPrev = (n: number) => {
        setMusicNumber((value) => {
            const newIndex = value + n;    
            if (newIndex > musics.length - 1) {
                return 0;
            }
            if (newIndex < 0) {
                return musics.length - 1;
            }
            return newIndex;
        });
    };

    useEffect(() => {
        audioRef.current.volume = volume / 100
    }, [volume])

    const handleRepeat = () =>{
        setRepeat(value => {
            switch(value) {
                case 'repeat':
                    return 'repeat_one'  
                case 'repeat_one':
                    return 'shuffle'
                default:
                    return 'repeat'    
            }
        })
    }
    const EndedAudio = () =>{
        switch (repeat) {
            case 'repeat':
                return audioRef.current?.play()
            case 'shuffle':
                return handleShuffle()
            default:
                handleNextPrev(1);
        }
    }

    const handleShuffle = () => {
        const num = randomNumber()
        setMusicNumber(num)
    }

    const randomNumber = () => {
        const number = Math.floor(Math.random() * (musics.length - 1))
        if(number === musicNumber)
            return randomNumber();

        return number
    }

    return (    
        <div className = 'card'>
            <div className = 'nav'>
                <i className = 'material-icons'>
                    <svg xmlns = "http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </i>
                <span>Now Plaing {musicNumber + 1}/{musics.length}</span>

                <i className='music_queue' onClick={() => setOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"/></svg>
                </i>

            </div>
                <div className='img'>
                    <img src={musics[musicNumber].thumbnail} alt="logo" />
                </div>
                <div className="details">
                    <p className="title">{musics[musicNumber].title}</p>
                    <p className="artist">{musics[musicNumber].artist}</p>
                </div>
                <div className="progress">
                    <input type="range" min={0} max={duration}
                    value={currentTime} 
                    onChange={e => changeCurrentTime(e)}
                    style={{
                        background: `linear-gradient(to right, 
                        #3264fe ${currentTime / duration * 100}%,
                        #e5e5e5 ${currentTime / duration * 100}%)`
                    }
                    }/>
                </div>

                <div className="timer">
                    <span>{timer(currentTime)}</span>
                    <span>{timer(duration)}</span>
                </div>
                <div className="controls">
                    <i className="material-symbols-outlined" onClick={handleRepeat}>{repeat}</i>

                    <i className="material-symbols-outlined" id='prev'
                    onClick={() => handleNextPrev(-1)}>skip_previous</i>
                    <div className='play' onClick={handlePlayingAudio}>
                        <i className="material-symbols-outlined">
                            {play ? "pause" : "play_arrow"}
                        </i>
                    </div>

                    <i className="material-symbols-outlined" id='next'
                        onClick={() => handleNextPrev(1)}>skip_next </i>

                    <i className="material-symbols-outlined" id='next'
                    onClick={() => {setShowVolume(prev => !prev)}}>volume_up</i>

                    <div className={`volume ${showVolume ? 'show' : ''}` }>
                        <i className="material-symbols-outlined" id='next' onClick={() => setVolume(v => v > 0 ? 0 : 100)}>{volume === 0 ? 'volume_off' : 'volume_up'}</i>
                        <input type="range" min={0} max={100}
                        onChange={e => setVolume(Number(e.target.value))}
                        value={volume}
                        style={{
                            background: `linear-gradient(to right, #3264fe ${volume}%,#e5e5e5 ${volume}%)`
                        }}/>
                        <span>{volume}</span>
                    </div> 
                </div>
                <audio
                    src={musics[musicNumber].src}
                    hidden
                    ref={audioRef} 
                    onTimeUpdate={handleTimeUpdate}
                    onLoadStart={handleLoadStart}
                    onEnded={EndedAudio}    
                />
        </div>
     );
}
 
export default Card;
