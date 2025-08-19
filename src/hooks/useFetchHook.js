// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useFetch = (url, params = null,query='') => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const source = axios.CancelToken.source();
    
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         setData(null);
//         let response
//         if(query){
//          response = await axios.get(`${url}/${query}`, {
//           params: params,
//           cancelToken: source.token
//         });
//         }    
//         else {
//           response = await axios.get(url, {
//           params: params,
//           cancelToken: source.token

//         });
//         }
        
//         setData(response.data);
//       } catch (err) {
//         if (axios.isCancel(err)) {
//           console.log('Request cancelled',err);
//         } else {
//           setError(err.message || 'An error occurred');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     // Cleanup function to cancel request
//     return () => {
//       source.cancel('Operation cancelled by the user.');
//     };
//   }, [url, JSON.stringify(params),query]);

//   return { data, loading, error };
// };

// export default useFetch;

import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url,query = '', params = null, ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setData(null);
        
        const endpoint = query ? `${url}/${query}` : url;
        const response = await axios.get(endpoint, {
          params: params,
          signal: controller.signal
        });
        // console.log(response.data)
        setData(response.data);
      } catch (err) {
        console.log(err)
        if (controller.signal.aborted) {
          console.log('Request cancelled', err);
        } else {
          setError(err.message || 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // return () => {
    //   controller.abort();
    // };
  }, [url, JSON.stringify(params), query]); // Fixed dependency array

  return { data, loading, error };
};

export default useFetch;


