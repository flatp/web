import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate()
    const handleForm = () => {
        navigate('/Profile')
    }
    return (
            <button onClick={handleForm}>投稿画面へ</button>
    )
}