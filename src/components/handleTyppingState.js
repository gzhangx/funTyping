import keyHandler from './keyHandler';
const letterMatch = /^[A-Za-z0-9]$/;

export function doStateHandling(state, dispatch) {
    let nextCharPos = state.nextCharPos;
  let wordCount = state.wordCount;  
  let count = state.count;
  let allDone = state.allDone;
  const curText = state.curText.slice();
  const badText = state.badText.slice();
  const wordEnds = state.wordEnds;
  let wordCountChangeTime = state.wordCountChangeTime;
  keyHandler(key => { 
    if (nextCharPos >= state.toText.length) return;
    if (key ==='Backspace') {
      if (nextCharPos=== curText.length) {
        if (nextCharPos > 0) nextCharPos--;
      }
      curText.pop();
      badText.pop();
      
      while (wordEnds.length) {
        if (wordEnds[wordEnds.length - 1].position >= nextCharPos) {
          wordEnds.pop();
        }
        else 
          break;
      }
      if (wordCount !== wordEnds.length) {
        wordCountChangeTime = new Date();
      }
      wordCount = wordEnds.length;
      count = count+1;
    }else {
      if (key.length > 1)return;
      if (nextCharPos < state.toText.length) {
        if (key === state.toText[nextCharPos] && nextCharPos=== curText.length) {
          nextCharPos++;
        } else {
          badText.push(key);
        }
        
        if (key.toString().match(letterMatch) && nextCharPos > 0) {
          if (nextCharPos >= state.toText.length || !state.toText[nextCharPos].match(letterMatch)) {
            wordEnds.push({
              count: wordCount,
              position: nextCharPos - 1,
            });
            if (wordCount !== wordEnds.length) {
              wordCountChangeTime = new Date();
            }
            wordCount = wordEnds.length;
          }
        }
        
      }
      if (nextCharPos >= state.toText.length) {
        allDone = true;
      }
      curText.push(key);
      count = count+1;
    }
    dispatch(state=>{     
      return ({
        ...state,
        nextCharPos,
        startTime: nextCharPos === 1 ? new Date() : state.startTime,
        curText,
        badText,
        wordCount,
        wordCountChangeTime,
        count,
        allDone,
      });
    });    
  });  
}

export function getInitState() {
    return {
      curText: [],
      badText: [],
      toText:[],
      wordEnds: [],
      nextCharPos: 0,
      startTime: null,
      wordCount: 0,
      wordCountChangeTime: new Date(),
      count : 0,
      allDone: false,
    }
  }

