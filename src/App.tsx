import { useState, useRef, useEffect } from "react";
import "./App.css";

interface Track {
  name: string;
  fileName: string;
  url: string;
}

export default function App() {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1.0);
 

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const currentTrack = currentIndex !== null ? playlist[currentIndex] : null;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newTracks = Array.from(files).map((file) => ({
      name: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
      url: URL.createObjectURL(file),
    }));
    setPlaylist(newTracks);
    setCurrentIndex(0);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    const next = (currentIndex! + 1) % playlist.length;
    setCurrentIndex(next);
    setIsPlaying(false);
    setRate(1);
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    const prev = (currentIndex! - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prev);
    setIsPlaying(false);
    setRate(1);
  };

}

