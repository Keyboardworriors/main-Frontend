import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosFetcher } from "../api/axiosFetcher";

const useFetchUserData = () => {
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosFetcher.get("/members/mypage/");

        setEmail(res.social_account.email);
        setProfileImage(res.profile_image);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.", error);
        // navigate("/login/");
      }
    };

    fetchUserData();
  }, [navigate]);

  return { email, profileImage, setProfileImage };
};

export default useFetchUserData;
