import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Genre } from "../models/profile";
import mockUserProfile from "../mock/userProfile";
import HomeLayout from "../components/layouts/HomeLayout";
import { useAuthStore } from "../store/useAuthStore";
import { axiosFetcher } from "../api/axiosFetcher";
import { useModalStore } from "../store/modal";

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
  const [isLoading, setIsLoading] = useState(true);
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    openModal("loading", {
      message: "프로필 정보를 불러오는 중이에요",
      modalPurpose: "profileLoading",
    });

    const fetchUserProfile = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 실제 API 요청으로 교체 필요
        setUserProfile(mockUserProfile);
      } catch (error) {
        console.error("마이페이지 정보 불러오기 실패", error);
      } finally {
        closeModal();
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [openModal, closeModal]);

  const handleDeleteAccount = async () => {
    openModal("customConfirm", {
      title: "기록을 중단하시겠습니까?",
      message: "모든 데이터가 삭제되며 이 작업은 되돌릴 수 없어요",
      confirmText: "탈퇴하기",
      cancelText: "취소하기",
      isDanger: true,
      onConfirm: async () => {
        try {
          const { refreshToken, clearAuth } = useAuthStore.getState();

          if (!refreshToken) {
            alert("토큰이 유효하지 않습니다. 다시 로그인해주세요.");
            return;
          }

          await axiosFetcher.delete("members/mypage/", {
            data: { refresh_token: refreshToken },
          });

          alert("회원 탈퇴가 완료되었습니다.");
          clearAuth();
          navigate("/");
        } catch (error) {
          console.error("회원 탈퇴 실패", error);
          alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
      },
    });
  };

  if (isLoading) {
    return (
      <HomeLayout>
        <div className="flex justify-center items-center w-full h-[55vh]"></div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <h2 className="text-lg font-semibold mb-6">My Page</h2>

      <div className="flex flex-row items-center justify-center gap-6 mb-8">
        <img
          src={userProfile?.profile_image || "/default-profile.png"}
          alt="프로필 이미지"
          className="w-30 h-30 rounded-full object-cover border border-[#A6CCF2]"
        />
        <p className="text-2xl font-semibold ml-12">{userProfile?.nickname}</p>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-30 text-gray-700 max-w-2xl mx-auto">
        <div className="font-medium text-right">이메일</div>
        <div className="text-left">{userProfile?.email}</div>

        <div className="font-medium text-right">선호하는 음악 장르</div>
        <div className="text-left">
          {userProfile?.genres.length ? userProfile.genres.join(", ") : "-"}
        </div>

        <div className="font-medium text-right">한 줄 소개</div>
        <div className="text-left break-words">{userProfile?.bio || "-"}</div>
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
          onClick={handleDeleteAccount}
        >
          회원 탈퇴하기
        </button>
      </div>
    </HomeLayout>
  );
};

export default MyPage;
