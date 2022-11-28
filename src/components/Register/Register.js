import styles from "./Register.module.scss";
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";

export default function Register(){
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const [email , setEmail ] = useState('')
    const [name , setName ] = useState('')
    const [surname , setSurname ] = useState('')
    const [password , setPassword ] = useState('')
    const [passwordRepeat , setPasswordRepeat ] = useState('')
    const [passwordDiff , setPasswordDiff] = useState(false)

    async function Check (){
        if (password !== passwordRepeat) {
            setPasswordDiff(true)
            return 'Пароли не совпадают'
        }
        const fields = {email , name , surname , password}
        const data = await dispatch(fetchRegister(fields))
        if (!data.payload) {
            alert('Не удалось зарегистрироваться')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }
    if (isAuth) {
        return <Navigate to='/home'/>
    }
    return(
            <div style={{textAlign:"center"}}>
                {/*{loading && <h1 className='pulse'>Casino</h1>}*/}
                {/*{!loading && <h1 className='up'>Casino</h1> }*/}
                {/*{!loading && (*/}
                    <div className={styles.body}>
                        <h2>Добро пожаловать!</h2>
                        <form >
                            <input
                                className={styles.email}
                                placeholder='Почта'
                                type="text"
                                onChange={e=>{setEmail(e.target.value)}}/>
                            <input
                                style={{borderBottom: '1px solid lightgrey'}}
                                placeholder='Имя'
                                type="text"
                                onChange={e=>{setName(e.target.value)}}/>
                            <input
                                style={{borderBottom: '1px solid lightgrey'}}
                                placeholder='Фамилия'
                                type="text"
                                onChange={e=>{setSurname(e.target.value)}}/>
                            <input
                                type="password"
                                style={passwordDiff === false?{color:'black', borderBottom: '1px solid lightgrey'}:{color:'red', borderBottom: '1px solid lightgrey'}}
                                autoComplete="on"
                                placeholder={passwordDiff === false? 'Пароль' : 'Пароли не совпадают' }
                                onChange={e=>{setPassword(e.target.value)}}/>
                            <input
                                className={styles.password}
                                style={passwordDiff === false?{color:'black'}:{color:'red'}}
                                placeholder={passwordDiff === false? 'Пароль' : 'Пароли не совпадают' }
                                autoComplete="on"
                                type="password"
                                onChange={e=>{setPasswordRepeat(e.target.value)}}/>
                        </form>

                        <button className={styles.signIn} onClick={Check}>Зарегистрироваться</button>
                        <Link to='/auth/login'>Уже есть аккаунт</Link>
                    </div>
                {/*)}*/}
            </div>
    )
}