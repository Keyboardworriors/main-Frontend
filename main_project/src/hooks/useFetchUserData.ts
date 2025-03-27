import { useEffect, useState } from "react";
import { axiosFetcher } from "../api/axiosFetcher";

const useFetchUserData = (mode: "create" | "edit") => {
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    if (mode === "edit") {
      const fetchUserData = async () => {
        try {
          const res = await axiosFetcher.get("/api/members/mypage/");
          setEmail(res.social_account.email);
          setProfileImage(res.profile_image);
        } catch (error) {
          console.error("유저 정보를 불러오는 데 실패했습니다.", error);
        }
      };
      fetchUserData();
    }
  }, [mode]);

  return { email, profileImage, setProfileImage };
};

export default useFetchUserData;
