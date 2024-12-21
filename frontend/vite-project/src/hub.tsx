import { useState } from 'react';
import { Profile } from "./profile.tsx";
import { Timeline } from "./timeline.tsx";
import { Fav } from "./fav.tsx";
import { useNavigate } from "react-router-dom";

export const Hub = () => {
  const navigate = useNavigate()
    const handleForm = () => {
        navigate('/')
    }
    const [activeTab, setActiveTab] = useState<'history' | 'timeline' | 'book'>('history');
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
        <div className="tab-container">
          <button
            className={`tab-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            履歴
          </button>
          <button
            className={`tab-item ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            タイムライン
          </button>
          <button
            className={`tab-item ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            ブックマーク
          </button>
        </div>
        {activeTab === 'history' && <Profile />}
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'book' && <Fav />}
        </div>
      </>
    )
}