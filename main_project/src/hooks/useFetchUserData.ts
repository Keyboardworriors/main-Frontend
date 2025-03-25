import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosFetcher } from "../api/axiosFetcher";
import { useAuthStore } from "../store/useAuthStore";

const useFetchUserData = () => {
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          access_token,
          refresh_token,
          user,
        } = await axiosFetcher.get("/api/members/register");

        // Zustand store + localStorage 업데이트
        setAuth(access_token, refresh_token, user);

        setEmail(user.email);
        setProfileImage(user.profile_image);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.", error);
        // alert("사용자 정보를 불러오는 데 실패했습니다. 다시 로그인해주세요."); 서버 연결 후 수정
        // navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate, setAuth]);

  return { email, profileImage, setProfileImage };
};

export default useFetchUserData;
