import { useState } from 'react';
import { Profile } from "./profile.tsx";
import { Timeline } from "./timeline.tsx";

export const Hub = () => {
    const [activeTab, setActiveTab] = useState<'history' | 'timeline'>('history');
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
            className={`tab-item ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            ブックマーク
          </button>
        </div>
        {activeTab === 'history' && <Profile />}
        {activeTab === 'timeline' && <Timeline />}
        </div>
      </>
    )
}