import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from "./../ui/loaders/PlayerLoader";
import DescriptionLoader from "./../ui/loaders/DescriptionLoader";
import Error from "../ui/Error";
import RelatedVideoLoader from "./../ui/loaders/RelatedVideoLoader";

export default function Video() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId);
  // decide what to do:
  let content = null;
  if (isLoading) {
    content = (
      <div>
        <PlayerLoader />
        <DescriptionLoader />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <Error />;
  }
  if (!isLoading && !isError && video.id) {
    content = (
      <div>
        <Player video={video} />
        <Description video={video} />
      </div>
    );
  }
  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>
          {video?.id
            ? <RelatedVideos video={video} />
            : isLoading ? <RelatedVideoLoader /> : <Error />}
        </div>
      </div>
    </section>
  );
}
