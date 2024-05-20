import { PlayContentProps } from "@/types";
import React, { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";

const PlayerContent: React.FC<PlayContentProps> = ({ song, songUrl }) => {
  const player= usePlayer();
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onNextPlay = () => {
    if(player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if(!nextSong) {
      return player.setId(player.ids[0]);
    }

    return player.setId(nextSong);
  }

  const onPrevPlay = () => {
    if(player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if(!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    return player.setId(prevSong);
  }

  const [play, {sound, pause}] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);
      onNextPlay();
    },
    format: ['mp3']
  });

  useEffect(() => {
    sound?.play();

    return() => {
      sound?.unload();
    }
  }, [sound]);

  const handlePlay = () => {
    if(!isPlaying) {
      play();
    }else {
      pause();
    }
  }

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  }

  return (
    <div
      className="
          grid
          grid-cols-2
          md:grid-cols-3
          h-full
        "
    >
      <div
        className="
          flex
          w-full
          justify-start
        "
      >
        <div
          className="
              flex
              items-center
              gap-x-4
            "
        >
          <MediaItem song={song} />
          {/* Need to check */}
          {/* <LikeButton songId={song?.id} /> */}
        </div>
      </div>
      <div
        className="
        flex
        md:hidden
        col-auto
        w-full
        justify-end
        items-center
      "
      >
        <div
          onClick={handlePlay}
          className="
         h-10
         w-10
         flex
         items-center
         justify-center
         rounded-full
         bg-white
         cursor-pointer
         p-1
        "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div
        className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        gap-x-6
        w-full
        max-w-[722px]
      "
      >
        <AiFillStepBackward
          onClick={onPrevPlay}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transistion"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white cursor-pointer p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onNextPlay}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transistion"
        />
      </div>

      <div className="
        hidden
        md:flex
        w-full
        justify-end
        pr-2
      ">
        <div className="
          flex
          items-center
          gap-x-2
          w-[120px]
        ">
          <VolumeIcon onClick={toggleMute} size={30} className="cursor-pointer hover:text-white transistion" />
          <Slider 
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
