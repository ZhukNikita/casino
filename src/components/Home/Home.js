import styles from './Home.module.scss'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth , logout} from "../../redux/slices/auth";
import {Link} from "react-router-dom";
import roulette from "../../img/roulette.webp";
import Header from "../Header/Header";
export default function Home(){


    return(
        <div className={styles.content}>
            <Header/>
            <hr/>
            <div className={styles.games}>
                <div className={styles.game}><Link to='/roulette'><img src={roulette} alt="" width='100%' height='200px'/></Link></div>
                <div className={styles.game}></div>
                <div className={styles.game}></div>
                <div className={styles.game}></div>
                <div className={styles.game}></div>
                <div className={styles.game}></div>
            </div>
        </div>

    )
}