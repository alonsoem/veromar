import React from 'react';

import { useState,useEffect} from 'react';
import { getProducts } from './api/api';
import {Form, Row} from "react-bootstrap";
import { useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';





function Results() {

    const {query} = useParams();
	const [ products, setProducts] = useState([]);
	const [ queryString, setQueryString ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();


    const navigateToStationQso = (station) => {
        if (station){
            navigate('/qsoList/'+station);
        }
    };

 
    useEffect(() => {

        if (query){
            setQueryString(query);
           //loadData(query);
        }
        // eslint-disable-next-line
        }, [query]
        )

    const handleSearch =()=>{
        loadData(queryString);
    }

    const loadData =(queryString)=> {
        
        setLoading(true);
        getProducts({des:queryString})
        .then((response) => {
            
            setProducts(response);
            setLoading(false);
          
      })
      .catch((response) => handleAxiosError(response));
    }
    const handleChangeCallsign = (event) => {
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


	const qsl = (qsl) =>{
		// eslint-disable-next-line
		if (qsl.status=="RC Confirmed"){
            
			return (
                <badge class="badge text-bg-warning  text-center" role="button"  >
                        Descargar QSL
                </badge>
            	);
        // eslint-disable-next-line
        }else if (qsl.status=="Confirmed"){
            return ("Confirmado");
		}else{
			return "-";
		}
    }



    function ActivityTable(){
        
        if (loading){
                return (<div class="card p-5 mt-3">
                    <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="m-2"> Aguarde un instante...</p>
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



                    <div className="card mt-3 col-6" style={{'background-color': 'grey'}}>
                        
                        <div className="card-body" >
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="callSignValue">
                                    
                                    <Form.Control onChange={handleChangeCallsign}  value={queryString} type="text"
                                        className="form-control" />
                                </Form.Group>
                            </Row>
                            <div className=" row float-end">
                                <div class="col-6 text-end">
                                    <button class="btn btn-success" onClick={handleSearch}>Buscar</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            

                
            </div>
            <ActivityTable />
            
        </div>

    
        

        );

    }
    export default Results;