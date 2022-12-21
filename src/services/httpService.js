import axios from "axios";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

// const URL_API_VIVA_APP = ""
const URL_API_PORTAL_EVENTOS = process.env.VUE_APP_URL_API_PORTAL_EVENTOS;
axios.interceptors.request.use(config => {
    loadingService.show()
    return config
}, error => {
    loadingService.hide()
    return Promise.reject(error)
})
axios.interceptors.response.use(response =>{
    loadingService.hide()
    return response
}, error => {
    loadingService.hide()
    return Promise.reject(error)
})
const toastHandlers = {
    200 : ()=> toastService.success(),
    201 : ()=> toastService.success(),
    400 : ()=> toastService.error(),
    401 : ()=> toastService.error(),
    403 : ()=> toastService.error(),
    404 : ()=> toastService.error(),
    500 : ()=> toastService.error(),
}

export default {
    execute:({ method, data, action }, useToast = true)=>
        axios({
            method,
            data,
            url :`${URL_API_PORTAL_EVENTOS}${action}`,
        })
        .then(res => {
            useToast && toastHandlers[res.status]()
            return Promise.resolve(res)
        })
        .catch(err => {
            useToast && toastHandlers[err.response.status]()
            return Promise.reject(err)
        }),
    get:(queryStringOrAction = "", useToast = true)=> axios.get(`${URL_API_PORTAL_EVENTOS}${queryStringOrAction}`)
        .then(res => {
            useToast && toastHandlers[res.status]()
            return Promise.resolve(res)
        })
        .catch(err => {
            console.log(err)
            useToast && toastHandlers[err.response.status]()
            return Promise.reject(err)
        }),
    post:(action, data, headers = {}, useToast = true)=> axios.post(`${URL_API_PORTAL_EVENTOS}${action}`, data, { headers })
        .then(res => {
            useToast && toastHandlers[res.status]()
            return Promise.resolve(res)
        })
        .catch(err => {
            useToast && toastHandlers[err.response.status]()
            return Promise.reject(err)
        }),
    put:(action, data, headers, useToast = true)=> axios.put(`${URL_API_PORTAL_EVENTOS}${action}`, data, { headers })
        .then(res => {
            useToast && toastHandlers[res.status]()
            return Promise.resolve(res)
        })
        .catch(err => {
            useToast && toastHandlers[err.response.status]()
            return Promise.reject(err)
        }),
    delete:(action, id, headers, useToast = true)=> axios.delete(`${URL_API_PORTAL_EVENTOS}${action}`, { headers })
        .then(res => {
            useToast && toastHandlers[res.status]()
            return Promise.resolve(res)
        })
        .catch(err => {
            useToast && toastHandlers[err.response.status]()
            return Promise.reject(err)
        }),
    URL_API_VIVA_APP: URL_API_PORTAL_EVENTOS,
    types : {
        POST    : "POST",
        PUT     : "PUT",
        GET     : "GET",
        DELETE  : "DELETE",
    }
}
