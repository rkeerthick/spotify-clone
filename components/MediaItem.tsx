import useLoadImage from "@/hooks/useLoadImage";
import { MediaItemProps } from "@/types";
import Image from "next/image";
import React from "react";
import likedImage from "@/assets/liked.png";
import usePlayer from "@/hooks/usePlayer";

const MediaItem: React.FC<MediaItemProps> = ({ onClick, song }) => {
  const imageURL = useLoadImage(song);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }
    return player.setId(song.id);
  };


  return (
    <div
      onClick={handleClick}
      className="
            flex
            items-center
            gap-x-3
            cursor-pointer
            hover:bg-neutral-800/50
            w-full
            p-2
            rounded-md
        "
    >
      <div
        className="
                relative
                rounded-md
                min-h-[48px]
                min-w-[48px]
                overflow-hidden
            "
      >
        <Image
          layout="fill"
          src={imageURL || likedImage}
          alt="profile image"
          className="object-cover"
        />
      </div>
      <div
        className="
            flex
            flex-col
            gay-y-1
            overflow-hidden
        "
      >
        <p
          className="
              text-white
              truncate
            "
        >
          {song.title}
        </p>
        <p
          className="
              text-sm
              text-neutral-400
              truncate
            "
        >
          {song.author}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
