import styles from './Login.module.scss'
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";

export const Login = () => {
    const dispatch = useDispatch()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const fields = {email , password}

    async function OnSubmit (){
        const data = await dispatch(fetchAuth(fields))
        if (!data.payload) {
            alert('Не удалось авторизоваться')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }
    const isAuth = useSelector(selectIsAuth)

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
                  <form>
                      <input className={styles.email} autoComplete='on' placeholder='Логин' type="text" onChange={e=>setEmail(e.target.value)}/>
                      <input className={styles.password} autoComplete='on' placeholder='Пароль' type="password" onChange={e=>setPassword(e.target.value)}/>
                  </form>

                  <button className={styles.signIn} onClick={OnSubmit}>Войти</button>
                  <div className={styles.foot}>
                      <Link to='/auth/register'>Зарегистрироваться</Link>
                      <Link to='/auth/login'>Забыли пароль?</Link>
                  </div>
              </div>
          {/*)}*/}
      </div>



  )
}