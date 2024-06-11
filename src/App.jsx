import { useState } from 'react'
import './App.css';
import { create, all, complex, abs, arg, typeOf  } from 'mathjs';
const math = create(all);

function App() {
  const [expression,setExpression]=useState("");
  const [lastAnswer, setLastAnswer]=useState("");
  const [clean,setClean]=useState(false);
  const numberProps = ["1","2","3","4","5","6","7","8","9","0",'.',"^"]
  const operatorsProps = ["DEL","AC","*","/","-","+","ANS","="]
  const optionsProps = [
    {title: "sin", value:"sin("},
    {title:"cos", value:"cos("},
    {title:"tan", value:"tan("},
    {title:"log", value:"log10("},
    {title:"ln", value:"log("},
    {title:"(", value:"("},
    {title:")", value:")"},
    {title:"i", value:"i"},
    {title:"θ", value:"θ"},
    {title:"MAG", value:"MAG"},
    

  ]

  const handleExpression = n =>{
    switch(n){
        case "DEL" : if(clean){
             setExpression("")

           }
        setExpression(prev=>(prev.slice(0,-1)));

                      break;
        case "AC": setExpression('')
                    break;
        case "ANS": setExpression(prev=>(lastAnswer+prev));
                    break;
        case "θ": try {
          if(expression && typeOf(expression)===String){setExpression(prev=>(arg(math.evaluate(prev))));}
          setClean(true)
          break;
        } catch (error) {
          setExpression("Error")
          setClean(true)
          break;
        }
        
                    
        case "MAG": 
                    try {
                     if(expression && typeOf(expression)===String){setExpression(prev=>(abs(math.evaluate(prev))));} 
                      setClean(true)
                    } catch (error) {
                      setExpression("Error")
                      setClean(true)
                    }                  
                     break;


        case "=" : try {
                   const result = math.evaluate(expression)
                   setExpression(String(result));
                   setLastAnswer(String(result));
                   setClean(true)

        } catch (error) {
          setExpression("Error");
          setClean(true)
        }
                    break;

        default :   if(clean){
          setExpression("")

        }
        setExpression(prev=>prev+n)
        setClean(false)

    }
  }

  console.log(expression)
  return (
    <div className='app'>
       <div className="input">
       <input type="text" value={expression} name="input" id="input" />
       </div>
       <div className="buttons">
        <div className="options">
          {optionsProps.map((i,k)=>(<button onClick={()=>handleExpression(i.value)} key={k}>{i.title}</button>))}
        </div>
        <div className="flex">
        <div className="numbers">
          {
            numberProps.map((n,k)=>(<button onClick={()=>handleExpression(n)} key={k}>{n}</button>))
          }
        </div>
         
         <div className="operators">
          {
            operatorsProps.map((o,k)=>(
              <button onClick={()=>handleExpression(o)} key={k}>{o}</button>
            ))
          }
         </div>
        </div>
         
       </div>
    </div>
  )
}

export default App
