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
    <div className="grid grid-cols-3 auto-rows-auto gap-6 mt-4">
      {GENRES.map((genre) => (
        <button
          key={genre}
          type="button"
          className={`
            px-4 py-3 rounded-3xl text-sm md:text-base
            text-center break-keep max-w-full truncate
            transition-transform duration-200 hover:-translate-y-0.5
            ${
              selectedGenres.includes(genre)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }
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
