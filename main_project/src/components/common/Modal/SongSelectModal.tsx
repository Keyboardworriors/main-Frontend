import { useState, useRef, useCallback, memo } from "react";
import BaseModal from "./BaseModal";
import SongAnalysisErrorModal from "./SongAnalysisErrorModal";
import { useModalStore } from "../../../store/modal";
import { Music } from "../../../models/diary";
import { SongModalStyles } from "../../../models/constants";

// 개발 환경에서만 사용할 더미 데이터 (API 연결 후 제거 예정)
const dummySongs: Music[] = [
  {
    video_id: "4Tr0otuiQuU",
    title: "Moonlight Sonata",
    artist: "Beethoven",
    thumbnail: "https://i.ytimg.com/vi/4Tr0otuiQuU/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/4Tr0otuiQuU",
  },
  {
    video_id: "9E6b3swbnWg",
    title: "Clair de Lune",
    artist: "Debussy",
    thumbnail: "https://i.ytimg.com/vi/9E6b3swbnWg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/9E6b3swbnWg",
  },
  {
    video_id: "lO9d-AJai8Q",
    title: "The Four Seasons",
    artist: "Vivaldi",
    thumbnail: "https://i.ytimg.com/vi/lO9d-AJai8Q/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/lO9d-AJai8Q",
  },
];

interface SongItemProps {
  song: Music;
  isSelected: boolean;
  playingSongId: string | null;
  onSelect: (id: string) => void;
  onPlayToggle: (e: React.MouseEvent, id: string) => void;
}

const SongItem = memo(
  ({ song, isSelected, playingSongId, onSelect, onPlayToggle }: SongItemProps) => {
    const isPlaying = playingSongId === song.video_id;
    const playerRef = useRef<HTMLIFrameElement | null>(null);

    const { CARD_BASE, CARD_SIZE, THUMBNAIL_HEIGHT, PLAY_BUTTON } = SongModalStyles;

    const stateClasses = isSelected
      ? "bg-[#A6CCF2] scale-105"
      : "bg-[#F3F4F6] hover:bg-[#E2EFFC] hover:scale-105";

    return (
      <div
        onClick={() => onSelect(song.video_id)}
        data-song-id={song.video_id}
        className={`${CARD_BASE} ${CARD_SIZE} ${stateClasses}`}
      >
        <div className={`relative w-full overflow-hidden rounded-md ${THUMBNAIL_HEIGHT}`}>
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${song.video_id}?autoplay=1&rel=0&controls=1`}
              title={`${song.title} - ${song.artist}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              ref={playerRef}
            />
          ) : (
            <img
              src={song.thumbnail}
              alt={`${song.title} 썸네일`}
              className="w-full h-full object-cover"
            />
          )}

          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={(e) => onPlayToggle(e, song.video_id)}
            >
              <div className={PLAY_BUTTON}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="w-full text-center flex-grow-0 mt-2 mb-1 md:mt-3 md:mb-2">
          <h3 className="font-bold text-gray-800 truncate text-xs mb-0 sm:text-xs md:text-sm md:mb-1 lg:text-base">
            {song.title}
          </h3>
          <p className="text-gray-600 truncate text-xs md:text-sm">{song.artist}</p>
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

  const { BUTTON_BASE, BUTTON_CANCEL, BUTTON_SAVE_ACTIVE, BUTTON_SAVE_INACTIVE } = SongModalStyles;

  const handleSongSelect = useCallback(
    (songId: string) => {
      setSelectedSongId(songId);

      const songs = data?.songs || [];
      const selectedSong = songs.find((song) => song.video_id === songId);

      if (selectedSong) {
        updateModalData({
          ...data,
          selectedSong: selectedSong,
        });
      }
    },
    [data, updateModalData],
  );

  const togglePlayback = useCallback((e: React.MouseEvent, songId: string) => {
    e.stopPropagation();

    setPlayingSongId((prevId) => {
      if (prevId === songId) return null;

      if (prevId) {
        setTimeout(() => setPlayingSongId(songId), 100);
        return null;
      } else {
        return songId;
      }
    });
  }, []);

  const handleSave = useCallback(() => {
    if (selectedSongId && data?.onConfirm) {
      data.onConfirm();
    }
  }, [selectedSongId, data]);

  if (type !== "songSelect" || !isOpen) return null;

  // 개발 중에만 더미 데이터 사용, 추후 제거 예정
  const songs =
    process.env.NODE_ENV === "production"
      ? data?.songs || []
      : data?.songs?.length
        ? data.songs
        : dummySongs;

  const onRetry = data?.onRetry;

  // API 연동 후에는 data?.songs
  const noSongsFound = data?.songs && data.songs.length === 0;
  if (noSongsFound) {
    return <SongAnalysisErrorModal isOpen={true} onClose={closeModal} onRetry={onRetry} />;
  }

  const cancelButtonClasses = `${BUTTON_BASE} ${BUTTON_CANCEL}`;
  const saveButtonClasses = `${BUTTON_BASE} ${
    selectedSongId ? BUTTON_SAVE_ACTIVE : BUTTON_SAVE_INACTIVE
  }`;

  return (
    <BaseModal isOpen={isOpen} onClose={closeModal}>
      <div className="p-2 sm:p-3 mx-auto relative w-full">
        <h2 className="font-bold text-center mb-3 md:mb-4 md:text-2xl">추천 필로디 🎵</h2>

        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap justify-center items-start">
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
        </div>

        <div className="flex justify-center md:justify-end gap-3 mt-3 relative">
          {selectedSongId && isHoveringSaveBtn && (
            <div className="absolute bottom-full right-[calc(50%-40px)] md:right-0 mb-2 bg-gray-700 text-white px-2 py-1.5 rounded-lg shadow-lg w-40 sm:w-44 md:w-56 text-xs md:text-sm text-left">
              <div className="absolute bottom-[-6px] right-[40px] md:right-8 transform rotate-45 w-3 h-3 bg-gray-700"></div>
              선택한 음악은 변경할 수 없어요!
              <br />
              신중히 선택해주세요
            </div>
          )}

          <button onClick={closeModal} className={cancelButtonClasses}>
            다시 시도
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedSongId}
            onMouseEnter={() => setIsHoveringSaveBtn(true)}
            onMouseLeave={() => setIsHoveringSaveBtn(false)}
            className={saveButtonClasses}
          >
            저장하기
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default SongSelectModal;
