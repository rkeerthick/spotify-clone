"use client";

import { useUser } from "@/hooks/useUser";
import { LikedContentProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!user && !isLoading) router.replace("/");
  }, [user, isLoading, router]);

  if (songs.length === 0) {
    return (
      <div
        className="
    flex
    flex-col
    gap-y-2
    w-full
    px-6
    text-neutral-100
    "
      >
        No liked songs.
      </div>
    );
  }

  return (
    <div
      className="
          flex
          flex-col
          gap-y-2
          w-full
          p-6
        "
    >
      {songs.map((song) => (
        <div
          key={song.id}
          className="
                  flex
                  items-center
                  gap-x-4
                  w-full
                "
        >
          <div className="flex-1">
            <MediaItem song={song} onClick={(id: string) => onPlay(song.id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
