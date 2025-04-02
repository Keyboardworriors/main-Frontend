import { useNavigate } from "react-router-dom";
import HomeLayout from "../components/layouts/HomeLayout";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className="min-h-[400px] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">⚠️ 404 - 페이지를 찾을 수 없습니다</h1>
        <p className="text-gray-500 mb-2">요청하신 주소가 잘못되었거나 존재하지 않아요.</p>
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 underline hover:text-black transition-colors mt-20"
        >
          홈 화면으로 돌아가기
        </button>
      </div>
    </HomeLayout>
  );
};

export default NotFound;
