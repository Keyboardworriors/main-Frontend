import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/api/diary"); 
  };

  return (
    <div>
      <h2>회원 정보 입력</h2>
      <button onClick={handleSubmit}>완료</button>
    </div>
  );
};

export default ProfileSetup;
