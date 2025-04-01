import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../components/layouts/HomeLayout";
import { useAuthStore } from "../store/useAuthStore";
import { useModalStore } from "../store/modal";
import { UserViewModel } from "../models/user";
import authApi from "../api/authApi";
import { useScrollToTop } from "../hooks/useScrollTopOnMount";

const MyPage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openModal, closeModal } = useModalStore();

  useScrollToTop();

  useEffect(() => {
    openModal("loading", {
      message: "프로필 정보를 불러오는 중이에요",
      modalPurpose: "profileLoading",
    });

    const fetchUserProfile = async () => {
      try {
        const res = await authApi.fetchUserInfo();
        const { user } = useAuthStore.getState();

        setUserProfile({
          nickname: res.nickname,
          bio: res.introduce ?? "",
          genres: res.favorite_genre ?? [],
          email: user?.email ?? "",
          profile_image: user?.profile_image ?? "/default-profile.png",
        });
      } catch (error) {
        console.error("마이페이지 정보 불러오기 실패", error);
        alert("프로필 정보를 불러오는 데 실패했어요.");
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

          await authApi.deleteUser({ refresh_token: refreshToken });

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
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-6 px-4">
        <h2 className="text-lg font-semibold">My Page</h2>
        <button
          onClick={() => navigate("/diary")}
          className="text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-8 text-center">
        <img
          src={userProfile?.profile_image || "/default-profile.png"}
          alt="프로필 이미지"
          className="w-28 h-28 rounded-full object-cover border border-[#A6CCF2]"
        />
        <p className="text-2xl font-semibold">{userProfile?.nickname}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 text-gray-700 max-w-xl mx-auto">
        <div className="font-medium flex justify-start pl-20">이메일</div>
        <div className="flex justify-start pl-20">{userProfile?.email}</div>

        <div className="font-medium flex justify-start pl-20">선호하는 음악 장르</div>
        <div className="grid grid-cols-3 gap-2 pl-20">
          {userProfile?.genres.length ? (
            userProfile.genres.map((genre) => (
              <span
                key={genre}
                className="py-1 bg-blue-100 text-blue-600 rounded-full text-sm text-center whitespace-nowrap"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500 col-span-3">-</span>
          )}
        </div>

        <div className="font-medium flex justify-start pl-20">한 줄 소개</div>
        <div className="flex justify-start break-words pl-20">{userProfile?.bio || "-"}</div>
      </div>

      <div className="flex flex-col items-center justify-center mt-14">
        <button
          onClick={() => navigate("/members/register", { state: { mode: "edit" } })}
          className="px-6 py-2.5 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
        >
          수정하기
        </button>

        <button
          className="mt-6 text-sm text-gray-400 hover:underline"
          onClick={handleDeleteAccount}
        >
          회원 탈퇴하기
        </button>
      </div>
    </HomeLayout>
  );
};

export default MyPage;
