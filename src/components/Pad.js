import React, { useEffect, useState } from "react";

export default function Pad({ clip, volume }) {

    const [active, setActive] = useState(false);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => { document.removeEventListener('keydown', handleKeyPress); }
    },)

    const handleKeyPress = (e) => {
        if (e.keyCode === clip.keyCode) {
            playSound();
        }
    };

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(() => setActive(false), 200);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
    };

    return (
        <div onClick={playSound} className={`btn btn-secondary w-90 h-90 p-4 m-1 ${active && 'btn-danger'} pad-btn`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    );
}  