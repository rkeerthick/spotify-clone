"use client";

import { PageContentProps, Song } from "@/types";
import React from "react";
import SongItem from "../../../components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  const handleClick = (id: string) => {
    onPlay(id);
  };

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-col-4 xl:grid-col-5 2xl:grid-col-8 gap-4 mt-4">
      {songs.map((song: Song) => (
        <SongItem key={song.id} onClick={() => handleClick(song.id)} song={song} />
      ))}
    </div>
  );
};

export default PageContent;
