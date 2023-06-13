import "./Produto.css";
import React, { useState, useEffect } from "react";
import Detalhes from '../../pages/details';

function Produtos() {

  const [produtos, setProdutos] = useState(null);
  const [ordena, setOrdena] = useState('titulo');
  const [buscaTitulo, setBuscaTitulo] = useState("");
  //const [items, setItems] = useState([]);
 
  useEffect(() => {

    fetch('https://my-json-server.typicode.com/marycamila184/movies/movies/')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(err => console.error(err))
  }, []);

  if (!produtos) {
    const newLocal = <img src="/assets/images/loading-gif.gif"></img>;
    return <div className="loadingApi">
      <p>Carregando...</p>
      {newLocal}
    </div>;
  }

  const handleSortChange = (event) => {
    setOrdena(event.target.value);
  };

  const ordenaproduto = produtos.sort((a, b) => {
    if (ordena === 'titulo') {
      return a.titulo.localeCompare(b.nome);
    } else if (ordena === 'preco_maior') {
      return a.ano - b.ano;
    } else if (ordena === 'preco_menor') {
      return b.ano - a.ano;
    }
  });

  const filtroProduto = produtos.filter((produtoF) =>
  produtoF.titulo.toLowerCase().includes(buscaTitulo.toLowerCase())
  );


  
  return (
    <div className="container text-center">
      <div className="custom-title p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">Pet Shop</h1>
        <p className="fs-5 text-muted">Itens em estoque!</p>
        <div className="row">
          <div className="col-sm">
            <label>Buscar por produto: </label>
            <input className='form-control'
              type="text"
              placeholder="Busca Produto"
              value={buscaTitulo}
              onChange={event => setBuscaTitulo(event.target.value)}
            />
            <div className="col-sm"></div>
          </div>
          <div className="col-sm"></div>
          <div className="col-sm">
            <label>Ordenar por: </label>
            <select className='form-select' value={ordena} onChange={handleSortChange}>
              <option value="titulo">Nome</option>
              <option value="preco_maior">Preço crescente</option>
              <option value="preco_menor">Preço decrescemte</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        {filtroProduto.map((produto, i) => (
          <div className="col" key={i}>
            <div className="card_format">
              <div className="card">
                <div className="image_width">
                  <img src={produto.poster} alt={produto.titulo} className="card-img-top" />
                </div>
                <div className="card-body">
                  <h2 className="card-title">{produto.titulo}</h2>
                  <br></br>
                  <h4>Preço: {produto.ano}</h4>
                  <br></br>
                  <a href={`/details/${produto.id}`}>
                    <div>
                      <button className="btn btn-primary">Detalhes</button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Produtos;
