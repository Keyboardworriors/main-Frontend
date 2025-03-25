import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Genre } from "../models/profile";
import mockUserProfile from "../mock/userProfile";
import Header from "../components/common/header";
import HomeLayout from "../components/layouts/HomeLayout";

interface UserProfile {
  nickname: string;
  email: string;
  profile_image: string;
  genres: Genre[];
  bio: string;
}

const MyPage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setUserProfile(mockUserProfile);
      } catch (error) {
        console.error("마이페이지 정보 불러오기 실패", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) return <div>로딩 중...</div>;

  return (
    <>
      <Header />
      <HomeLayout>
        <h2 className="text-lg font-semibold mb-6">My Page</h2>

        <div className="flex flex-row items-center justify-center gap-6 mb-8">
          <img
            src={userProfile.profile_image || "/default-profile.png"}
            alt="프로필 이미지"
            className="w-30 h-30 rounded-full object-cover border border-[#A6CCF2]"
          />
          <p className="text-2xl font-semibold ml-12">{userProfile.nickname}</p>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-30 text-gray-700 max-w-2xl mx-auto">
          <div className="font-medium text-right">이메일</div>
          <div className="text-left">{userProfile.email}</div>

          <div className="font-medium text-right">선호하는 음악 장르</div>
          <div className="text-left">
            {userProfile.genres.length > 0 ? userProfile.genres.join(", ") : "-"}
          </div>

          <div className="font-medium text-right">한 줄 소개</div>
          <div className="text-left break-words">{userProfile.bio || "-"}</div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => navigate("/members/register", { state: { mode: "edit" } })}
            className="mt-16 px-6 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
          >
            수정하기
          </button>

          <button
            className="mt-10 text-sm text-gray-400 hover:underline"
            onClick={() => alert("회원 탈퇴 기능은 준비 중입니다.")}
          >
            회원 탈퇴하기
          </button>
        </div>
      </HomeLayout>
    </>
  );
};

export default MyPage;
