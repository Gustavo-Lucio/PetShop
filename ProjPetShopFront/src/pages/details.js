import React from 'react';
import './details.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Checkout from '../components/Checkout';
import api from '../services/api'

function Detalhes() {
    const [detalhes, setDetalhes] = useState();
    const { id } = useParams();
    const [categorias, setCategorias] = useState();
    // Carrega os detalhes do produto com o ID fornecido
    useEffect(() => {
        api.get(`/produtos/${id}`)
            .then(response => {
                setDetalhes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    // Carrega as categorias disponíveis
    useEffect(() => {
        api.get(`/categorias/`)
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!detalhes) {
        // Exibe uma mensagem de carregamento enquanto os detalhes não forem carregados
        return <div className="loadingApi">
            <p>Carregando...</p>
            <img src="/assets/images/loading-gif.gif" />
        </div>;
    }
     // Calcula a média das notas dos comentários
    const comentarios = detalhes.comentario;
    const totalNotas = comentarios.length;
    const somaNotas = comentarios.reduce((soma, comentario) => soma + comentario.nota, 0);
    const mediaNotas = totalNotas > 0 ? somaNotas / totalNotas : 0;
    // Encontra a categoria selecionada do produto
    const categoriaSelecionada = categorias.find(categoria => categoria._id === detalhes.categoria);
    const nomeCategoria = categoriaSelecionada ? categoriaSelecionada.nome : '';

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
                                <img id="dimImagem"
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
                                    <h3>Produto: {detalhes.nome}</h3>
                                    <br></br>
                                    <p>Categoria: {nomeCategoria} </p>
                                    <p>Preço: R${detalhes.preco} </p>
                                    <p>Nota: {mediaNotas.toFixed(2)}</p>
                                    <p>Quantidade: {detalhes.quantidade} </p>

                                    <button onClick={() => Checkout()}>Adicionar ao carrinho</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="container text-center">
                    <div className="row">
                        <div className="card" >
                            <div className="col-md-12">
                                <h2>Comentários:</h2>
                                {detalhes.comentario.map(comentario => (
                                    <div key={comentario._id}>
                                        <p>{comentario.texto}</p>
                                        <p>Nota: {comentario.nota}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detalhes;
