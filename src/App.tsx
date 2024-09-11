import { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import MainGrid, { cardT } from './components/MainGrid/MainGrid';
import './App.css';

function App() {

  const [data, setData] = useState<cardT[]>([]);

  const moveCardHandler = useCallback((dragIndex : number, hoverIndex : number) => {
    setData(prevState => update(prevState, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevState[dragIndex]],
      ],
    }),)
  }, []);

  //  TO load data initially on first load from the static json file we are sending a GET request 
  // which is intercepted by msw where it is sending and storing the data in sessionStorage
  useEffect(() => {
      fetch("/data", {
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => setData(res.results));
  }, [])

  // To save data in the sessionStorage we are sending a POST request 
  // which is intercepted by MSW and data is updated in sessionStorage
  useEffect(() => {
    fetch("/saveData", {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log(res));
  }, [data])

  return (
    <DndProvider backend={HTML5Backend}>
      <MainGrid 
        data={data} 
        moveCardHandler={moveCardHandler} />
    </DndProvider>
  )
}

export default App
