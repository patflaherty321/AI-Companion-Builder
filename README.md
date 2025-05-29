# 🤖 AI-Companion - Builder.io Integrated Avatar Chat

> **Modern cross-platform AI avatar chat application with Builder.io visual editing integration**

[![Builder.io](https://img.shields.io/badge/Builder.io-Integrated-blue)](https://builder.io)
[![Electron](https://img.shields.io/badge/Electron-React-green)](https://electronjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://typescriptlang.org)

## 🌟 Features

- **🎨 Visual Development**: Full Builder.io integration for drag-and-drop UI editing
- **💬 AI Avatar Chat**: Interactive conversations with specialized AI personalities
- **🖥️ Cross-Platform**: Runs on Windows, macOS, and Linux via Electron
- **⚡ Real-Time**: Live content updates from Builder.io without rebuilding
- **🎭 Multiple Avatars**: Philosophy (Einstein), Art (Bob Ross), Travel (Carmen Sandiego)
- **🔧 Modern Stack**: React + TypeScript + Builder.io + Python Flask

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Python 3.8+
- Git

### 1. Clone & Setup
```bash
git clone https://github.com/patflaherty321/AI-Companion.git
cd AI-Companion
```

### 2. Install Dependencies
```bash
# Frontend dependencies
cd electron-ui
npm install

# Backend dependencies (optional)
cd ..
pip install -r requirements.txt
```

### 3. Connect to Builder.io
1. Go to [builder.io](https://builder.io) and create/login to your account
2. Navigate to **Account Settings** → **Integrations**
3. Connect this GitHub repository: `patflaherty321/AI-Companion`
4. Update content IDs in `electron-ui/src/BuilderConfig.ts`

### 4. Launch Application
```bash
# Quick launch (recommended)
./launch_builder_integration.bat

# Or manually
cd electron-ui
npm run start-builder
```

## 🎨 Builder.io Integration

This project is designed for **seamless visual editing** with Builder.io:

### Current Integration Status
- ✅ **Builder.io SDK**: Integrated with API key
- ✅ **GitHub Connection**: Ready for repository linking
- ✅ **Visual Components**: Chat interface, avatar selector, settings
- ✅ **Live Updates**: Real-time content synchronization
- ⏳ **Custom Models**: Ready for your Builder.io content

### Visual Editing Workflow
1. **Design in Builder.io**: Use the visual editor to create/modify interfaces
2. **Auto-Sync**: Changes automatically sync to this GitHub repo
3. **Live Preview**: See updates in real-time in your Electron app
4. **Deploy**: Built-in deployment pipeline

## 📁 Project Structure

```
AI-Companion/
├── electron-ui/                    # Main Electron + React application
│   ├── src/
│   │   ├── App.tsx                # Builder.io-focused main component
│   │   ├── BuilderConfig.ts       # Centralized Builder.io configuration
│   │   ├── BuilderComponent.tsx   # Builder.io SDK integration
│   │   └── components/            # React components
│   ├── package.json               # Frontend dependencies
│   └── webpack.config.js          # Build configuration
├── avatar_api_mock.py             # Mock backend for testing
├── requirements.txt               # Python dependencies
├── BUILDER_GITHUB_SETUP.md       # Detailed setup guide
└── launch_builder_integration.bat # One-click launcher
```

## 🔧 Configuration

### Builder.io Setup
Update your content IDs in `electron-ui/src/BuilderConfig.ts`:

```typescript
export const BuilderConfig = {
  apiKey: '8f4052e6f2ad45d3b95d490783ac924f',
  contentIds: {
    mainPage: 'YOUR_PAGE_CONTENT_ID',        // Replace with actual ID
    avatarShowcase: 'YOUR_COMPONENT_ID',     // Replace with actual ID
    settingsPage: 'YOUR_SETTINGS_ID',       // Replace with actual ID
  }
};
```

### Environment Variables
Create `.env` in `electron-ui/`:
```env
BUILDER_API_KEY=8f4052e6f2ad45d3b95d490783ac924f
REACT_APP_BUILDER_API_KEY=8f4052e6f2ad45d3b95d490783ac924f
```

## 🎭 Available Avatars

| Avatar | Specialization | Personality |
|--------|---------------|-------------|
| **Einstein** | Philosophy & Science | Thoughtful, analytical, curious |
| **Bob Ross** | Art & Creativity | Calm, encouraging, artistic |
| **Carmen Sandiego** | Travel & Adventure | Adventurous, worldly, mysterious |

## 🛠️ Development

### Available Scripts
```bash
# Development
npm run webpack-dev      # Start webpack dev server
npm run build-dev        # Build for development
npm run start-builder    # Launch with Builder.io integration

# Production
npm run build           # Production build
npm run package         # Package Electron app
```

## 🌐 Builder.io Models

### Recommended Models to Create:

1. **`avatar-page`** - Full page layouts
2. **`avatar-component`** - Reusable UI components  
3. **`avatar-chat`** - Chat interface elements
4. **`avatar-settings`** - Configuration panels

## API Endpoints

### Backend (Flask)
- `GET /avatars` - List available avatars
- `POST /ask` - Send question to AI
- `POST /synthesize` - Text-to-speech synthesis  
- `POST /animate` - Avatar animation

### Builder.io
- Model: `page` - Full page content
- Model: `component` - Reusable components
- Model: `avatar-interface` - Avatar chat interfaces

## 🚀 Deployment

### GitHub Integration
1. **Connect Repository**: Link this repo to Builder.io
2. **Automatic Builds**: Push triggers Builder.io updates
3. **Live Deployment**: Changes go live automatically

## Features
- ✅ Cross-platform compatibility (Windows, macOS, Linux)
- ✅ Modern React UI with TypeScript
- ✅ Builder.io visual development
- ✅ Real-time avatar chat
- ✅ Professional animations and styling
- ✅ RESTful API architecture
- ✅ Hot reloading development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes in Builder.io visual editor or code
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Open a Pull Request

## 📞 Support

- **Builder.io Issues**: Check [Builder.io documentation](https://www.builder.io/c/docs)
- **GitHub Issues**: Open an issue in this repository
- **Setup Help**: See `BUILDER_GITHUB_SETUP.md`

## License
MIT License - see [LICENSE](LICENSE) file for details

---

**🎉 Ready to create amazing AI avatar experiences with visual editing superpowers!**
