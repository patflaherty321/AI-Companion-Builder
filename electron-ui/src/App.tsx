import React, { useState, useEffect } from 'react';
import './App.css';
import BuilderIntegration, { BuilderUrlComponent } from './BuilderComponent';
import BuilderExplorer from './BuilderExplorer';
import CustomBuilderComponent from './CustomBuilderComponent';
import { BuilderConfig, getContentId, getModel, logConfig } from './BuilderConfig';

interface Avatar {
  name: string;
  filename: string;
}

const App: React.FC = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('builder-page');
  // Check backend health and load avatars
  useEffect(() => {
    const initializeApp = async () => {
      // Log Builder.io configuration for debugging
      logConfig();
      
      try {
        await checkBackendHealth();
        await loadAvatars();
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // Use mock data for testing
        setAvatars([
          { name: 'Philosophy - Einstein', filename: 'Philosophy' },
          { name: 'Art - Bob Ross', filename: 'Art' },
          { name: 'Travel - Carmen Sandiego', filename: 'Travel' }
        ]);
        setIsBackendReady(true);
      }
    };
    
    initializeApp();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch('http://localhost:5000/avatars');
      if (response.ok) {
        setIsBackendReady(true);
        return true;
      }
    } catch (error) {
      console.error('Backend not ready:', error);
    }
    setIsBackendReady(false);
    return false;
  };

  const loadAvatars = async () => {
    try {
      const response = await fetch('http://localhost:5000/avatars');
      if (response.ok) {
        const data = await response.json();
        if (data.avatars && data.avatars.length > 0) {
          setAvatars(data.avatars);
          return true;
        }
      }
    } catch (error) {
      console.error('Failed to load avatars:', error);
    }
    return false;
  };

  if (!isBackendReady) {
    return (
      <div className="app-container loading">
        <div className="loading-content">
          <h1>🤖 AI Avatar Chat - Builder.io Integration</h1>
          <p>Connecting to backend...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🤖 AI Avatar Chat - Builder.io Integration</h1>
        <p>Your Builder.io designs integrated with the modernized Avatar-ANIM application</p>
        
        <div className="section-nav">
          <button 
            className={activeSection === 'builder-page' ? 'active' : ''}
            onClick={() => setActiveSection('builder-page')}
          >
            🎨 Your Builder.io Page
          </button>
          <button 
            className={activeSection === 'builder-components' ? 'active' : ''}
            onClick={() => setActiveSection('builder-components')}
          >
            🧩 Builder.io Components
          </button>
          <button 
            className={activeSection === 'explorer' ? 'active' : ''}
            onClick={() => setActiveSection('explorer')}
          >
            🔍 Content Explorer
          </button>
          <button 
            className={activeSection === 'custom' ? 'active' : ''}
            onClick={() => setActiveSection('custom')}
          >
            ⚙️ Custom Components
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Backend Status */}
        <div className="backend-status">
          <div className="status-item">
            <span className="status-label">Backend:</span>
            <span className="status-value">{isBackendReady ? '✅ Connected' : '❌ Disconnected'}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Available Avatars:</span>
            <span className="status-value">{avatars.length}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Builder.io API:</span>
            <span className="status-value">✅ Configured</span>
          </div>
        </div>

        {/* Builder.io Content Sections */}
        {activeSection === 'builder-page' && (
          <div className="content-section">
            <h2>🎨 Your Builder.io Page Design</h2>
            <p>This section displays your actual Builder.io page content. Update the contentId below to match your Builder.io page ID.</p>
              <div className="builder-page-container">
              <BuilderIntegration 
                model={getModel('page')} 
                contentId={getContentId('main-page')}
                className="main-page-content"
              />
            </div>
            
            <div className="integration-info">
              <h3>📝 Integration Instructions:</h3>
              <ol>
                <li>Replace <code>"your-page-content-id"</code> with your actual Builder.io content ID</li>
                <li>Connect this GitHub repo to your Builder.io space</li>
                <li>Create or edit content in Builder.io visual editor</li>
                <li>Content will automatically sync with your application</li>
              </ol>
            </div>
          </div>
        )}

        {activeSection === 'builder-components' && (
          <div className="content-section">
            <h2>🧩 Builder.io Component Integration</h2>
            <p>This section shows how to integrate Builder.io components for specific features like avatar chat interfaces.</p>
              <div className="component-showcase">
              <div className="component-item">
                <h3>Avatar Chat Interface</h3>
                <BuilderIntegration 
                  model={getModel('component')} 
                  contentId={getContentId('avatar-showcase')}
                  className="avatar-chat-component"
                />
              </div>
              
              <div className="component-item">
                <h3>Avatar Selection Panel</h3>
                <BuilderIntegration 
                  model={getModel('component')} 
                  contentId={getContentId('avatar-showcase')}
                  className="avatar-selection-component"
                />
              </div>
              
              <div className="component-item">
                <h3>Settings Dashboard</h3>
                <BuilderIntegration 
                  model={getModel('component')} 
                  contentId={getContentId('settings')}
                  className="settings-component"
                />
              </div>
            </div>
            
            <div className="available-avatars">
              <h3>Available Avatars from Backend:</h3>
              <div className="avatar-grid">
                {avatars.map(avatar => (
                  <div key={avatar.filename} className="avatar-card">
                    <h4>{avatar.name}</h4>
                    <p>Filename: {avatar.filename}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'explorer' && (
          <div className="content-section">
            <h2>🔍 Builder.io Content Explorer</h2>
            <p>Explore and manage your Builder.io content. This tool helps you discover available content and test different components.</p>
            
            <BuilderExplorer />
          </div>
        )}

        {activeSection === 'custom' && (
          <div className="content-section">
            <h2>⚙️ Custom Components</h2>
            <p>Custom React components that can be registered with Builder.io for visual editing.</p>
            
            <CustomBuilderComponent 
              title="🤖 Avatar Chat Interface"
              subtitle="Custom component ready for Builder.io integration"
              theme="ai-chat"
              features={[
                "🎨 Designed for Builder.io visual editing",
                "🔧 Fully customizable properties",
                "📱 Responsive design built-in",
                "🚀 Ready for production use"
              ]}
              showAnimation={true}
            />
          </div>
        )}

        {/* GitHub Integration Guide */}
        <div className="github-integration-guide">
          <h2>🔗 GitHub Integration Setup</h2>
          <div className="integration-steps">
            <div className="step">
              <h3>Step 1: Connect GitHub Repo</h3>
              <p>In your Builder.io space, go to Settings → Integrations → GitHub and connect this repository.</p>
            </div>
            <div className="step">
              <h3>Step 2: Configure Models</h3>
              <p>Set up models for your content types (pages, components, etc.) in Builder.io.</p>
            </div>
            <div className="step">
              <h3>Step 3: Visual Editing</h3>
              <p>Use Builder.io's visual editor to create and modify content that will sync with this app.</p>
            </div>
            <div className="step">
              <h3>Step 4: Deploy</h3>
              <p>Changes made in Builder.io will automatically appear in your application after rebuild.</p>
            </div>
          </div>
        </div>        {/* Builder.io URL Component for Testing */}        <div className="url-component-section">
          <h2>🌐 Builder.io URL Component Test</h2>
          <p>This component loads Builder.io content from a direct URL for testing purposes.</p>
          <BuilderUrlComponent url={BuilderConfig.testUrls.mainPageUrl} />
        </div>
      </main>
    </div>
  );
};

export default App;
