import { TopBar } from "./topbar.tsx";
import PostCard from './postcard';
import { getPopularPosts, unlikePost, likePost } from './api';
import { useEffect, useState } from "react";

export const Home = () => {
    const [posts, setPosts] = useState<any>();
    const fetchPosts = async () => {
        try {
            const response = await getPopularPosts("?limit=5"); 
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
        fetchPosts();
        }, []);

    return (
        <>
        <TopBar/>
        <div className="profile-container">
        <h1>home</h1>
        <h2>キャッチフレーズ</h2>
        <h2>人気フレーバー</h2>
        {!posts  ? ( // データがない場合のローディング状態を表示
                <p>Loading shop data...</p>
            ) : (
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
        )}
        </div>
        </>
    )
}