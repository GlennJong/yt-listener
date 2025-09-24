import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const REFETCH_TIME = 10000;

const useCaptionGetter = (id) => {
  const timerRef = useRef(null);
  const [status, setStatus] = useState('preparing');
  const [result, setResult] = useState(null);
  const { transcriptGetterEndpoint, transcriptToken } = useSelector(state => state.configData);

  useEffect(() => {
    setStatus('preparing');
    setResult(null);
    handleInitCaption(id);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  function handleFetchYoutubeCaption(id) {
    if (!transcriptGetterEndpoint || !transcriptToken) return;
    
    const url = `${transcriptGetterEndpoint}` +
      `?videoId=${id}` +
      `&t=${new Date().getTime().toString()}` +
      `&token=${transcriptToken}`;
    
    return new Promise((resolve, reject) => {
      fetch(url, { method: 'GET' })
      .then(res => resolve(res.json()))
      .catch(reject)
    })
  }
  
  const handleInitCaption = async(id) => {
    try {
      const result = await handleFetchYoutubeCaption(id);
      switch (result.status) {
        case "generating":
          setStatus('generating');
          break;
        case "pending":
          setStatus('pending');
          break;
        case "success":
          setResult(result.data);
          setStatus('success');
          break;
        case "error":
          setStatus('error');
          break;
        default:
          break;
      }
    }
    catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  useEffect(() => {
    if (status === 'generating' || status === 'pending') {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        handleInitCaption(id);
      }, REFETCH_TIME);
    }
    else if (status === 'success') {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [status])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [])
  
  
  return {
    data: result,
    status
  };
}

export { useCaptionGetter };
