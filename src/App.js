import React , { useReducer } from 'react';
import './App.css';
//import request from 'superagent';

import {getInitState, doStateHandling} from './components/handleTyppingState';

function App() {
  const [state, dispatch] = useReducer((state,action)=>action(state), getInitState());
  doStateHandling(state, dispatch);  

  const {count, allDone} = state;
  const wpm = state.wordCount === 0 ? 0 : state.wordCount/(state.wordCountChangeTime.getTime() - state.startTime.getTime())*1000*60;

  const started = count > 0;
  const initButtonStyle = {};  

  
  return (
    <div className="App">
      <header className="App-header">    
      {(!started || allDone)?
      <button  style={initButtonStyle} onClick={()=>{        
        console.log('========================= INIT ===========================');
        //const verses = request.get('https://bible-api.com/romans%202').then(res=>{
        //  return res.body.verses.map(r=>r.text.trim().replace(/“/g,'"'));
        // }).then(r=>{
        //  console.log(r);
        //})        
        const str = 'The quick brown fox jump over the something something new; and let\'s play somethig cool!';
        dispatch(state=>({
          ...getInitState(),
          toText: [...str],
        }));        
      }}>Init</button>    :null
    }
        
        <p>ElaspedTime: { state.startTime && Date.now()-state.startTime.getTime()}</p>
        <p>
          {
          state.toText.map((c,j)=><span key={j} style={{color: j>=state.nextCharPos?'black':'yellow', textDecorationLine:j>=state.nextCharPos?'':'line-through'}}>{c}</span>)
        }
        </p>
        <p>
          World Count = {state.wordCount}  WPM ={wpm.toFixed(2)}
        </p>
        <p>
          count = {state.nextCharPos} alldone= {allDone}
        </p>        
        <div>        
        {
          state.curText.map((c,i)=><span key={i}>
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
