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

function handleGetTranslate(word) {
  new Promise((resolve, reject) => {
    fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=zh-TW',
    {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: `[{'Text': ${word}}]`
    }).then(res => {
      const result = res.json();
      const { text } = result[0].translations[0];
      resolve(text);
    }).catch(err => {
      console.log(err);
      reject(false);
    });
  })
}

export default useTranslatGetter;