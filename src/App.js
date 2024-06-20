import "./App.css";
import Cell from "./cell.js";
import axios from "axios";

import { useEffect, useState, useRef } from "react";

function App() {
  let [data, setData] = useState([]);
  let [display, setDisplay] = useState(0);
 
  
  const [checkedState, setCheckedState] = useState(null);

  const [checkedArr,setCheckedArr] = useState(null);


  function checkNames(){
    console.log(data,checkedState)
    for(let i =0; i<data.length;i++){
      for(let j= 0; j<checkedState.length;j++){
        if(data[i].name===checkedState[j])
           filt_data.push(data[i])
      }
    }
  
  }
  let filt_data=[];

  const ref=useRef(filt_data)
  const ref_1 = useRef(checkedState)
  const ref_2 = useRef(checkedArr)

  let array =data;
  const handleOnChange = (position,value,bool) => {
    const updatedCheckArr = checkedArr.map((item,index)=>{
      if(index===position) {return bool} else{return item}
    })

    setCheckedArr(updatedCheckArr);
    const updatedCheckedState = checkedState.map((item, index) =>
      {if (index === position) {return value }
  else{ return item}}
    );
   

    setCheckedState(updatedCheckedState);
    checkNames()
    if(filt_data.length!==0){
      array= filt_data;
    }
    else{
      array=data;
    }

  };
  function toggleDisplay() {
    setDisplay(!display);
  }
 


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
      setCheckedState( new Array(result.data.length).fill(""));
      setData(result.data);
      setCheckedArr( new Array(result.data.length).fill(false));

     
    });
  }, [array]);

  return (
    <div className="App">
      <div id="header">User list</div>
      <div id="head">
        <select
          id="input"
          placeholder="Select name"
          onClick={() => {
            toggleDisplay();
          }}
        >
          <option id="hidden_option">Select name</option>{" "}
        </select>
        <div id="checkbox_container" className={display ? "show" : "hide"}>
          { 
            data.map((elem,index) => {
              return (
                <div className="styled_checkboxes">
                  <input type="checkbox" value={`${elem.name}`} key= {index} checked={checkedArr[index]}
                  onChange={(e)=>{e.target.checked?handleOnChange(index,e.target.value,true):handleOnChange(index,"",false)}}></input>
                  <label id="label">{elem.name}</label>
                </div>
              );
            })}
        </div>

        <div className="head_text">
          Filter: 2 <button onClick={()=>{setCheckedArr( new Array(data.length).fill(false));setCheckedState( new Array(data.length).fill(""));}}>Clear all</button>
        </div>
        <div className="head_text"> Name: <div id="name_list">{checkedState}</div> </div>
      </div>
      <div id="sec_2">
        <div id="dataList_container">
          {array &&
            array.map((data) => {
              return <Cell components={data} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
