import { useEffect, useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

const YouTubeEmbed = ({ videoId, title = "YouTube 비디오", className = "" }: YouTubeEmbedProps) => {
  const [aspectRatio, setAspectRatio] = useState<string>("56.25%");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setAspectRatio("40%");
      } else if (width < 768) {
        setAspectRatio("50%");
      } else {
        setAspectRatio("56.25%");
      }
    };

    handleResize(); 

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative overflow-hidden mx-auto ${className}`}
      style={{
        paddingBottom: aspectRatio,
        maxWidth: "100%",
      }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;
