import React from 'react';

import { useState,useEffect} from 'react';
import { getProducts } from './api/api';
import {Form, Row} from "react-bootstrap";
import { useParams} from "react-router-dom";
import './assets/main.css';






function Results() {

    const {query} = useParams();
	const [ products, setProducts] = useState([]);
    
	const [ queryString, setQueryString ] = useState("");
    const [ loading, setLoading ] = useState(false);
    


   
 
    useEffect(() => {

        if (query){
           
           loadData(query);
           setQueryString(query);
        }
        // eslint-disable-next-line
    }, [] )

  

    const loadData =(queryString)=> {
        
        setLoading(true);
        getProducts({des:queryString})
        .then((response) => {
            
            setProducts(response);

            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        loadData(queryString);
    }

    const handleChangeQuery = (event) => {
        setQueryString(event.target.value);
    };

    const handleAxiosError = (response) => {
        setLoading(false);
        //let errorToDisplay = "OCURRIO UN ERROR! VERIFIQUE NUEVAMENTE A LA BREVEDAD";
        console.log("HANDLEAXIOSERROR");
        console.log(response);
            // eslint-disable-next-line
        if (response.response.data.code==1062 ) {
              //errorToDisplay = "EL QSO YA EXISTE EN NUESTRA BASE DE DATOS.";
            }
        // eslint-disable-next-line
        if (response.message=="Network Error") {
          //errorToDisplay = "Error de red!. Reintente a la brevedad";
        }
    
        //setError(errorToDisplay);
        //notifyError(errorToDisplay);
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
            if (products.length===0){
                return (<div class="card p-5 mt-3">
                            <h5>NO HAY CONCIDENCIAS PARA TU BUSQUEDA...</h5>
                            <p>Cambia los parámetros de busqueda para lograr otra respuesta!</p></div>);
            }else{
        
                return (
                    <table class="table striped hover bordered responsive mt-3 border">
                        <thead>
                            <tr class="table-primary">
                                {products.titles.map((each) =>{
                                    return (
                                        <th scope="col" class="text-center">{each}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {products.products.map((each) =>{
                                return ( 
                                    <tr>
                                        <td class="text-center">{each.code}</td>
                                        <td class="text-center">{each.description}</td>
                                        <td class="text-center">{each.price}</td>
                                        <td class="text-center">{Number((each.price*1.1).toFixed(2))}</td>
                                        <td class="text-center">{each.typeQty}</td>
                                    </tr>
                                )
                            }   )}
                        </tbody>
                    </table>);
            }
      }
        
     }
     

    return (

        

        <div >
            <div class="headerSearch h-50">



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