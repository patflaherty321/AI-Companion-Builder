import React, { useState, useEffect } from 'react';
import { BuilderComponent, builder } from '@builder.io/react';

// Initialize Builder.io with your API key
builder.init('8f4052e6f2ad45d3b95d490783ac924f');

interface BuilderIntegrationProps {
  model: string;
  contentId?: string;
  className?: string;
}

const BuilderIntegration: React.FC<BuilderIntegrationProps> = ({ 
  model, 
  contentId = '19729fda8c12401fb6d3aee7858ce850',
  className = '' 
}) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadBuilderContent = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Loading Builder.io content...', { model, contentId });

        // Try to get content by ID first
        let builderContent = await builder.get(model, {
          query: {
            id: contentId
          }
        }).toPromise();

        console.log('Content by ID result:', builderContent);

        // If no content found by ID, try to get the latest content for the model
        if (!builderContent) {
          console.log('No content found by ID, trying to get latest...');
          builderContent = await builder.get(model).toPromise();
          console.log('Latest content result:', builderContent);
        }

        // If still no content, try different models
        if (!builderContent) {
          console.log('Trying other models...');
          const modelsToTry = ['page', 'section', 'component', 'data'];
          
          for (const modelName of modelsToTry) {
            if (modelName !== model) {
              console.log(`Trying model: ${modelName}`);
              const result = await builder.get(modelName).toPromise();
              if (result) {
                console.log(`Found content in model: ${modelName}`, result);
                builderContent = result;
                break;
              }
            }
          }
        }

        if (builderContent) {
          setContent(builderContent);
          console.log('Successfully loaded Builder.io content:', builderContent);
        } else {
          setError('No Builder.io content found in any model');
          console.log('No content found in any model');
        }
      } catch (err) {
        console.error('Error loading Builder.io content:', err);
        setError(`Failed to load Builder.io content: ${(err as Error).message || String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    loadBuilderContent();
  }, [model, contentId]);

  if (loading) {
    return (
      <div className={`builder-loading ${className}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Builder.io component...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`builder-error ${className}`}>
        <div className="error-message">
          <h3>Builder.io Component Error</h3>
          <p>{error}</p>
          <p>Content ID: {contentId}</p>
          <p>Model: {model}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`builder-fallback ${className}`}>
        <div className="fallback-content">
          <h3>Builder.io Content</h3>
          <p>Component content not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`builder-wrapper ${className}`}>      <BuilderComponent
        model={model}
        content={content}
        options={{
          includeRefs: true
        }}
      />
    </div>
  );
};

// Alternative component for direct URL-based content loading
export const BuilderUrlComponent: React.FC<{ 
  url: string; 
  className?: string;
}> = ({ url, className = '' }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContentFromUrl = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to extract content ID from Builder.io URL
        const contentIdMatch = url.match(/content\/([a-f0-9]+)/);
        if (contentIdMatch) {
          const contentId = contentIdMatch[1];
          
          // Try to fetch using Builder.io API
          const builderContent = await builder.get('page', {
            query: {
              id: contentId
            }
          }).toPromise();

          if (builderContent) {
            setHtmlContent(`
              <div class="builder-content">
                <h3>${builderContent.data?.title || 'Builder.io Component'}</h3>
                <div>${JSON.stringify(builderContent.data, null, 2)}</div>
              </div>
            `);
          } else {
            setError('Content not found');
          }
        } else {
          setError('Invalid Builder.io URL format');
        }
      } catch (err) {
        console.error('Error loading content from URL:', err);
        setError('Failed to load content from URL');
      } finally {
        setLoading(false);
      }
    };

    loadContentFromUrl();
  }, [url]);

  if (loading) {
    return (
      <div className={`builder-loading ${className}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading content from Builder.io...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`builder-error ${className}`}>
        <div className="error-message">
          <h3>Failed to Load Builder.io Content</h3>
          <p>{error}</p>
          <p>URL: {url}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`builder-url-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default BuilderIntegration;
