import React from 'react';
import './details.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Checkout from '../components/Checkout';
import api from '../services/api'

import Comments from './../components/Comments/index';

function Detalhes() {
    const [detalhes, setDetalhes] = useState();
    const { id } = useParams();

    useEffect(() => {
        api.get(`/produtos/${id}`)
            .then(response => {
                setDetalhes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!detalhes) {
        return <div className="loadingApi">
            <p>Carregando...</p>
            <img src="/assets/images/loading-gif.gif" />
        </div>;
    }

    return (

        <div>
            <div className="container text-center">
                <div className="custom-title p-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4 fw-normal">Detalhes</h1>
                    <p className="fs-5 text-muted">Informações sobre {detalhes.nome}</p>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <div className="card" >
                            <div className="image_details">
                                <img
                                    src={`data:image/jpeg;base64,${btoa(
                                        String.fromCharCode(...detalhes.imagem.data),
                                    )}`}
                                    alt={detalhes.nome}
                                    className="card-img-top"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card-pos">
                            <div className="card">
                                <div className="text_details">
                                    <h1>Produto: {detalhes.nome}</h1>
                                    <h3>Categoria: {detalhes.categoria} </h3>
                                    <p>Preço: R${detalhes.preco} </p>
                                    <p>Nota: {detalhes.nota} </p>
                                    <p>Quantidade: {detalhes.quantidade} </p>

                                    <button onClick={() => Checkout(detalhes)}>Adicionar ao carrinho</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center">

                    {/* <div className="row">
                    <div className="col-md-3">
                        {detalhes.comentario}
                    </div>
                    <div className="col-md-9">
                        {detalhes.nota}
                    </div>
                </div> */}

                </div>
            </div>
        </div>
    )
}
export default Detalhes;