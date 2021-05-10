import { useEffect, useState } from 'react';
import Axios from 'axios';

function getCaption(ajax_response) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(ajax_response.data, "text/xml");
  const captions = [];

  function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
  }
  
  function getTranscriptContent(node) {
    return {
      start: node.getAttribute('start'),
      dur: node.getAttribute('dur'),
      content: decodeEntities(node.innerHTML)
    }
  }

  try {
    if (xmlDoc.getElementsByTagName("transcript").length > 0) {
      for (var i = 0; i < xmlDoc.getElementsByTagName("transcript")[0].childNodes.length; i++) {
        const caption = getTranscriptContent(xmlDoc.getElementsByTagName("transcript")[0].childNodes[i]);
        captions.push(caption);
      }
    }
    else {
      for (var i = 0; i < ajax_response.getElementsByTagName("transcript")[0].childNodes.length; i++) {
        const caption = getTranscriptContent(ajax_response.getElementsByTagName("transcript")[0].childNodes[i]);
        captions.push(caption);
      }
    }
    return captions;
  }
  catch (error) {
    console.log(error);
    alert('Oops, something went wrong.');
  }
}

function handleFetchYoutubeCaption(id) {
  const url = `https://video.google.com/timedtext?type=track&lang=en-GB&v=${id}&id=0`;

  return new Promise((resolve, reject) => {
    Axios.post(url)
    .then(res => {
      const captions = getCaption(res);
      resolve(captions);
    })
  })
}


const useCaptionGetter = (id) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async function() {
      try {
        const captionData = await handleFetchYoutubeCaption(id);
        setResult(captionData);
      }
      catch (err) {
      }
    })();
  }, [])
  
  
  
  return result;
}

export { useCaptionGetter };
