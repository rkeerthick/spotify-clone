"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { SongItemProps } from "@/types";
import Image from "next/image";
import React from "react";
import likedImage from "@/assets/liked.png";
import PlayButton from "./PlayButton";

const SongItem: React.FC<SongItemProps> = ({ onClick, song }) => {
  const imagePath = useLoadImage(song);
  if (!song || !onClick) return null;

  return (
    <div
      onClick={() => onClick(song.id)}
      className="
            relative
            group
            flex 
            flex-col
            items-center
            justify-center
            rounded-md
            overflow-hidden
            gap-x-4 bg-neutral-400\5
            cursor-pointer
            hover: bg-neutral-400/10
            transition
            p-3
        "
    >
      <div
        className="
            relative 
            aspect-square 
            w-full 
            h-full 
            rounded-md 
            overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || likedImage}
          alt="image"
          layout="fill"
        />
      </div>
      <div
        className="
            flex
            flex-col
            items-start
            w-full
            pt-4
            gap-y-1
      "
      >
        <p
          className="
            font-semibold
            truncate
            w-full
        "
        >
          {song.title}
        </p>
        <p
          className="
                text-neutral-400
                text-sm
                pb-4
                w-full
                truncate 
            "
        >
          By {song.author}
        </p>
      </div>
      <div
        className="
          absolute
          bottom-24
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
