import React, { useState, useRef } from "react";
import BaseModal from "./BaseModal";
import SongAnalysisErrorModal from "./SongAnalysisErrorModal";
import { useModalStore } from "../../../store/modal";
import { Music } from "../../../models/diary";

// 테스트용 더미 노래 데이터
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

const SongSelectModal = () => {
  const { isOpen, type, data, closeModal, updateModalData } = useModalStore();
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [isHoveringSaveBtn, setIsHoveringSaveBtn] = useState(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);

  if (type !== "songSelect" || !isOpen) return null;

  // 추후 API 연동 시
  const songs = data?.songs && data.songs.length > 0 ? data.songs : dummySongs;
  const onRetry = data?.onRetry;
  const onConfirm = data?.onConfirm;

  // 추천 실패 시 에러 모달
  if (songs.length === 0) {
    return <SongAnalysisErrorModal isOpen={true} onClose={closeModal} onRetry={onRetry} />;
  }

  const handleSongSelect = (songId: string) => {
    setSelectedSongId(songId);

    const selectedSong = songs.find((song) => song.video_id === songId);
    if (selectedSong) {
      updateModalData({
        selectedSong,
      });
    }
  };

  const handleSave = () => {
    if (selectedSongId && onConfirm) {
      onConfirm();
    }
  };

  const togglePlayback = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();

    if (playingSongId === songId) {
      setPlayingSongId(null);
    } else {
      if (playingSongId) {
        setPlayingSongId(null);
        setTimeout(() => {
          setPlayingSongId(songId);
        }, 100);
      } else {
        setPlayingSongId(songId);
      }
    }
  };

  const renderSongItem = (song: Music) => {
    const isSelected = selectedSongId === song.video_id;
    const isHovered = hoveredSongId === song.video_id;
    const isPlaying = playingSongId === song.video_id;

    return (
      <div
        key={song.video_id}
        onClick={() => handleSongSelect(song.video_id)}
        onMouseEnter={() => setHoveredSongId(song.video_id)}
        onMouseLeave={() => setHoveredSongId(null)}
        style={{
          width: "250px",
          height: "300px",
          margin: "0 10px 20px",
          boxSizing: "border-box",
          backgroundColor: isSelected ? "#A6CCF2" : isHovered ? "#E2EFFC" : "#F3F4F6",
          transition: "all 0.3s ease",
        }}
        className={`cursor-pointer flex flex-col rounded-lg p-4 ${
          isSelected || isHovered ? "scale-105" : "scale-100"
        } transition-all duration-300 ease-in-out shadow-sm relative`}
      >
        {/* 썸네일 영역 */}
        <div
          className="relative w-full overflow-hidden rounded-md mb-4"
          style={{ height: "240px" }}
        >
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${song.video_id}?autoplay=1&rel=0`}
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

          {/* 재생/정지 버튼 */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => togglePlayback(e, song.video_id)}
          >
            <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center transition-opacity hover:opacity-90">
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* 노래 정보 영역 */}
        <div className="w-full text-center flex-grow">
          <h3 className="font-bold text-2xl text-gray-800 mb-2">{song.title}</h3>
          <p className="text-lg text-gray-600 mb-4">{song.artist}</p>
        </div>
      </div>
    );
  };

  return (
    <BaseModal isOpen={isOpen} onClose={closeModal}>
      <div className="p-4 md:p-8 mx-auto relative" style={{ width: "100%" }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">추천 필로디 🎵</h2>

        <div className="mb-6 md:mb-10">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {songs.map((song) => renderSongItem(song))}
          </div>
        </div>

        <div className="flex justify-end gap-4 md:gap-6 mt-6 md:mt-10 relative">
          {/* 말풍선 */}
          {selectedSongId && isHoveringSaveBtn && (
            <div className="absolute bottom-full right-0 mb-4 bg-gray-700 text-white px-4 py-3 rounded-lg shadow-lg w-64 text-left">
              <div className="absolute bottom-[-6px] right-8 transform rotate-45 w-4 h-4 bg-gray-700"></div>
              선택한 음악은 변경할 수 없어요!
              <br />
              신중히 선택해주세요
            </div>
          )}

          <button
            onClick={closeModal}
            className="px-6 md:px-10 py-3 md:py-4 rounded-full border-2 border-gray-700 bg-white text-gray-700 font-medium text-lg md:text-xl hover:bg-gray-50 transition-colors min-w-[140px] md:min-w-[180px] shadow-md"
          >
            다시 시도
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedSongId}
            onMouseEnter={() => setIsHoveringSaveBtn(true)}
            onMouseLeave={() => setIsHoveringSaveBtn(false)}
            className={`px-6 md:px-10 py-3 md:py-4 rounded-full font-medium text-lg md:text-xl transition-colors min-w-[140px] md:min-w-[180px] shadow-md ${
              selectedSongId
                ? "bg-[#7698CC] text-white hover:bg-[#6387BB]"
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
