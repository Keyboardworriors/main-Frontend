import { useState } from "react";
import { SearchResult } from "../models/search";
import diaryApi from "../api/diaryApi";

interface UseSearchResult {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  searchResults: SearchResult[];
  clearSearch: () => void;
  handleSearchInputRef: (element: HTMLInputElement | null) => void;
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
}

export const useSearch = (): UseSearchResult => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
    setIsSearching(false);
    setSearchResults([]);
  };

  const handleSearchInputRef = (element: HTMLInputElement | null) => {
    if (element && showSearch) {
      element.focus();
    }
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setIsSearching(true);
      try {
        const response = await diaryApi.searchDiaries(searchQuery.trim());
        setSearchResults(response.data);
      } catch (error) {
        console.error("검색 실패:", error);
        alert("검색 중 오류가 발생했습니다.");
      } finally {
        setIsSearching(false);
      }
    }
  };

  return {
    showSearch,
    setShowSearch,
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    clearSearch,
    handleSearchInputRef,
    handleSearch,
  };
};
