import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const fetchKakaoUser = async (code) => {
    const response = await axios.post("http://127.0.0.1:8000/oauth/kakao/callback/", {code})
    return response.data
}

const KakaoCallback = () => {
    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    const {data, isLoading, isError} = useQuery({
        queryKey: ["KakaoLogin", code],
        queryFn : ()=> fetchKakaoUser(code),
        enabled: !!code, //code 가 있을 때만 실행
    })

    useEffect(() => {
        if(data) {
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            if(data.user.isFirstLogin) {
                navigate("/ProfileSetup")
            } else {
                navigate("/DiaryHome")
            }
        }
    }, [data, navigate])

    if (isLoading) return <div>로그인 중...</div>
    if (isError) return <div>로그인 실패</div>

    return <div>로그인 처리 중...</div>
}

export default KakaoCallback