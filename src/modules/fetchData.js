import axios from 'axios';

export const fetchMarketData = async () => {
    try {
      // Add the proxy URL before the target URL
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = 'https://pulse.zerodha.com/';
      
      const response = await axios.get(`${proxyUrl}${targetUrl}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch market data');
    }
  };


