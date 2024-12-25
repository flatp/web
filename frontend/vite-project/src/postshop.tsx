import { TopBar } from "./topbar.tsx";

export const PostShop = () => {
    return (
        <>
        <TopBar/>
        <form
            className="profile-form"
            onSubmit={(e) => {
            e.preventDefault();
        }}>
            <div>店舗名</div>
            <input type="text" value={""} className="input-text" onChange={(e) => e.preventDefault()} />
            <div>都道府県</div>
            <input type="text" value={""} className="input-text" onChange={(e) => e.preventDefault()} />
            <div>アクセス</div>
            <input type="text" value={""} className="input-text" onChange={(e) => e.preventDefault()} />
            <div>営業時間</div>
            <input type="text" value={""} className="input-text" onChange={(e) => e.preventDefault()} />
            <input
                type="submit"
                value="追加"
                className="submit-button"
                onSubmit={(e) => e.preventDefault()}
            />
        </form>
        </>
    );
  };