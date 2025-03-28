import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  showSearch: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  clearSearch: () => void;
  setShowSearch: (show: boolean) => void;
  handleSearchInputRef: (element: HTMLInputElement | null) => void;
  isSearching: boolean;
}

const SearchBar = ({
  showSearch,
  searchQuery,
  setSearchQuery,
  handleSearch,
  clearSearch,
  setShowSearch,
  handleSearchInputRef,
  isSearching,
}: SearchBarProps) => {
  return (
    <>
      {showSearch ? (
        <div className="relative flex items-center">
          <input
            ref={handleSearchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="일기를 검색해보세요!"
            className="px-4 py-2 bg-white rounded-full focus:outline-none text-gray-700 text-sm placeholder:text-sm placeholder-gray-500 w-40 md:w-64"
            disabled={isSearching}
          />
          <button
            onClick={clearSearch}
            className="absolute right-2 text-gray-500 hover:text-gray-700"
            aria-label="검색창 닫기"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSearch(true)}
          className="p-2 text-gray-700 hover:text-black focus:outline-none cursor-pointer"
          aria-label="검색창 열기"
        >
          <FaSearch size={18} />
        </button>
      )}
    </>
  );
};

export default SearchBar;
