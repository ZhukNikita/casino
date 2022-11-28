import styles from "./Header.module.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {Link} from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export default function Header() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const userData = useSelector(state=> state.auth.data)

    function Logout (){
        dispatch(logout())
        window.localStorage.removeItem('token')
    }
    return(
        <div className={styles.header}>
            <h1>Casino</h1>
            <ul>
                <li>Пополнение</li>
                <li>Правила</li>

                {isAuth?
                    <li className={styles.login}><PersonOutlineIcon/><span>{userData.name}</span></li>
                    :
                    <li><Link to='/auth/login'>Войти</Link></li>}
                {isAuth? <li>{userData?.balance}₴</li> : ''}
                {isAuth &&(<li onClick={Logout} className={styles.logout}><DirectionsRunIcon sx={{width:'35px' , height:'35px'}}/><MeetingRoomIcon/></li>)}
            </ul>
        </div>
    )
}