import { TopBar } from "./topbar.tsx";

export const Home = () => {
    return (
        <>
            <TopBar/>
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