import { ProfileImageUploaderProps } from "../../models/profile";

function ProfileImageUploader({ profileImage, onImageChange }: ProfileImageUploaderProps) {
  return (
    <div className="mt-8 relative flex flex-col items-center">
      <img
        src={profileImage}
        alt="Profile"
        className="w-60 h-60 rounded-full border border-[#A6CCF2]"
      />
      <label className="mt-10 bg-blue-500 text-white px-4 py-2 rounded-3xl text-sm cursor-pointer">
        프로필 사진 변경
        <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
      </label>
    </div>
  );
}

export default ProfileImageUploader;