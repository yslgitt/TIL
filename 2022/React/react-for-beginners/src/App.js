// import Button from "./Button";
// import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");

  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  // const iRunOnlyOnce = () => {
  //   console.log("i run only once.");
  // };
  // useEffect(iRunOnlyOnce, []);
  useEffect(() => {
    console.log("i run only one");
  }, []);
  useEffect(() => {
    // if (keyword !== "" && keyword.length > 5) {
    //   console.log("SEARCH FOR", keyword);
    // }
    console.log("i run when 'keyword' changes.");
  }, [keyword]); // [] < 안의 것의 변화할 떄마다 코드 실행
  useEffect(() => {
    console.log("i run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("i run when 'keyword' or 'counter' changes.");
  }, [keyword, counter]);


  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..." />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}
function Hello() {
  // function byeFn() {
  //   console.log("destroyed :)");
  // }
  // function hiFn() {
  //   console.log("created :)");
  //   return byeFn;
  // }

  // useEffect(() => {
  //   console.log('created :)');
  //   return () => console.log('destroyed :(');
  // }, [])

  useEffect(() => {
    console.log('hi :)');
    return () => console.log('bye :(')
  }, []);

  // useEffect(function() {
  //   console.log('hi :)');
  //   return function(){
  //     console.log('bye :(')
  //   }
  // }, []);

  return <h1>Hello</h1>;
}

function App2() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev)
  return (
    <div>
      {showing ? <Hello /> : null }
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App2;
