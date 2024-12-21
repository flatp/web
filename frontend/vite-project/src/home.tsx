import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate()
    const handleForm = () => {
        navigate('/')
    }
    return (
        <>
            <div className="top-bar">
                <div className="logo" onClick={handleForm}>SHISHA MEMO</div>
                <div className="menu">
                <a href="/shop">Shop</a>
                <a href="/profile">Profile</a>
                </div>
            </div>
            <div className="profile-container">
            <h1>home</h1>
            <h2>キャッチフレーズ</h2>
            <form
                className="profile-form"
                onSubmit={(e) => {e.preventDefault();}}>
                <h2>人気ランキング</h2>
                <select value={""} className="select-dropdown" onChange={(e) => e.preventDefault()}>
                <option value="7days">過去1週間の投稿</option>
                    <option value="30days">過去１ヵ月の投稿</option>
                    <option value="all">全ての投稿</option>１ヵ月
                </select>
            </form>
            </div>
        </>
    )
}