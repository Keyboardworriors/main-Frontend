import { useState, useRef, useCallback, memo } from "react";
import BaseModal from "./BaseModal";
import { useModalStore } from "../../../store/modal";
import { Music } from "../../../models/diary";

const SongItem = memo(
  ({
    song,
    isSelected,
    playingSongId,
    onSelect,
    onPlayToggle,
  }: {
    song: Music;
    isSelected: boolean;
    playingSongId: string | null;
    onSelect: (id: string) => void;
    onPlayToggle: (e: React.MouseEvent, id: string) => void;
  }) => {
    const isPlaying = playingSongId === song.video_id;
    const playerRef = useRef<HTMLIFrameElement | null>(null);

    const stateClasses = isSelected
      ? "bg-[#A6CCF2] scale-[1.02] shadow-lg"
      : "bg-white hover:bg-[#E2EFFC] hover:scale-[1.02] shadow-md";

    return (
      <div
        onClick={() => onSelect(song.video_id)}
        className={`w-full max-w-[220px] rounded-lg overflow-hidden transition-all cursor-pointer ${stateClasses}`}
      >
        <div className="relative w-full h-[120px] bg-black">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${song.video_id}?autoplay=1&rel=0&controls=1`}
              title={`${song.title} - ${song.artist}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
              ref={playerRef}
            />
          ) : (
            <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover" />
          )}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={(e) => onPlayToggle(e, song.video_id)}
            >
              <div className="w-8 h-8 bg-white bg-opacity-80 text-red-500 rounded-full flex items-center justify-center text-sm">
                ▶
              </div>
            </div>
          )}
        </div>

        <div className="text-center px-2 py-2">
          <p className="font-semibold text-xs text-gray-900 truncate">{song.title}</p>
          <p className="text-[11px] text-gray-600 truncate">{song.artist}</p>
        </div>
      </div>
    );
  },
);

const SongSelectModal = () => {
  const { isOpen, type, data, closeModal, updateModalData } = useModalStore();
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [isHoveringSaveBtn, setIsHoveringSaveBtn] = useState<boolean>(false);

  if (type !== "songSelect" || !isOpen) return null;

  const songs = data?.songs || [];
  const onRetry = data?.onRetry;
  const onConfirm = data?.onConfirm;

  const handleSongSelect = useCallback(
    (songId: string) => {
      setSelectedSongId(songId);
      const selected = songs.find((s) => s.video_id === songId);
      if (selected) {
        updateModalData({ ...data, selectedSong: selected });
      }
    },
    [songs, updateModalData, data],
  );

  const togglePlayback = useCallback((e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    setPlayingSongId((prev) => (prev === songId ? null : songId));
  }, []);

  const handleSave = useCallback(() => {
    if (selectedSongId && onConfirm) {
      onConfirm();
    }
  }, [selectedSongId, onConfirm]);

  return (
    <BaseModal isOpen={isOpen} onClose={closeModal}>
      <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <h2 className="font-bold text-center mb-6 text-xl sm:text-2xl">추천 필로디 🎵</h2>

        <div className="grid grid-cols-3 gap-5 justify-items-center mb-8">
          {songs.map((song) => (
            <SongItem
              key={song.video_id}
              song={song}
              isSelected={selectedSongId === song.video_id}
              playingSongId={playingSongId}
              onSelect={handleSongSelect}
              onPlayToggle={togglePlayback}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 mt-4 relative">
          {selectedSongId && isHoveringSaveBtn && (
            <div className="absolute bottom-full right-0 mb-2 bg-gray-700 text-white px-3 py-2 rounded-lg shadow-lg w-60 text-xs text-left z-50">
              <div className="absolute bottom-[-6px] right-6 transform rotate-45 w-3 h-3 bg-gray-700"></div>
              선택한 음악은 변경할 수 없어요! <br /> 신중히 선택해주세요
            </div>
          )}

          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            다시 시도
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedSongId}
            onMouseEnter={() => setIsHoveringSaveBtn(true)}
            onMouseLeave={() => setIsHoveringSaveBtn(false)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium ${
              selectedSongId
                ? "bg-[#4A7196] text-white hover:bg-[#3b5a7a]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            저장하기
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default SongSelectModal;
