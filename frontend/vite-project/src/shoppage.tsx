import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShopbyID } from './api';
import { TopBar } from "./topbar.tsx";

export const Shoppage = () => {
    const { id } = useParams();

    const [shop, setShop] = useState<any>();

    const fetchShop = async () => {
        try {
          const response = await getShopbyID(Number(id)); 
          setShop(response.data);
        } catch (error) {
          console.error('Error fetching shop:', error);
        }
      };

    useEffect(() => {
        fetchShop();
      }, []);

    return (
        <>
            <TopBar/>
            <div className="profile-container">
            {!shop ? ( // データがない場合のローディング状態を表示
                <p>Loading shop data...</p>
            ) : (
            <>
            <h2>{shop.name}</h2>
            <h3>{shop.location}</h3>
            <div className="profile-form">
            <div>営業時間</div>
            <div>{shop.time}</div>
            </div>
            {shop.url != "" && <a href={shop.url}>HP</a>}
            <div
            className="profile-form">
            <div className="rating-container">
            <div className="rating-label">静か</div>
            <div className="rating-bar">
                {[1, 2, 3, 4, 5].map((level) => (
                <div
                    key={level}
                    className={`rating-segment ${
                    3 === level ? "active" : ""
                    }`}
                ></div>
                ))}
            </div>
            <div className="rating-label">賑やか</div>
            </div>
            <div className="rating-container">
            <div className="rating-label">暗い</div>
            <div className="rating-bar">
                {[1, 2, 3, 4, 5].map((level) => (
                <div
                    key={level}
                    className={`rating-segment ${
                    3 === level ? "active" : ""
                    }`}
                ></div>
                ))}
            </div>
            <div className="rating-label">明るい</div>
            </div>
            <div className="shop-features-table">
            <div className="table-row">
                <div className="table-cell">食事の提供</div>
                <div className="table-divider"></div>
                <div className="table-cell">{shop.mouth ? "有" : "無"}</div>
            </div>
            <div className="table-row">
                <div className="table-cell">アルコール類の提供</div>
                <div className="table-divider"></div>
                <div className="table-cell">{shop.goods ? "有" : "無"}</div>
            </div>
            <div className="table-row">
                <div className="table-cell">マウスピースの販売</div>
                <div className="table-divider"></div>
                <div className="table-cell">{shop.mouth ? "有" : "無"}</div>
            </div>
            <div className="table-row">
                <div className="table-cell">シーシャ機材の販売</div>
                <div className="table-divider"></div>
                <div className="table-cell">{shop.goods ? "有" : "無"}</div>
            </div>
            </div>
            </div>
            <form
                className="profile-form"
                onSubmit={(e) => {e.preventDefault();}}>
                <h2>人気フレーバー</h2>
                <select value={""} className="select-dropdown" onChange={(e) => e.preventDefault()}>
                <option value="7days">過去1週間の投稿</option>
                    <option value="30days">過去１ヵ月の投稿</option>
                    <option value="all">全ての投稿</option>１ヵ月
                </select>
            </form>
            </>
            )}
            </div>
        </>
    )
}