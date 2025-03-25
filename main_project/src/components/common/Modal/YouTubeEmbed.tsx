interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

const YouTubeEmbed = ({ videoId, title = "YouTube 비디오" }: YouTubeEmbedProps) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
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
