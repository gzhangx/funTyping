import React , { useReducer, useState } from 'react';
import './App.css';
import request from 'superagent';

import {getInitState, doStateHandling} from './components/handleTyppingState';
import getVerses from './components/getVerses';
import Login from './login';
import { getLogin } from './util';
import request from 'https';

const timerCb = {
  cb : null,
}
const wpmTim = ()=>{
  if (timerCb.cb) timerCb.cb();
  setTimeout(wpmTim, 200);
};
setTimeout(wpmTim, 100);

function App() {
  const [state, dispatch] = useReducer((state,action)=>action(state), getInitState());  
  const {count, allDone} = state;
  const [wpm, setWpm] = useState(0);
  const [elaspedTime, setElaspedTime] = useState(0);
  const [loginInfo, setLoginInfo] = useState(getLogin() || {});
  //const wpm = state.wordCount === 0 ? 0 : state.wordCount/(state.wordCountChangeTime.getTime() - state.startTime.getTime())*1000*60;  
  doStateHandling(state, dispatch, () => {
    if (loginInfo && loginInfo.name) {
      const elasptedTime = Date.now() - state.startTime.getTime();             
      const wpm = parseFloat((state.wordCount / (elasptedTime) * 1000 * 60).toFixed(2));      
      request.post('https://hebrewssender.azurewebsites.net/saveFunTypingRecord').send(
        Object.assign({}, loginInfo, { wpm })
      ).then(sret => {
        console.log(sret);
      }).catch(err => {
        console.log(err);
      });
    }
  });

  timerCb.cb = () => {
    if (state.startTime) {
      const elasptedTime = Date.now() - state.startTime.getTime();
      if (state.wordCount > 0 && elasptedTime > 1000) {
        if (!state.allDone)
          setWpm(state.wordCount / (elasptedTime)*1000*60);    
      }
    
      if (!state.allDone)
        setElaspedTime(elasptedTime);
    }else setElaspedTime(0);
  }

  const started = count > 0;
  const initButtonStyle = {};  

  
  return (
    <div className="App">
      <header className="App-header">    
        {!loginInfo.name && <Login setLoginInfo={setLoginInfo}/>}
        {loginInfo.name && <span>Welcome {loginInfo.name}</span>}
      {(!started || allDone)?
      <button  style={initButtonStyle} onClick={()=>{
        console.log('========================= INIT ===========================');
        //const verses = request.get('https://bible-api.com/romans%202').then(res=>{
        //  return res.body.verses.map(r=>r.text.trim().replace(/“/g,'"').replace(/’/g,'\''));
        // }).then(r=>{
        //  console.log(r);
        //})        
        const str = getVerses(10).join(' ');
        //const str = 'The quick brown fox jump over the something something new; and let\'s play somethig cool!';
        dispatch(state=>({
          ...getInitState(),
          toText: [...str],
        }));        
      }}>Start Test</button>    :null
    }
        
        <p>Words: {state.wordCount}  WPM: {wpm.toFixed(2)} Seconds: { (elaspedTime/1000).toFixed(1)}</p>
        <p>
          {
            state.toText.reduce((acc, c, j) => {
              const ret = <span key={j} style={{ color: j >= state.nextCharPos ? 'yellow' : 'black', textDecorationLine: j >= state.nextCharPos ? '' : 'line-through' }}>{c}</span>
              if (j === state.nextCharPos && state.badText.length) {
                acc.push(<span key={j + "bad"} style={{ color: 'red', textDecorationLine: 'line-through' }}>{state.badText.map(c => c === ' ' ?'\u00a0':c).join('')}</span>)
              }
              acc.push(ret);
              return acc;
            },[])
        }
        </p>        
        <div>        
          <input type='text' text={state.curText.join('')}></input>
        {
          false && state.curText.map((c,i)=><span key={i}>
            {c}
          </span>
            
          )
        }
      </div>
      </header>
      
    </div>
  );
}

export default App;
