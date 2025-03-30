interface Props {
  profileImage: string;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const ProfileImageUploader = ({ profileImage, onImageChange, disabled = false }: Props) => {
  return (
    <div className="relative w-50 h-50 rounded-full overflow-hidden border-2 border-gray-300">
      {profileImage ? (
        <img src={profileImage} alt="프로필 이미지" className="object-cover w-full h-full" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
          이미지 없음
        </div>
      )}
      {!disabled && (
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      )}
    </div>
  );
};

export default ProfileImageUploader;
