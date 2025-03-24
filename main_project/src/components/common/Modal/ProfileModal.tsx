import BaseModal from "./BaseModal";

interface User {
  nickname: string;
  profileImage?: string;
  introduction?: string;
  preferredGenres?: string[];
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  // 장르 태그 렌더링 함수
  const renderGenreTag = (genre: string, index: number) => (
    <span
      key={index}
      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mr-2 mb-2"
    >
      {genre}
    </span>
  );

  // 프로필 헤더 렌더링 함수
  const renderProfileHeader = () => (
    <div className="flex items-center mb-6">
      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={`${user.nickname}의 프로필`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
            {user.nickname?.slice(0, 1).toUpperCase() || "U"}
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{user.nickname || "사용자"}</h2>
    </div>
  );

  // 프로필 소개 렌더링 함수
  const renderProfileIntro = () => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">한 줄 소개</h3>
      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
        {user.introduction || "소개글이 없습니다."}
      </p>
    </div>
  );

  // 음악 장르 섹션 렌더링 함수
  const renderMusicGenres = () => (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">선호하는 음악 장르</h3>
      <div className="flex flex-wrap">
        {user.preferredGenres && user.preferredGenres.length > 0 ? (
          user.preferredGenres.map(renderGenreTag)
        ) : (
          <p className="text-gray-500">선호하는 음악 장르가 없습니다.</p>
        )}
      </div>
    </div>
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="py-2">
        {renderProfileHeader()}
        {renderProfileIntro()}
        {renderMusicGenres()}
      </div>
    </BaseModal>
  );
};

export default ProfileModal;
