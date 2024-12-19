import { useEffect, useState } from 'react';

export const Shop = () => {

    const [text, setText] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const prefectures = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
        "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
        "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
        "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
      ];

    const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPrefecture(e.target.value);
      };

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
            <input type="text" value={text} className="input-text" onChange={(e) => handleChange(e)} />
            <div>地域</div>
            <select value={selectedPrefecture} className="select-dropdown" onChange={(e) => handleSelect(e)}>
                <option value="">未指定</option>
                {prefectures.map((prefecture, index) => (
                <option key={index} value={prefecture}>
                    {prefecture}
                </option>
                ))}
            </select>
            <input
                type="submit"
                value="検索"
                className="submit-button"
                onSubmit={(e) => e.preventDefault()}
            />
            </form>
            </div>
        </>
    )
}