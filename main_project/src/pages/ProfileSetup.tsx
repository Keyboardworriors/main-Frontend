import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/main_project/DiaryHome"); // 정보 입력 후 다이어리 홈으로 이동
  };

  return (
    <div>
      <h2>회원 정보 입력</h2>
      <button onClick={handleSubmit}>완료</button>
    </div>
  );
};

export default ProfileSetup;
