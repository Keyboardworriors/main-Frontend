import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import { RefObject } from "react";

interface TopBarProps {
  tabIndex: number;
  showSearch: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  clearSearch: () => void;
  setShowSearch: (show: boolean) => void;
  handleSearchInputRef: (element: HTMLInputElement | null) => void;
  isSearching: boolean;

  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
  handleOpenProfile: () => void;
  handleOpenLogoutConfirm: () => void;
}

const TopBar = ({
  tabIndex,
  showSearch,
  searchQuery,
  setSearchQuery,
  handleSearch,
  clearSearch,
  setShowSearch,
  handleSearchInputRef,
  isSearching,
  showDropdown,
  setShowDropdown,
  dropdownRef,
  handleOpenProfile,
  handleOpenLogoutConfirm,
}: TopBarProps) => {
  return (
    <div className="flex items-center gap-2 ml-auto">
      <SearchBar
        tabIndex={tabIndex}
        showSearch={showSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        setShowSearch={setShowSearch}
        handleSearchInputRef={handleSearchInputRef}
        isSearching={isSearching}
      />
      <UserMenu
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        dropdownRef={dropdownRef}
        handleOpenProfile={handleOpenProfile}
        handleOpenLogoutConfirm={handleOpenLogoutConfirm}
      />
    </div>
  );
};

export default TopBar;
