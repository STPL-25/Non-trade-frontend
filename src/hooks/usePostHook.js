import { useState } from 'react';
import axios from 'axios';

const usePost = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, payload = null, config = {}) => {
    const source = axios.CancelToken.source();
    try {
      setLoading(true);
      setError(null);
      setData(null);

      const response = await axios.post(url, payload, {
        ...config,
        cancelToken: source.token
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request cancelled');
      } else {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { 
    data, 
    loading, 
    error, 
    postData, 
    reset 
  };
};

export default usePost;