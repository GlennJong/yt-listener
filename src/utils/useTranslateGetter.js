import { useEffect, useState } from 'react';

function useTranslatGetter(word) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async function() {
      try {
        const translateContent = await handleGetTranslate(word);
        translateContent && setResult(translateContent);
      }
      catch (err) { setResult(null) }
    })();
  }, [])
  
  
  return result;
}

export function handleGetTranslate(word) {
  return new Promise((resolve, reject) => {
    fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=zh-TW',
    {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: `[{'Text': '${word}'}]`
    }).then(res => {
      resolve(res.json())
    })
    .catch(reject);
  })
}

export default useTranslatGetter;