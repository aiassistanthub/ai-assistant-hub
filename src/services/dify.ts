export interface DifyConfig {
    apiKey: string;
    baseUrl: string;
  }
  
  export class DifyService {
    private config: DifyConfig;
  
    constructor(config: DifyConfig) {
      this.config = config;
    }
  
    async chat(applicationId: string, message: string) {
      try {
        const response = await fetch(`${this.config.baseUrl}/v1/chat-messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            application_id: applicationId,
            inputs: {},
            query: message,
            response_mode: 'streaming',
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        return response.body;
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
        throw error;
      }
    }
  }