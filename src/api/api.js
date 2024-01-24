import axios from 'axios';


const foreignRequest = (type, fullPath,params,config) => axios
    .request({ url: `${fullPath}`, method: type, params:params, headers:config})
    .then(req => req.data);



export const getProducts = (params) => foreignRequest('get','https://veromar.qrits.com.ar/api/getProducts.php',params,{'Content-Type':'Content-Type: application/json'});
export const getProducts2 = (params) => foreignRequest('get','https://veromar.qrits.com.ar/api/getProducts2.php',params,{'Content-Type':'Content-Type: application/json'});
export const getProducts3 = (params) => foreignRequest('get','https://veromar.qrits.com.ar/api/getProducts3.php',params,{'Content-Type':'Content-Type: application/json'});
