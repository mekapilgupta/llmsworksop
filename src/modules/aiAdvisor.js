import axios from 'axios';

export const analyzeMarket = async (cleanedData, apiKey) => {
  const endpoint = 'https://openrouter.ai/api/v1/chat/completions';
  const model = 'amazon/nova-lite-v1'; 

  // Constructing the messages array based on the example provided
  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: `Analyze today's market trends based on this data: ${cleanedData}`
        }
      ]
    }
  ];

  try {
    console.log("Sending request to OpenRouter API...");
    const response = await axios.post(endpoint, {
      model,
      messages
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': '<YOUR_SITE_URL>', // Optional
        'X-Title': '<YOUR_SITE_NAME>', // Optional
        'Content-Type': 'application/json'
      }
    });
    
    console.log("AI reply:", response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error during AI analysis:', error.response ? error.response.data : error.message);
    throw new Error('AI analysis failed');
  }
};

