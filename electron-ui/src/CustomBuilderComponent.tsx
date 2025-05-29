import React, { useState, useEffect } from 'react';

interface CustomBuilderProps {
  title?: string;
  subtitle?: string;
  theme?: 'ai-chat' | 'modern' | 'gradient';
  features?: string[];
  showAnimation?: boolean;
}

const CustomBuilderComponent: React.FC<CustomBuilderProps> = ({
  title = "🤖 AI Avatar Enhanced Experience",
  subtitle = "Powered by Builder.io Integration",
  theme = 'ai-chat',
  features = [
    "🎨 Dynamic UI Components",
    "🚀 Real-time Content Updates", 
    "💬 Interactive Chat Experience",
    "🎭 AI Avatar Animations",
    "📱 Cross-Platform Compatibility"
  ],
  showAnimation = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    if (showAnimation) {
      const interval = setInterval(() => {
        setCurrentFeature(prev => (prev + 1) % features.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [features.length, showAnimation]);

  const themeClasses = {
    'ai-chat': 'theme-ai-chat',
    'modern': 'theme-modern',
    'gradient': 'theme-gradient'
  };

  return (
    <div className={`custom-builder ${themeClasses[theme]} ${isVisible ? 'fade-in' : ''}`}>
      {/* Header Section */}
      <div className="builder-header">
        <h2 className="builder-title">{title}</h2>
        <p className="builder-subtitle">{subtitle}</p>
      </div>

      {/* Features Grid */}
      <div className="builder-features">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-item ${index === currentFeature ? 'active' : ''}`}
          >
            <span className="feature-text">{feature}</span>
            {index === currentFeature && showAnimation && (
              <div className="feature-pulse"></div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Section */}
      <div className="builder-interactive">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">AI Avatars</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Conversations</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Responsive</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="builder-cta">
        <div className="cta-content">
          <h3>🌟 Enhanced with Builder.io</h3>
          <p>This component demonstrates how Builder.io can enhance your Avatar Chat experience with dynamic, customizable UI elements.</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => console.log('Primary CTA clicked')}>
              ✨ Explore Features
            </button>
            <button className="btn-secondary" onClick={() => console.log('Secondary CTA clicked')}>
              📖 Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {showAnimation && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentFeature + 1) / features.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentFeature + 1} of {features.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomBuilderComponent;