import { useState } from 'react';
import { Profile } from "./profile.tsx";
import { Timeline } from "./timeline.tsx";
import { Fav } from "./fav.tsx";
import { TopBar } from "./topbar.tsx";

export const Hub = () => {
    const [activeTab, setActiveTab] = useState<'history' | 'timeline' | 'book'>('history');
    return (
      <>
        <TopBar/>
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