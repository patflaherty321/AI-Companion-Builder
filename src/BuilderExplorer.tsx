import React, { useState, useEffect } from 'react';
import { builder } from '@builder.io/react';

// Initialize with your API key
builder.init('8f4052e6f2ad45d3b95d490783ac924f');

const BuilderExplorer: React.FC = () => {
  const [allContent, setAllContent] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const exploreContent = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Exploring Builder.io content...');
        
        const modelsToExplore = ['page', 'section', 'component', 'data', 'symbol'];
        const foundContent: any[] = [];

        for (const model of modelsToExplore) {
          try {
            console.log(`Checking model: ${model}`);
            const content = await builder.getAll(model, {
              limit: 10,
              fields: 'id,name,data.title,data.url,createdDate,lastUpdated'
            });
            
            if (content && content.length > 0) {
              console.log(`Found ${content.length} items in model: ${model}`, content);
              foundContent.push(...content.map(item => ({ ...item, modelType: model })));
            }
          } catch (modelError) {
            console.log(`Error checking model ${model}:`, modelError);
          }
        }

        setAllContent(foundContent);
        console.log('All found content:', foundContent);

      } catch (err) {
        console.error('Error exploring Builder.io content:', err);
        setError(`Failed to explore content: ${(err as Error).message || String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    exploreContent();
  }, []);

  if (loading) {
    return (
      <div className="builder-explorer">
        <h3>🔍 Exploring Builder.io Content...</h3>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Checking your Builder.io account for available content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="builder-explorer error">
        <h3>❌ Explorer Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="builder-explorer">
      <h3>🎨 Builder.io Content Found</h3>
      <p>API Key: 8f4052e6f2ad45d3b95d490783ac924f</p>
      <p>Found {allContent.length} content items</p>
      
      {allContent.length === 0 ? (
        <div className="no-content">
          <p>🤔 No content found in your Builder.io account.</p>
          <p>This could mean:</p>
          <ul>
            <li>You haven't created any content yet</li>
            <li>Content is in a different space/organization</li>
            <li>API key might need different permissions</li>
          </ul>
          <p>Let's create some sample content to demonstrate the integration!</p>
        </div>
      ) : (
        <div className="content-list">
          {allContent.map((item, index) => (
            <div key={index} className="content-item">
              <h4>{item.data?.title || item.name || 'Untitled'}</h4>
              <p><strong>Model:</strong> {item.modelType}</p>
              <p><strong>ID:</strong> {item.id}</p>
              {item.data?.url && <p><strong>URL:</strong> {item.data.url}</p>}
              <p><strong>Created:</strong> {new Date(item.createdDate).toLocaleDateString()}</p>
              <p><strong>Updated:</strong> {new Date(item.lastUpdated).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuilderExplorer;
