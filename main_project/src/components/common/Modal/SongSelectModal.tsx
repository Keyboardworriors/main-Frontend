import { useState, useRef, useCallback, memo } from "react";
import BaseModal from "./BaseModal";
import { Music } from "../../../models/diary";

interface SongSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Music[];
  onConfirm?: (selected: Music) => void;
  onRetry?: () => void;
}

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
    const isValidSong = !!song.video_id;

    const stateClasses = isSelected
      ? "bg-[#A6CCF2] scale-[1.02] shadow-lg"
      : "bg-white hover:bg-[#E2EFFC] hover:scale-[1.02] shadow-md";

    return (
      <div
        onClick={() => isValidSong && onSelect(song.video_id)}
        className={`w-full max-w-[220px] rounded-lg overflow-hidden transition-all ${
          isValidSong ? "cursor-pointer" : "opacity-50 cursor-default"
        } ${stateClasses}`}
      >
        <div className="relative w-full h-[120px] bg-black">
          {isValidSong ? (
            isPlaying ? (
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
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100">
              추천되지 않음
            </div>
          )}
          {isValidSong && !isPlaying && (
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
          <p className="font-semibold text-xs text-gray-900 truncate">
            {song.title?.replace(/^\*/, "") || "제목 없음"}
          </p>
          <p className="text-[11px] text-gray-600 truncate">{song.artist || "아티스트 없음"}</p>
        </div>
      </div>
    );
  },
);

const SongSelectModal = ({ isOpen, onClose, songs, onConfirm, onRetry }: SongSelectModalProps) => {
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [isHoveringSaveBtn, setIsHoveringSaveBtn] = useState<boolean>(false);
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  const filledSongs = [...songs];
  const needToFill = 3 - filledSongs.length;
  if (needToFill > 0) {
    for (let i = 0; i < needToFill; i++) {
      filledSongs.push({
        video_id: "",
        title: "",
        artist: "",
        thumbnail: "",
        embedUrl: "",
      });
    }
  }

  const handleSongSelect = useCallback((songId: string) => {
    setSelectedSongId(songId);
  }, []);

  const togglePlayback = useCallback((e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    setPlayingSongId((prev) => (prev === songId ? null : songId));
  }, []);

  const handleSave = useCallback(() => {
    if (onConfirm) {
      if (selectedSongId) {
        const selected = songs.find((s) => s.video_id === selectedSongId);
        if (selected) {
          onConfirm(selected);
          return;
        }
      }
      onConfirm({
        video_id: "",
        title: "",
        artist: "",
        thumbnail: "",
        embedUrl: "",
      });
    }
  }, [selectedSongId, onConfirm, songs]);

  const hasRealSongs = songs.some((s) => s.video_id);

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-[700px] sm:max-w-[900px] mx-auto px-2 sm:px-6 py-6">
        <h2 className="font-bold text-center mb-6 text-xl sm:text-2xl">추천 필로디 🎵</h2>

        {!hasRealSongs && (
          <p className="text-center text-sm text-gray-500 mb-6">
            추천된 노래가 없어요 😭 다시 시도 또는 음악 없이 저장하려면 <strong>저장하기</strong>를
            눌러주세요
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 justify-items-center mb-8 px-2 sm:px-0">
          {filledSongs.map((song, idx) => (
            <SongItem
              key={idx}
              song={song}
              isSelected={selectedSongId === song.video_id}
              playingSongId={playingSongId}
              onSelect={handleSongSelect}
              onPlayToggle={togglePlayback}
            />
          ))}
        </div>

        <div className="flex flex-row justify-center sm:justify-end gap-3 mt-4 relative flex-wrap">
          {hasRealSongs && selectedSongId && isHoveringSaveBtn && (
            <div className="absolute bottom-full mb-2 bg-gray-700 text-white px-3 py-2 rounded-lg shadow-lg w-60 text-xs text-left z-50" style={{
              right: window.innerWidth > 640 ? '0' : '50%',
              transform: window.innerWidth > 640 ? 'none' : 'translateX(50%)'
            }}>
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
            ref={saveBtnRef}
            onClick={handleSave}
            onMouseEnter={() => setIsHoveringSaveBtn(true)}
            onMouseLeave={() => setIsHoveringSaveBtn(false)}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#4A7196] text-white hover:bg-[#3b5a7a]"
          >
            저장하기
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default SongSelectModal;