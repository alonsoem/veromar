import axios from 'axios';


const  foreignRequest = (type, fullPath,params, config) => axios
    .request({ url: `${fullPath}`, method: type, params:params, headers:config})
    .then(req => req.data);


export const getProductsNew = (params) => foreignRequest('get','https://veromar.qrits.com.ar/api/getProductsNew.php',params,{'Content-Type':'Content-Type: application/json'});
export const getProviders = (params) => foreignRequest('get','https://veromar.qrits.com.ar/api/getProviders.php',params,{'Content-Type':'Content-Type: application/json'});
