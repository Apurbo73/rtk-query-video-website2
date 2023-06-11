import { useGetRelatedVideosQuery } from "../../../features/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ video }) {
  const { id, title } = video;
  const {
    data: relatedVideos,
    isLoading,
    isError,
    error
  } = useGetRelatedVideosQuery({ id, title });
  //decide what to render:
  let content = null;
  if (isLoading) {
    content = <RelatedVideoLoader />;
  }
  if (!isLoading && isError) {
    content = <Error />;
  }
  if (!isLoading && !isError && relatedVideos.length === 0) {
    content = (
      <div>
        <h3>No related videos found .....</h3>
      </div>
    );
  }
  if (!isLoading && !isError && relatedVideos.length > 0) {
    content = relatedVideos.map(videos =>
      <RelatedVideo key={videos.id} videos={videos} />
    );
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
