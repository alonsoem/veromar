import React from 'react';

import { useState,useEffect} from 'react';
import { getProducts, getProducts2,getProducts3 } from './api/api';

import { useParams} from "react-router-dom";
import './assets/main.css';

import ckfImage from './assets/ckf.jpg'
import tangoImage from './assets/tango.jpg'
import ferriplastImage from './assets/ferriplast.jpg'





function Results() {

    const {query} = useParams();
	const [ products, setProducts] = useState([]);
    const [ products2, setProducts2] = useState([]);
    const [ products3, setProducts3] = useState([]);
    
	const [ queryString, setQueryString ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ loadingSub1, setLoadingSub1 ] = useState(false);
    const [ loadingSub2, setLoadingSub2 ] = useState(false);
    const [ loadingSub3, setLoadingSub3 ] = useState(false);
    


   
 
    useEffect(() => {

        if (query){
           
           loadData(query);
           loadData2(query);
           loadData3(query);
           setQueryString(query);
        }
        // eslint-disable-next-line
    }, [] )

    useEffect(() => {

        if (loadingSub1 || loadingSub2 || loadingSub3){
           
           setLoading(true);
        }else{
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [loadingSub1,loadingSub2,loadingSub3] )

  

    const loadData =(queryString)=> {
        
        setLoadingSub1(true);
        getProducts({des:queryString})
        .then((response) => {
            
            setProducts(response);

            setLoadingSub1(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }

    const loadData2 =(queryString)=> {
        
        setLoadingSub2(true);
        getProducts2({des:queryString})
        .then((response) => {
            
            setProducts2(response);

            setLoadingSub2(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }
    const loadData3 =(queryString)=> {
        
        setLoadingSub3(true);
        getProducts3({des:queryString})
        .then((response) => {
            
            setProducts3(response);

            setLoadingSub3(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }




    const handleSubmit=(e)=>{
        e.preventDefault();
        loadData(queryString);
        loadData2(queryString);
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
                    <div>

                    <div><img src={ckfImage} alt="SKF" style={{ height: "60px" }}/></div>
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
                                        <td class="text-center">{Number((each.price*0.61*1.21*1.40).toFixed(2))}</td>
                                        <td class="text-center">{each.typeQty}</td>
                                    </tr>
                                )
                            }   )}
                        </tbody>
                    </table>
                    
                
                    <div><img src={ferriplastImage} alt="FERRIPLAST" style={{ height: "60px" }} /></div>
                    <table class="table striped hover bordered responsive mt-3 border">
                        <thead>
                            <tr class="table-primary">
                                {products2.titles.map((each) =>{
                                    return (
                                        <th scope="col" class="text-center">{each}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {products2.products.map((each) =>{
                                return ( 
                                    <tr>
                                        <td class="text-center">{each.code}</td>
                                        <td class="text-center">{each.description}</td>
                                        <td class="text-center">{each.price}</td>
                                        <td class="text-center">{Number((each.price*0.5*1.21*1.40).toFixed(2))}</td>
                                        <td class="text-center">{each.typeQty}</td>
                                    </tr>
                                )
                            }   )}
                        </tbody>
                    </table>

                    <div><img src={tangoImage} alt="TANGO" style={{ height: "60px" }} /></div>
                    <table class="table striped hover bordered responsive mt-3 border">
                        <thead>
                            <tr class="table-primary">
                                {products3.titles.map((each) =>{
                                    return (
                                        <th scope="col" class="text-center">{each}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {products3.products.map((each) =>{
                                return ( 
                                    <tr>
                                        <td class="text-center">{each.code}</td>
                                        <td class="text-center">{each.description}</td>
                                        <td class="text-center">{each.price}</td>
                                        <td class="text-center">{Number((each.price*0.6251*1.21*1.4).toFixed(2))}</td>
                                        <td class="text-center">{each.typeQty}</td>
                                    </tr>
                                )
                            }   )}
                        </tbody>
                    </table>
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