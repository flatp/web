import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate()
    const handleForm = () => {
        navigate('/Profile')
    }
    return (
        <>
            <div className="top-bar">
                <div className="logo">SHISHA MEMO</div>
                <div className="menu">
                <a href="/">Home</a>
                <a href="/profile">Profile</a>
                </div>
            </div>
            <div className="profile-container">
            <form
            className="profile-form"
            onSubmit={(e) => {e.preventDefault();}}>
            <h2>店舗検索</h2>
            <div>店名</div>
            <input type="text" value={""} className="input-text" onChange={(e) => e.preventDefault()} />
            <div>地域</div>
            <select value={""} className="select-dropdown" onChange={(e) => e.preventDefault()}>
                <option value="SHISHA CAFE VELVET KYOTO">SHISHA CAFE VELVET KYOTO</option>
                <option value="水たばこ喫茶ソワカ">水たばこ喫茶ソワカ</option>
                <option value="SHEESHA CAFE Moch Pit">SHEESHA CAFE Moch Pit</option>
                <option value="Shisha cafe & bar home is">Shisha cafe & bar home is</option>
            </select>
            <input
                type="submit"
                value="検索"
                className="submit-button"
                onSubmit={(e) => e.preventDefault()}
            />
            </form>
            <form
                className="profile-form"
                onSubmit={(e) => {e.preventDefault();}}>
                <h2>ランキング</h2>
            </form>
            </div>
        </>
    )
}