import React from 'react';
import './details.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Checkout from '../components/Checkout';

import Comments from './../components/Comments/index';

function Detalhes() {
    const [detalhes, setDetalhes] = useState();
    const {id} = useParams();
  
    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/marycamila184/moviedetails/moviedetails/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setDetalhes(data);
            });
    }, []);
    
    if (!detalhes) {
        return <div className="loadingApi">
            <p>Carregando...</p>
            <img src="/assets/images/loading-gif.gif"></img>
        </div>;
    }

    return (

        <div>
            <div className="container text-center">
                <div className="custom-title p-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4 fw-normal">Detalhes</h1>
                    <p className="fs-5 text-muted">Informações sobre {detalhes.titulo}</p>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <div className="card" >
                            <div className="image_details">
                                <img src={detalhes.poster} alt={detalhes.titulo} className="card-img-top" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card-pos">
                            <div className="card">
                                <div className="text_details">
                                    <h1>Produto: {detalhes.titulo}</h1>
                                    <h3>Categoria: {detalhes.ano} </h3>
                                    <p>Preço: R${detalhes.ano} </p>
                                    <p>Nota: {detalhes.nota} </p>
                                    <p>Quantidade: {detalhes.ano} </p>

                                    <button onClick={() => Checkout(detalhes)}>Adicionar ao carrinho</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Comments filme={detalhes.titulo} /> */}
            </div>
        </div>
    )
}
export default Detalhes;