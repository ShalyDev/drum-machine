import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css'
import Pad from './components/Pad';
import audioClips from './audioClips'
import { useState, useEffect } from 'react';

function App() {

  const [volume, setVolume] = useState(1);
  const [display, setDisplay] = useState("Tap The Keys!");

  const handlePadClick = (padId) => {
    setDisplay(padId);
  }

  const handleKeyPress = (event) => {
    const pressedKey = event.key.toUpperCase();
    const pad = audioClips.find((clip) => clip.keyTrigger === pressedKey);
    if (pad) {
      setDisplay(pad.id);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioClips.forEach((clip) => {
      clip.volume = newVolume;
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [volume]);

  return (
    <div id='drum-machine' className='drum-machine-container'>

      <div className="pad-bank">
        {audioClips.map(clip => (
          <div className="drum-pad" onClick={() => handlePadClick(clip.id)}>
            <Pad
              key={clip.id}
              clip={clip}
              volume={volume}
            />
          </div>
        ))}
      </div>

      <div id='display'>
        {display}
      </div>
      <div className='volume'>
        <h6>Volume</h6>
        <input
          type='range'
          step='0.01'
          min='0'
          max='1'
          value={volume}
          className='w-10 volume-range'
          onChange={handleVolumeChange}
        />
      </div>

    </div>
  )
}

export default App;