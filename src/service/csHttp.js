/**
 * Created by zhai on 2018/1/5.
 */
import axios from 'axios'
import URITemplate from 'uri-templates'
//状态码
export const STATUS_HTTP_SUCCESS = '0';

//转换url key
const switchUrlKey = (url,query) => {
    let uriParams = {};
    for (let key of Object.keys(query)) {
        if (url.indexOf('{' + key + '}') !== -1) {
            uriParams[key] = query[key];
            delete query[key];
        }
    }
    return uriParams
}
//http请求 urlParam存在时: urlParam 为 url上带的参数 queryData 为 body 带的参数
export const apiHttp = (methodApi, queryData, urlParam = null) => {
    let method = Object.assign({}, methodApi);
    let query = Object.assign({}, queryData);
    let uriParams = {};
    //根据url对象进行 参数转换
    if (urlParam !== null) {
        uriParams = switchUrlKey(method.url, urlParam);
    } else {
        uriParams = switchUrlKey(method.url, query);
    }
    //for (let key of Object.keys(query)) {
    //    if (method.url.indexOf('{' + key + '}') !== -1) {
    //        uriParams[key] = query[key];
    //        delete query[key];
    //    }
    //}
    method.url = new URITemplate(method.url).fill(uriParams);
    let option = Object.assign({
        'emulateJSON': false
    }, method);
    if (option.method.toLowerCase() === 'post' ||
        option.method.toLowerCase() === 'put' ||
        // option.method.toLowerCase() === 'delete' ||
        option.method.toLowerCase() === 'patch') {
        // option.data = Object.assign({}, query);
        if (queryData.length > -1) {     // 说明是数组：[]
            option.data = queryData;
        } else {
            option.data = Object.assign({}, queryData);
        }
    } else {
        option.params = Object.assign({}, query);
        // 判断是否ie11
        // 如果是get方式，并且是ie11浏览器，请求地址上加时间戳，阻止ie11浏览器从缓存中获取数据
        const userAgent = window.navigator.userAgent;
        const isIE11 = userAgent.toLowerCase().indexOf('trident') > -1 && userAgent.indexOf('rv') > -1;
        if (isIE11 && option.method.toLowerCase() === 'get') {
            const url = option.url;
            if (url.indexOf('?') !== -1) {
                option.url = url + '&' + new Date().getTime();
            } else {
                option.url = url + '?' + new Date().getTime();
            }
        }
    }
    // console.log(option);
    return new Promise((resolve, reject) => {
        axios(option)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    resolve(res.data);
                } else {
                    reject(new Error(res.status));
                }
            })
    });
};
