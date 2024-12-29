import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShopbyID, getPopularPosts, unlikePost, likePost } from './api';
import { TopBar } from "./topbar.tsx";
import PostCard from './postcard';

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

    const [posts, setPosts] = useState<any>();
    const fetchPosts = async () => {
        try {
          const response = await getPopularPosts("?limit=5&shop_id="+id); 
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

    const handleLike = async (postId:number, userId:number) => {
    try {
        await likePost(postId, userId);
        await fetchPosts();
    } catch (error) {
        console.error('Error liking post:', error);
    }
    };

    const handleUnlike = async (postId:number, userId:number) => {
    try {
        await unlikePost(postId, userId);
        await fetchPosts();
    } catch (error) {
        console.error('Error unliking post:', error);
    }
    };

    useEffect(() => {
        fetchShop();
        fetchPosts();
      }, []);

    return (
        <>
            <TopBar/>
            <div className="profile-container">
            {!(shop && posts)  ? ( // データがない場合のローディング状態を表示
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
            <div className="profile-form">
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
            </div><h2>人気フレーバー</h2>
            <ul className="todo-list">
                {posts.map((post: any) => {
                return (
                <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onUnlike={handleUnlike}
                />
                );
                })}
            </ul>
            </>
            )}
            </div>
        </>
    )
}