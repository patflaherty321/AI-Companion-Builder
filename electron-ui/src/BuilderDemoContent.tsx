import React, { useState, useEffect } from 'react';

interface BuilderDemoContentProps {
  className?: string;
}

const BuilderDemoContent: React.FC<BuilderDemoContentProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const demoTabs = [
    { id: 'overview', label: '🏠 Overview', icon: '🏠' },
    { id: 'features', label: '⚡ Features', icon: '⚡' },
    { id: 'avatars', label: '🎭 Avatars', icon: '🎭' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
  ];

  const avatarCards = [
    { name: 'Einstein', emoji: '🧠', specialty: 'Physics & Science', status: 'online' },
    { name: 'Bob Ross', emoji: '🎨', specialty: 'Art & Creativity', status: 'online' },
    { name: 'Carmen', emoji: '🌎', specialty: 'Geography & Travel', status: 'busy' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content overview">
            <h3>🌟 Builder.io Enhanced Avatar Chat</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-value">1,247</div>
                <div className="stat-label">Conversations</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎭</div>
                <div className="stat-value">5</div>
                <div className="stat-label">AI Avatars</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
            
            <div className="progress-section">
              <h4>System Performance</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <p>Real-time system metrics: {progress}%</p>
            </div>
          </div>
        );
        
      case 'features':
        return (
          <div className="tab-content features">
            <h3>⚡ Powerful Features</h3>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <div>
                  <strong>Real-time Animation</strong>
                  <p>Wav2Lip technology brings avatars to life</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🧠</span>
                <div>
                  <strong>GPT-4 Integration</strong>
                  <p>Advanced AI conversations with context</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <div>
                  <strong>Builder.io Components</strong>
                  <p>Dynamic, customizable UI elements</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌐</span>
                <div>
                  <strong>Cross-Platform</strong>
                  <p>Works on Windows, Mac, and Linux</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'avatars':
        return (
          <div className="tab-content avatars">
            <h3>🎭 Available Avatars</h3>
            <div className="avatar-grid">
              {avatarCards.map((avatar, index) => (
                <div key={index} className={`avatar-card ${avatar.status}`}>
                  <div className="avatar-emoji">{avatar.emoji}</div>
                  <h4>{avatar.name}</h4>
                  <p className="avatar-specialty">{avatar.specialty}</p>
                  <div className={`status-indicator ${avatar.status}`}>
                    {avatar.status === 'online' ? '🟢 Online' : '🟡 Busy'}
                  </div>
                  <button className="chat-btn" onClick={startAnimation}>
                    💬 Start Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="tab-content settings">
            <h3>⚙️ Configuration</h3>
            <div className="settings-section">
              <div className="setting-item">
                <label>Voice Synthesis Quality</label>
                <select className="setting-select">
                  <option>High Quality (ElevenLabs)</option>
                  <option>Standard Quality</option>
                  <option>Fast Processing</option>
                </select>
              </div>
              
              <div className="setting-item">
                <label>Animation Speed</label>
                <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="setting-slider" />
              </div>
              
              <div className="setting-item">
                <label>Auto-save Conversations</label>
                <input type="checkbox" defaultChecked className="setting-checkbox" />
              </div>
              
              <div className="setting-item">
                <label>Builder.io Theme</label>
                <div className="theme-options">
                  <button className="theme-btn active">🌟 Gradient</button>
                  <button className="theme-btn">🌙 Dark</button>
                  <button className="theme-btn">☀️ Light</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className={`builder-demo-content ${className} ${isAnimating ? 'animating' : ''}`}>
      <div className="demo-header">
        <h2>🎨 Builder.io Content Showcase</h2>
        <p>Interactive UI components demonstrating Builder.io capabilities</p>
      </div>
      
      <div className="demo-tabs">
        {demoTabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="demo-content">
        {renderTabContent()}
      </div>
      
      <div className="demo-footer">
        <button className="action-btn primary" onClick={startAnimation}>
          ✨ Trigger Animation
        </button>
        <button className="action-btn secondary">
          📊 View Analytics
        </button>
        <button className="action-btn secondary">
          🔄 Refresh Content
        </button>
      </div>
    </div>
  );
};

export default BuilderDemoContent;
