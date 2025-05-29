// Builder.io Configuration Helper
// This file helps you easily update your Builder.io content IDs

export const BuilderConfig = {
  // Your Builder.io API Key (already configured)
  apiKey: '8f4052e6f2ad45d3b95d490783ac924f',
  
  // Content IDs - Replace these with your actual Builder.io content IDs
  contentIds: {
    // Main page content - replace with your page content ID
    mainPage: '19729fda8c12401fb6d3aee7858ce850', // PLACEHOLDER
    
    // Avatar component showcase - replace with your component content ID  
    avatarShowcase: 'YOUR_AVATAR_COMPONENT_ID', // TO BE REPLACED
    
    // Settings/configuration page - replace with your settings content ID
    settingsPage: 'YOUR_SETTINGS_PAGE_ID', // TO BE REPLACED
    
    // Welcome/landing content - replace with your welcome content ID
    welcomeContent: 'YOUR_WELCOME_CONTENT_ID', // TO BE REPLACED
  },
  
  // Builder.io Models you'll create
  models: {
    page: 'avatar-page',
    component: 'avatar-component', 
    settings: 'avatar-settings',
    data: 'avatar-data'
  },
  
  // URLs for testing Builder.io content
  testUrls: {
    // Replace with your actual Builder.io content URLs
    mainPageUrl: 'https://builder.io/content/YOUR_CONTENT_ID_HERE',
    componentUrl: 'https://builder.io/content/YOUR_COMPONENT_ID_HERE'
  }
};

// Helper function to get content ID for a specific section
export const getContentId = (section: string): string => {
  switch (section) {
    case 'main-page':
      return BuilderConfig.contentIds.mainPage;
    case 'avatar-showcase':
      return BuilderConfig.contentIds.avatarShowcase;
    case 'settings':
      return BuilderConfig.contentIds.settingsPage;
    case 'welcome':
      return BuilderConfig.contentIds.welcomeContent;
    default:
      console.warn(`Unknown section: ${section}, using main page content ID`);
      return BuilderConfig.contentIds.mainPage;
  }
};

// Helper function to get model name
export const getModel = (type: string): string => {
  return BuilderConfig.models[type as keyof typeof BuilderConfig.models] || 'page';
};

// Helper function to check if content ID is still a placeholder
export const isPlaceholder = (contentId: string): boolean => {
  return contentId.includes('YOUR_') || contentId.includes('PLACEHOLDER');
};

// Development helper - logs current configuration
export const logConfig = (): void => {
  console.log('=== Builder.io Configuration ===');
  console.log('API Key:', BuilderConfig.apiKey);
  console.log('Content IDs:', BuilderConfig.contentIds);
  console.log('Models:', BuilderConfig.models);
  
  // Check for placeholders
  const placeholders = Object.entries(BuilderConfig.contentIds)
    .filter(([, id]) => isPlaceholder(id))
    .map(([key]) => key);
    
  if (placeholders.length > 0) {
    console.warn('⚠️  The following content IDs are still placeholders:');
    placeholders.forEach(key => console.warn(`  - ${key}`));
    console.warn('Please replace with your actual Builder.io content IDs');
  } else {
    console.log('✅ All content IDs configured!');
  }
};

export default BuilderConfig;
