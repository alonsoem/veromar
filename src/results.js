import React from 'react';

import { useState,useEffect} from 'react';
import { getProductsNew,getProviders } from './api/api';

import { useParams} from "react-router-dom";
import './assets/main.css';


function Results() {

    const {query} = useParams();
    const [ providers, setProviders] = useState([]);
    const [ queryString, setQueryString ] = useState("");

    const [ productsNew, setProductsNew] = useState([]);
	
    const [ loading, setLoading ] = useState(false);
    
    const calculate=(value,calculus)=>{
        var expression=calculus.replace("price",value);
        // eslint-disable-next-line
        return eval(expression);

    }
    
    useEffect(() => {

        console.log ("PROD NEW:");
        console.log(productsNew);
        // eslint-disable-next-line
    }, [productsNew] )

  

   
    const addNewProductList=()=>{
        productsNew.push([]);
        setProductsNew(productsNew);    
    }
  
    useEffect(() => {
        if (query){
            setLoading(true);
            loadProvidersWithData();
            setLoading(false);
            setQueryString(query);

        }else{
            loadProviders()
        }
        // eslint-disable-next-line
    }, [] )



    const loadProvidersWithData=()=>{
        getProviders()
        .then((response) => {
            
            setProviders(response.providers);
            response.providers.forEach((provider)=>{
                var index=productsNew.length;
                addNewProductList()
                loadData(index,provider.id,query);
                
                }
            )
          
      })
      .catch((response) => handleAxiosError(response));
    }

    const loadProviders=()=>{
        console.log("LOADING PROVIDERS");
        
        getProviders()
        .then((response) => {
            
            setProviders(response.providers);
            response.providers.forEach((provider)=>{

                addNewProductList()

                
                }
            )          
      })
      .catch((response) => handleAxiosError(response));
    }

    const loadData = async (relIndex, providerId, queryString)=>  {
        console.log ("updating "+ providerId);
        setLoading(true);

        await getProductsNew({des:queryString,prov:providerId})
        .then((response) => {
            
            setProductsNew((prevValue) => 
                prevValue.map((element,index) => {
                    // eslint-disable-next-line
                    if (index==relIndex){
                        return response
                    }else{
                        return element;
                    }             
                })
             );    
             setLoading(false);
         
      })
      .catch((response) => handleAxiosError(response));
    }

   
   


    const handleSubmit=(e)=>{
        e.preventDefault();
        providers.forEach((each,index)=>{
             loadData(index,providers[index].id,queryString);
        })
    }

    const handleChangeQuery = (event) => {
        setQueryString(event.target.value);
    };

    const handleAxiosError = (response) => {
        setLoading(false);
        //let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
        console.log("HANDLEAXIOSERROR");
        console.log(response);
        
      }

    function ActivityTable(){
        
        if (loading){
                return (<div class="card p-5 mt-3">
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="m-2"> Aguarde un instante... </p>
                    </div>
                    </div>);
        }else{
            if (productsNew.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY CONCIDENCIAS PARA TU BUSQUEDA...</h5>
                            <p>Cambia los parámetros de busqueda para lograr otra respuesta!</p></div>);
            }else{
        
                return(
                    <div>
                        
                        {productsNew.map((eachProdList,index)=>{
                            // eslint-disable-next-line
                            if (eachProdList.length==0 ){
                                return (
                                    <div>
                                        <div><img src={"/images/"+providers[index].image} alt={providers[index].name} style={{ height: "60px" }} /></div>
                                        <div class="text-center">NO HAY RESULTADOS</div>
                                    </div>
                                );
                            }else{
                        return (
                            

                            <div>
                                <div><img src={"/images/"+providers[index].image} alt={providers[index].name} style={{ height: "60px" }} /></div>
                                <table class="table striped hover bordered responsive mt-3 border">
                                    <thead>
                                        <tr class="table-primary">
                                            {eachProdList && eachProdList.titles.map((each) =>{
                                                return (
                                                    <th scope="col" class="text-center">{each}</th>
                                                );
                                            })}
                                            <th scope="col" class="text-center">PRECIO CLIENTE</th>
                                                    
                                                  
                                                    

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eachProdList &&  eachProdList.products.map((each) =>{
                                            return(
                                                <tr>
                                            {Object.entries(each).map(([name,value])=>{
                                                
                                                
                                                    // eslint-disable-next-line    
                                                    if (name=="price"){
                                                        return(<td class="text-center">{(value).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>);

                                                    }else{
                                                        return(<td class="text-center">{value}</td>);
                                                    }
                                                    
                                                

                                            }
                                            
                                            )}
                                            <td class="text-center">{(calculate(each.price,providers[index].calc)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                                            </tr>
                                            /*
                                            return ( 
                                                <tr>
                                                    <td class="text-center">{each.code}</td>
                                                    <td class="text-center">{each.description}</td>
                                                    <td class="text-center">{each.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                                                    <td class="text-center">{(each.price*0.6251*1.21*1.4).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                                                    <td class="text-center">{each.typeQty}</td>
                                                </tr>
                                            )*/

                                            )
                                        }   )}
                                    </tbody>
                                </table>
                                </div>
                        )
                            }
                    })}
                    </div>
                );
                    
            }
   
        }
    }
        
    
     

    return (

        

        <div  >
            <div class="s007 h-40">



                    <div className="col-5" >
                        
                        <div className="card-body" >
                            <form onSubmit={handleSubmit}>

                            
                            <fieldset>
          <legend>Que precio querés consultar?</legend>
          <div class="inner-form">
            <div class="input-field">
              <button class="btn-search" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </button>
              
              <input id="search" type="text" placeholder="" value={queryString} onChange={handleChangeQuery} />
              <input type="submit" hidden />
            </div>
          </div>
          <div class="suggestion-wrap">
            <span>tuerca</span>
            <span>termocupla</span>
            <span>receptáculo recto</span>
            <span>membrana</span>
            <span>sambuchito</span>
          </div>
        </fieldset>
                             
                            </form>
                        </div>
                    </div>
            

                
            </div>
            <ActivityTable />
            
        </div>

    
        

        );

    }
    export default Results;