import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {useEffect, useState} from "react";
import {NoMatch} from "./components/NoMatch";
import Register from "./components/Register/Register";
import Home from './components/Home/Home'
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";
import Roulette from "./components/Roulette/Roulette";

function App() {
    const dispatch = useDispatch()
    const [arr, setArr] = useState([])
    let cellMassive = []
    let cells = 38;

    function generateItem() {
        for (let i = 0 ; i < cells ;i++) {
            const cellColor = i % 2? 'black' : 'red'
            const item = {value: i , cellColor}
            cellMassive.push(item)
        }
        cellMassive[cellMassive.length-1].value = '00'
        for(let i = 0; i < cellMassive.length; i++)
        {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp =  cellMassive[i];
            cellMassive[i] = cellMassive[j];
            cellMassive[j] = tmp;
        }

        let zeroFinder = cellMassive.find(e=> e.value === 0 )
        setArr(cellMassive)
        zeroFinder.cellColor = ''


    }

    console.log(arr);
    useEffect(() => {
        dispatch(fetchAuthMe())
        generateItem()
    }, []);
    return (
    <div className="App">
        <Routes>
            <Route path='/auth/login' element={<Login/>} ></Route>
            <Route path='/auth/register' element={<Register />} ></Route>
            <Route path='/home' element={<Home/>} ></Route>
            <Route path='/roulette' element={<Roulette generateItem={generateItem} arr={arr}/>} ></Route>
            <Route path='*' element={<NoMatch/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;
