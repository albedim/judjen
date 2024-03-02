import axios from "axios"
import { jwtDecode } from "jwt-decode"

//export const BASE_URL = "http://192.168.1.8:8000"
export const BASE_URL = "https://judjen.pythonanywhere.com/"

export const isLoggedIn = async () => {
  
  const cookie = getCookie("jwt-token")
  let isLoggedIn_ = true

  if (!cookie) {
    isLoggedIn_ = false;
  }

  await axios.post(BASE_URL + "/users/sync", {}, { 
    headers: { 
      Authorization: "Bearer " + cookie 
    }
  })
  .then(res => {
    
  })
  .catch(err => {
    isLoggedIn_ = false;
  })

  return isLoggedIn_
  
}

export const getUser = async () => {
  const cookie: string | undefined = getCookie("jwt-token")
  let user = {}
  if (cookie !== undefined) {
    const userId = jwtDecode<any>(cookie).sub.user_id
    await axios.get(BASE_URL + "/users/" + userId, { headers: { Authorization: 'Bearer ' + getCookie("jwt-token") } })
    .then(res => {
      user = res.data.param
    })
    .catch(err => {
      
    })
  }
  return user
}

export const setCookie = (cookie: string, cValue: string, expDays: number) => {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookie + "=" + cValue + "; " + expires + "; path=/";
}

export const getCookie = (cookie: string) => {
  const name = cookie + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded .split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

export const eraseCookie = (cookie: string) => {   
  document.cookie = cookie+'=; Max-Age=-99999999;';  
}