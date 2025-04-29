import React from 'react'

const VideoPlayer = ({videoLink } : {videoLink : string}) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-purple-200">
        <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={videoLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
        ></iframe>
    </div>
  )
}

export default VideoPlayer