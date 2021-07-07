import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import YouTubeIframeLoader from 'youtube-iframe';

export const useYoutubeIFrameApi = (id) => {
  const playerRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const container = document.createElement('div');
    container.id = id;
    container.style.display = 'none';
    document.body.append(container);
    
    YouTubeIframeLoader.load(yt => {
      const player = new yt.Player(id,
        { videoId: id,
          events: {onReady: ytData => getYoutubeData(ytData) }
        }
      );

      playerRef.current = player;
    })
  }, [])
  
  useEffect(() => {
    if (data) {
      playerRef.current.destroy();
      const container = document.getElementById(id);
      document.body.removeChild(container);
    }
  }, [data])
  
  function getYoutubeData(ytData) {
    setData({
      ...ytData.target.getVideoData(),
      cover: `https://img.youtube.com/vi/${id}/0.jpg`
    });
  }
  
  return data;
}