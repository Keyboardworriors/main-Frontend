import { Genre, GenreSelectorProps } from "../../models/profile";

const GENRES: readonly Genre[] = [
  "Electronic",
  "Pop",
  "Ballad",
  "K-pop",
  "Jazz",
  "Rock",
  "Classic",
  "Hip-hop",
  "Country",
] as const;

function GenreSelector({ selectedGenres, onGenreClick }: GenreSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4 w-full">
      {GENRES.map((genre) => (
        <button
          key={genre}
          type="button"
          className={`
            px-3 py-2 rounded-3xl text-sm sm:text-xs
            text-center break-words leading-snug
            ${selectedGenres.includes(genre) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}
          `}
          onClick={() => onGenreClick(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}


export default GenreSelector;
