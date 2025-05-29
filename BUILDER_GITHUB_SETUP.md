# Builder.io GitHub Integration Setup Guide

## 🚀 Connect Your Avatar-ANIM Project to Builder.io

This guide will help you connect your GitHub repository to Builder.io for seamless visual editing and content management.

## 📋 Prerequisites

✅ **Already Complete:**
- ✅ Electron + React application migrated from Tkinter
- ✅ Builder.io SDK integrated with API key: `8f4052e6f2ad45d3b95d490783ac924f`
- ✅ Builder.io-focused interface implemented
- ✅ GitHub repository ready for connection

## 🔗 Step 1: Connect GitHub Repository to Builder.io

### 1.1 In Builder.io Dashboard
1. Go to [builder.io](https://builder.io) and log into your account
2. Navigate to **Account Settings** → **Integrations**
3. Click **"Connect GitHub"**
4. Authorize Builder.io to access your GitHub repositories
5. Select your repository: `ai-chatbot-project`

### 1.2 Configure Repository Settings
```javascript
// Repository Path: ai-chatbot-project
// Entry Point: electron-ui/src/App.tsx
// Build Command: npm run build-dev
// Output Directory: electron-ui/dist
```

## 📝 Step 2: Set Up Builder.io Models

### 2.1 Create Models in Builder.io
Create these models in your Builder.io space:

#### **Model: `avatar-page`**
```json
{
  "name": "Avatar Page",
  "apiKey": "avatar-page",
  "fields": [
    {
      "name": "title",
      "type": "string",
      "defaultValue": "Avatar Chat Interface"
    },
    {
      "name": "description", 
      "type": "text",
      "defaultValue": "Interactive AI avatar conversation"
    }
  ]
}
```

#### **Model: `avatar-component`**
```json
{
  "name": "Avatar Component",
  "apiKey": "avatar-component", 
  "fields": [
    {
      "name": "avatarName",
      "type": "string"
    },
    {
      "name": "avatarImage",
      "type": "file"
    },
    {
      "name": "specialization",
      "type": "string"
    }
  ]
}
```

## 🎨 Step 3: Replace Placeholder Content IDs

### 3.1 Current Placeholder Content IDs
Your app currently uses these placeholder content IDs:
- `19729fda8c12401fb6d3aee7858ce850` (main content)
- `your-content-id` (URL component)

### 3.2 Get Your Real Content IDs
1. In Builder.io, create your first content pieces
2. Copy the content IDs from Builder.io dashboard
3. Replace placeholder IDs in your code

### 3.3 Update Content IDs in Code

**File: `electron-ui/src/App.tsx`**
```tsx
// Replace these lines with your actual content IDs:

// Main page content (line ~70)
<BuilderIntegration 
  model="avatar-page" 
  contentId="YOUR_ACTUAL_CONTENT_ID_HERE"
  className="main-page-content" 
/>

// Component showcase (line ~110)
<BuilderIntegration 
  model="avatar-component" 
  contentId="YOUR_AVATAR_COMPONENT_ID_HERE"
  className="avatar-chat-component" 
/>

// URL component (line ~180)
<BuilderUrlComponent url="https://builder.io/content/YOUR_CONTENT_ID_HERE" />
```

## 🔧 Step 4: Configure Custom Components

### 4.1 Register Your Custom Components
Add this to your `BuilderComponent.tsx`:

```tsx
import { Builder } from '@builder.io/react';

// Register custom avatar components
Builder.registerComponent(AvatarSelector, {
  name: 'AvatarSelector',
  inputs: [
    {
      name: 'avatars',
      type: 'list',
      subFields: [
        { name: 'name', type: 'string' },
        { name: 'image', type: 'file' },
        { name: 'specialization', type: 'string' }
      ]
    }
  ]
});

Builder.registerComponent(ChatInterface, {
  name: 'ChatInterface',
  inputs: [
    {
      name: 'selectedAvatar',
      type: 'string'
    },
    {
      name: 'welcomeMessage',
      type: 'text'
    }
  ]
});
```

## 🚀 Step 5: Test the Integration

### 5.1 Build and Run
```bash
cd electron-ui
npm run build-dev
npm run start-simple
```

### 5.2 Verify Builder.io Connection
1. Check the app loads your Builder.io content
2. Verify all sections display correctly:
   - Builder.io Page section
   - Components section  
   - Explorer section
   - Custom components section

### 5.3 Test Visual Editing
1. In Builder.io dashboard, edit your content
2. Save changes
3. Refresh your Electron app
4. Verify changes appear immediately

## 🎯 Step 6: Production Deployment

### 6.1 Environment Variables
Create `.env` file in `electron-ui/`:
```env
BUILDER_API_KEY=8f4052e6f2ad45d3b95d490783ac924f
REACT_APP_BUILDER_API_KEY=8f4052e6f2ad45d3b95d490783ac924f
```

### 6.2 Build for Production
```bash
npm run build
npm run package
```

## 📖 Builder.io Visual Editing Workflow

### 6.1 Content Creation
1. **In Builder.io**: Create new content using visual editor
2. **Drag & Drop**: Add components, text, images
3. **Configure**: Set properties and data bindings
4. **Preview**: Test in Builder.io preview mode
5. **Publish**: Make content live

### 6.2 Live Updates
1. **Edit**: Make changes in Builder.io visual editor
2. **Auto-sync**: Changes sync to your app automatically
3. **Real-time**: See updates without rebuilding the app

## 🔍 Troubleshooting

### Common Issues:

**Content Not Loading:**
- Verify API key is correct
- Check content ID exists in Builder.io
- Ensure model name matches exactly

**GitHub Integration Not Working:**
- Verify GitHub repository permissions
- Check Builder.io has access to your repo
- Confirm webhook endpoints are configured

**Visual Editor Issues:**
- Ensure custom components are registered
- Check component props match Builder.io schema
- Verify CSS classes don't conflict

## 📞 Next Steps

1. **Connect GitHub** to Builder.io dashboard
2. **Create content** using Builder.io visual editor
3. **Replace placeholder IDs** with real content IDs
4. **Test visual editing** workflow
5. **Deploy** to production

---

🎉 **You're Ready!** Your Avatar-ANIM app now has full Builder.io visual editing capabilities!
