import styles from './Roulette.module.scss'
import Header from "../Header/Header";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import red from '../../img/red.png'
import black from '../../img/black.png'
import green from '../../img/green.png'
export default function Roulette({generateItem  ,arr   }) {
    const [count , setCount] = useState(null)
    const [animation , setAnimation] = useState('')
    const [isWin , setIsWin] = useState('')
    const [history , setHistory] = useState([])
    const isAuth = useSelector(selectIsAuth)
    const [isGame , setIsGame] = useState(false)
    function minMax(min , max){
        return Math.floor(Math.random() * (max - min)+min)
    }

    function start(){
        setIsGame(true)
        let random = minMax(10 , 28)
        setIsWin('')
        if(!isAuth) return alert('Войдите пожалуйста в аккаунт')
        else {
        const move = -150 * random;
        setAnimation(move + 'px');
        setCount(count+1);
        }
        setTimeout(()=>{
            setHistory([arr[random+2] , ...history])
        },5000)
        setTimeout(()=>{
            setTimeout(()=>{
                generateItem()
                setIsGame(false)
            },5100)
            setAnimation(0)
        }, 7000)
    }

    console.log(history);
    return(
        <div className={styles.body}>
            <Header/>
            <div className={styles.game}>
                <div className={styles.cells}>
                        <>
                            <PanToolAltIcon/>
                            <ul style={{left:`${animation}`}}>
                                {
                                    arr.map((cell) => <li style={cell.cellColor === 'red'?{backgroundColor: "red"}: {backgroundColor:'black'}&& cell.value === 0 || cell.value === '00'? {backgroundColor:'green'}:{}} key={Math.random()*10000} className={styles.item}>{cell.value}</li>)
                                }
                            </ul>
                        </>
                </div>
                {
                    isGame === false
                        ?<button className={styles.start} onClick={start}>Крутить</button>
                        :<button className={styles.start} style={{backgroundColor:'lightgray'}}>Крутить</button>



                }
                <h2 style={{margin:'10px 0 0 0' , height:'73px'}}>{isWin}</h2>
                <div className={styles.history}>
                        {history.map(h=>
                            h.value === 0 || h.value === '00'
                                ? <img key={Math.random()*10000} src={green} alt="" height='46px' width='46px'/>
                                :
                                h.cellColor === 'red'?
                                    <img key={Math.random()*10000} src={red} alt="" height='46px' width='46px'/>
                                    :
                                    <img key={Math.random()*10000} src={black} alt="" height='46px' width='46px'/>

                        )}
                </div>
            </div>
        </div>
    )
}