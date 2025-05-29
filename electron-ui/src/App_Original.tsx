import React, { useState, useEffect } from 'react';
import './App.css';
import BuilderIntegration, { BuilderUrlComponent } from './BuilderComponent';
import BuilderExplorer from './BuilderExplorer';
import CustomBuilderComponent from './CustomBuilderComponent';
// Import for demo content (can be removed when using real Builder.io content)
// import BuilderDemoContent from './BuilderDemoContent';

interface Avatar {
  name: string;
  filename: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'avatar';
  timestamp: Date;
  videoUrl?: string;
}

const App: React.FC = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false);
  const [showBuilderComponent, setShowBuilderComponent] = useState<boolean>(true);
  // Check backend health and load avatars
  useEffect(() => {
    const initializeApp = async () => {
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
        setSelectedAvatar('Philosophy');
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
          if (!selectedAvatar) {
            setSelectedAvatar(data.avatars[0].filename);
          }
          return true;
        }
      }
    } catch (error) {
      console.error('Failed to load avatars:', error);
    }
    return false;
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !selectedAvatar || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);

    try {
      // Step 1: Get GPT response
      const askResponse = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentMessage }),
      });

      if (!askResponse.ok) {
        throw new Error('Failed to get GPT response');
      }

      const askData = await askResponse.json();
      
      // Step 2: Synthesize speech
      const synthesizeResponse = await fetch('http://localhost:5000/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: askData.response,
          avatar: selectedAvatar 
        }),
      });

      if (!synthesizeResponse.ok) {
        throw new Error('Failed to synthesize speech');
      }

      const synthesizeData = await synthesizeResponse.json();

      // Step 3: Generate animated video
      const animateResponse = await fetch('http://localhost:5000/animate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar: selectedAvatar,
          audio_file: synthesizeData.audio_file
        }),
      });

      if (!animateResponse.ok) {
        throw new Error('Failed to animate avatar');
      }

      const animateData = await animateResponse.json();

      // Add avatar response message
      const avatarMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: askData.response,
        sender: 'avatar',
        timestamp: new Date(),
        videoUrl: `http://localhost:5000/static/${animateData.video_file}`
      };

      setMessages(prev => [...prev, avatarMessage]);

    } catch (error) {
      console.error('Error processing message:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error processing your message.',
        sender: 'avatar',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }  };

  const addBuilderMessage = () => {
    const builderMessage: Message = {
      id: Date.now().toString(),
      text: '🎨 Builder.io Enhanced Component',
      sender: 'avatar',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, builderMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isBackendReady) {
    return (
      <div className="app-container loading">
        <div className="loading-content">
          <h1>🤖 AI Avatar Chat</h1>
          <p>Connecting to backend...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🤖 AI Avatar Chat</h1>
        <div className="avatar-selector">
          <label htmlFor="avatar-select">Choose Avatar:</label>
          <select 
            id="avatar-select"
            value={selectedAvatar} 
            onChange={(e) => setSelectedAvatar(e.target.value)}
            disabled={isProcessing}
          >
            {avatars.map((avatar) => (
              <option key={avatar.filename} value={avatar.filename}>
                {avatar.name}
              </option>
            ))}
          </select>        </div>
        <div className="builder-toggle">
          <button 
            onClick={() => setShowBuilderComponent(!showBuilderComponent)}
            className="toggle-button"
          >
            {showBuilderComponent ? '🎨 Hide Builder.io' : '🎨 Show Builder.io'}
          </button>
        </div>
      </header>

      <main className="chat-container">        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome! 👋</h2>
              <p>Select an avatar and start chatting. Your avatar will respond with animated video!</p>              {/* Builder.io Content Explorer */}
              <BuilderExplorer />
              
              {/* Custom Builder Component - Demonstrates Builder.io Style UI */}
              <CustomBuilderComponent 
                title="🤖 AI Avatar Chat Enhanced"
                subtitle="Powered by Builder.io Integration & Your API"
                theme="ai-chat"
                features={[
                  "🎨 Dynamic Builder.io Components",
                  "🚀 Real-time Avatar Conversations", 
                  "💬 Enhanced Chat Experience",
                  "🎭 AI Avatar Animations",
                  "📱 Cross-Platform Electron App"
                ]}
                showAnimation={true}
              />
              
              {/* Builder.io Component Integration */}
              {showBuilderComponent && (
                <div className="builder-section">
                  <h3>🎨 Live Builder.io Component</h3>
                  <BuilderIntegration 
                    model="page" 
                    contentId="19729fda8c12401fb6d3aee7858ce850"
                    className="welcome-builder"
                  />
                  
                  {/* Alternative URL-based loader for fallback */}
                  <BuilderUrlComponent 
                    url="https://builder.io/content/19729fda8c12401fb6d3aee7858ce850"
                    className="welcome-builder-url"
                  />
                </div>
              )}
            </div>
          ) : (            messages.map((message) => (
              <div key={message.id} className={`message ${message.sender} ${message.text.includes('🎨 Builder.io') ? 'builder-message' : ''}`}>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  
                  {/* Render Builder.io component for special messages */}
                  {message.text.includes('🎨 Builder.io') && (
                    <div className="message-builder">
                      <BuilderIntegration 
                        model="page" 
                        contentId="19729fda8c12401fb6d3aee7858ce850"
                        className="chat-builder"
                      />
                    </div>
                  )}
                  
                  {message.videoUrl && (
                    <div className="message-video">
                      <video 
                        controls 
                        autoPlay 
                        muted
                        width="400"
                        height="300"
                      >
                        <source src={message.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          {isProcessing && (
            <div className="message avatar processing">
              <div className="message-content">
                <div className="message-text">
                  <div className="thinking-animation">
                    <span>🤔</span> Thinking and generating response...
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <div className="input-group">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send)"
              disabled={isProcessing}
              rows={3}
            />            <button 
              onClick={sendMessage}
              disabled={isProcessing || !currentMessage.trim()}
              className="send-button"
            >
              {isProcessing ? '⏳' : '📤'} Send
            </button>
            <button 
              onClick={addBuilderMessage}
              disabled={isProcessing}
              className="builder-button"
              title="Add Builder.io Component to Chat"
            >
              🎨 Builder.io
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
