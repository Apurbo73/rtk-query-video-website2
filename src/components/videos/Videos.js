import { useGetVideosQuery } from "../../features/apiSlice";
import Video from "./Video";
import VideoLoader from './../ui/loaders/VideoLoader';
import Error from '../ui/Error';


export default function Videos() {
    const {data:videos, isLoading, isError, error}= useGetVideosQuery();
    // decide what to render:
    let content = null;
    if(isLoading){
        content= <VideoLoader></VideoLoader>
    }
    if(!isLoading && isError){
        content= <Error></Error>
    }
    if(!isLoading && !isError && videos.length>0){
        content= videos.map((video)=><Video key={video.id} video={video}/>
        )
    }
    return (
        <>
           {content}        
        </>
    );
}
