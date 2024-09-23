import React, { useEffect, useState } from 'react';
import "./../assets/css/list.css";
import musics from './../assets/data/index';
import { timer } from './utils/timer';

interface ListProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  musicNumber: number;
  setMusicNumber: React.Dispatch<React.SetStateAction<number>>;
}

const List: React.FC<ListProps> = ({ open, setOpen, musicNumber, setMusicNumber }) => {
  const downloadTrack = (src: string, title: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`list ${open ? `show` : ''}`}>
      <div className="header">
        <div>
          <i className="material-symbols-outlined">queue_music</i>
          <span>Music list</span>
        </div>
        <i className="material-symbols-outlined" onClick={() => setOpen(false)}>close</i>
      </div>
      <ul>
        {
          musics.map((music, idx) => (
            <li key={music.id} onClick={() => setMusicNumber(idx)} className={`${musicNumber === idx ? 'playing' : ''}`}>
              <div className='row'>
                <span>{music.title}</span>
                <p>{music.artist}</p>
              </div>
              <div className='download_time'>
                <span className="material-symbols-outlined" onClick={() => downloadTrack(music.src, music.title)}>
                  download
                </span>
                <Duration music={music} />
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default List;

const Duration = ({music}) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(music.src);
    audio.onloadedmetadata = function() {
      if (audio.readyState > 0) {
        setDuration(audio.duration);
      }
    };
  }, [music]);

  return (
    <span className='duration'>{timer(duration)}</span>
  );
};
