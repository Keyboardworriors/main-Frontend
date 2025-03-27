import { useState } from "react";
import { SearchResult, SearchResponse } from "../models/search";
import { axiosFetcher } from "../api/axiosFetcher";

export const useSearch = () => {
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
        const response = await axiosFetcher.post<SearchResponse>("api/diary/search/", {
          q: searchQuery.trim(),
        });
        setSearchResults(response.diary_list);
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
