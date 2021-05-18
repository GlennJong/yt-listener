import { useEffect, useState } from 'react';
import Axios from 'axios';

function getCaptionList(ajax_response) {
  const parser = new DOMParser();

  const xmlDoc = parser.parseFromString(ajax_response.data, "text/xml");

  const tracks = [];
  
  function getTrackContent(node) {
    if (node.getAttribute('lang_code').includes('en')) {
      return node.getAttribute('lang_code');
    }
  }
  
  try {
    if (xmlDoc.getElementsByTagName("transcript_list").length > 0) {
      for (var i = 0; i < xmlDoc.getElementsByTagName("transcript_list")[0].childNodes.length; i++) {
        const caption = getTrackContent(xmlDoc.getElementsByTagName("transcript_list")[0].childNodes[i]);
        if (caption) tracks.push(caption);
        
      }
    }
    else {
      for (var i = 0; i < ajax_response.getElementsByTagName("transcript_list")[0].childNodes.length; i++) {
        const caption = getTrackContent(ajax_response.getElementsByTagName("transcript_list")[0].childNodes[i]);
        if (caption) tracks.push(caption);
      }
    }

    return tracks;
  }
  catch (error) {
    console.log(error);
    alert('Oops, something went wrong.');
  }
  
}

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

function handleFetchYoutubeCaption(id, lang) {
  const url = `https://video.google.com/timedtext?type=track&lang=${lang}&v=${id}&id=0`;

  return new Promise((resolve, reject) => {
    Axios.post(url)
    .then(res => {
      const captions = getCaption(res);
      resolve(captions);
    })
    .catch(reject);
  })
}

function handleFetchYoutubeCaptionList(id) {
  const url = `http://video.google.com/timedtext?type=list&v=${id}`;
  
  return new Promise((resolve, reject) => {
    Axios.post(url)
    .then(res => {
      const list = getCaptionList(res);
      resolve(list);
    })
    .catch(reject);
  })
}


const useCaptionGetter = (id) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async function() {
      try {
        const captionList = await handleFetchYoutubeCaptionList(id);
        console.log(captionList)
        const lang = captionList !== [] ? captionList[0] : null;
        if (lang) {
          const captionData = await handleFetchYoutubeCaption(id, lang);
          setResult(captionData);
        }
      }
      catch (err) {
      }
    })();
  }, [])
  
  
  
  return result;
}

export { useCaptionGetter };
