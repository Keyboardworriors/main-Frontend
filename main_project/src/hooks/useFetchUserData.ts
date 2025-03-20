import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../models/type";

const useFetchUserData = () => {
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/members/register");
        const {
          access_token,
          refresh_token,
          user,
        }: { access_token: string; refresh_token: string; user: User } = response.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token); //token 이 페이지에서 안받아올 수도 있음

        setEmail(user.email);
        setProfileImage(user.profile_image);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.", error);
        // alert("사용자 정보를 불러오는 데 실패했습니다. 다시 로그인해주세요.");
        // navigate("/login");
      }
    };

    fetchUserData();
  }, []); //로그인 api 연결 후 [navigate]로 수정해야함.

  return { email, profileImage, setProfileImage };
};

export default useFetchUserData;
