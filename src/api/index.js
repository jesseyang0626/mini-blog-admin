import axios from 'axios'

export function databaseQuery(accessToken, query, env) {
  return axios.post(`/weixinapi/tcb/databasequery?access_token=${accessToken}`, {
    query, env
  })
}

export function databaseAdd(accessToken, query, env) {
  return axios.post(`/weixinapi/tcb/databaseadd?access_token=${accessToken}`, {
    query, env
  })
}
export function databaseDelete(accessToken, query, env) {
  return axios.post(`/weixinapi/tcb/databasedelete?access_token=${accessToken}`, {
    query, env
  })
}
export function databaseUpdate(accessToken, query, env) {
  return axios.post(`/weixinapi/tcb/databaseupdate?access_token=${accessToken}`, {
    query, env
  })
}
export function invokeCloudFunction(accessToken, name, params, env) {
  return new Promise((resolve, reject) => {
    axios.post(`/weixinapi/tcb/invokecloudfunction?access_token=${accessToken}&env=${env}&name=${name}`, params)
    .then(res => {
      console.log(res);
      if(res.status==200 && res.data.errcode == 0){
        resolve(res.data);
      }else if(res.data.errcode == 42001){
        reject("assesstoken overtime")
      }else{
        reject("youwenti")
      }
    }).catch(err => {
      reject(err.data)
    })
  })
}