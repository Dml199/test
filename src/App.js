import "./App.css";
import Cell from "./cell.js";
import axios from "axios";

import { useEffect, useState, useRef } from "react";

function App() {
  let [data, setData] = useState([]);
  let [display, setDisplay] = useState(false);
  let [data_2, setData_2] = useState([]);
  let [data_3, setData_3] = useState([]);
  let ref = useRef(null);

  let [checkedState, setCheckedState] = useState([]);

  let [checkedArr, setCheckedArr] = useState(null);
  let [state, setState] = useState(null);

  function filterNames(value) {
    return data.filter((data) => {
      if (data.name.startsWith(value)) {
        return data;
      }
    });
  }
  function checkNames() {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < checkedState.length; j++) {
        if (data[i].name === checkedState[j]) filt_data.push(data[i]);
      }
    }
  }
  let filt_data = [];

  const handleOnChange = (position, value, bool) => {
    const updatedCheckArr = checkedArr.map((item, index) => {
      if (index === position) {
        return bool;
      } else {
        return item;
      }
    });

    setCheckedArr(updatedCheckArr);

    const updatedCheckedState = checkedState.map((item, index) => {
      if (index === position) {
        return value;
      } else {
        return item;
      }
    });

    setCheckedState(updatedCheckedState);
  };
  function toggleDisplay(value) {
    setDisplay(value);
  }

  useEffect(() => {
    if (data_2.length !== 0) {
      setData_3(data_2);
    } else {
      setData_3(data);
    }
  }, [data_2, data]);
  useEffect(() => {
    display ? ref.current.focus() : ref.current.blur();
  }, [display]);
  useEffect(() => {
    checkNames();

    if (filt_data.length !== 0) {
      setState(filt_data);
    } else {
      setState(data);
    }
  }, [checkedArr, checkedState]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
      setCheckedState(new Array(result.data.length).fill(""));
      setData(result.data);
      setCheckedArr(new Array(result.data.length).fill(false));
      setState(result.data);
    });
  }, []);

  return (
    <div className="App">
      <div id="header">User list</div>
      <div id="head">
        <div tabIndex={1}>
          <div
            onInput={(e) => {
              setData_2(filterNames(e.target.innerText));
            }}
            onClick={() => {
              toggleDisplay(!display);
            }}
            onBlur={(e) => {
              display ? e.target.focus() : e.target.blur();
            }}
            data-text="Select name"
            contentEditable={true}
            ref={ref}
            id="input"
            placeholder="Select name"
          ></div>
          <ul
            id="checkbox_container"
            tabIndex={1}
            className={display ? "show" : "hide"}
          >
            {data_3.map((elem, index) => {
              return (
                <li className="styled_checkboxes">
                  <input
                    type="checkbox"
                    value={`${elem.name}`}
                    key={index}
                    checked={checkedArr[index]}
                    onChange={(e) => {
                      e.target.checked
                        ? handleOnChange(index, e.target.value, true)
                        : handleOnChange(index, "", false);
                    }}
                  ></input>
                  <label id="label">{elem.name}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="head_text">
          Filter: 2{" "}
          <button
            onClick={() => {
              setCheckedArr(new Array(data.length).fill(false));
              setCheckedState(new Array(data.length).fill(""));
              setState(data);
            }}
          >
            Clear all
          </button>
        </div>
        <div id="name_list">
          {" "}
          Name:{" "}
          <div className="flex_wrap head_text">
            {checkedState.map((elem) => {
              return (
                <div className="elem_list">
                  {elem === "" ? elem : elem + ", "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div id="sec_2">
        <div id="dataList_container">
          {state &&
            state.map((data) => {
              return <Cell components={data} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
