import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import Image from "next/image";
import like_image from "@/assets/liked.png";
import getSongs from "@/actions/getSongs";
import PageContent from "@/app/(site)/components/PageContent";
import Error from "./error";

export default async function Home() {
  const songs = await getSongs();
  
  // throw new Error("Test!");

  return (
    <div className="bg-neutral-900 w-full h-full rounded-lg overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-2">
          <h1 className="text-white text-3xl font-semibold">Welcome, back</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem href="liked" image={like_image} name="Liked song" />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <p className="text-white text-2xl font-semibold">Newest Songs</p>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
