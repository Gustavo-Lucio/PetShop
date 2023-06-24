import './Produto.css'
import React, { useState, useEffect } from 'react'
import api from '../../services/api'

function Produtos() {
  const [categorias, setCategorias] = useState([])
  const [produtos, setProdutos] = useState(null)
  const [ordena, setOrdena] = useState('nome')
  const [buscaProduto, setBuscaProduto] = useState('')

  useEffect(() => {
    api.get('/produtos')
      .then(response => {
        const produtosData = response.data;
        const produtosPorCategoria = {};

        // Organiza os produtos por categoria
        produtosData.forEach(produto => {
          if (!produtosPorCategoria[produto.categoria]) {
            produtosPorCategoria[produto.categoria] = [];
          }
          produtosPorCategoria[produto.categoria].push(produto);
        });

        setProdutos(produtosPorCategoria);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    api.get('/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!produtos) {
    const newLocal = <img src="/assets/images/loading-gif.gif"></img>
    return (
      <div className="loadingApi">
        <p>Carregando...</p>
        {newLocal}
      </div>
    )
  }

  const handleSortChange = (event) => {
    setOrdena(event.target.value)
  }

  return (
    <div className="container text-center">
      <div className="custom-title p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">Pet Shop</h1>
        <p className="fs-5 text-muted">Itens em estoque!</p>
        <div className="row">
          <div className="col-sm">
            <label>Buscar por produto: </label>
            <input
              className="form-control"
              id='border-1px'
              type="text"
              placeholder="Busca Produto"
              value={buscaProduto}
              onChange={(event) => setBuscaProduto(event.target.value)}
            />
            <div className="col-sm"></div>
          </div>
          <div className="col-sm"></div>
          <div className="col-sm">
            <label>Ordenar por: </label>
            <select
              className="form-select"
              value={ordena}
              onChange={handleSortChange}
            >
              <option value="nome">Nome</option>
              <option value="preco_maior">Preço crescente</option>
              <option value="preco_menor">Preço decrescente</option>
            </select>
          </div>
        </div>
      </div>
      {categorias.map(categoria => (
        <div key={categoria._id}>
          <br></br>
          <hr></hr>
          <h1>{categoria.nome}</h1>
          <br></br>
          <div className="row">
            {/* Executa primeiro a filtragem por categorias, então por busca e por ultimo o tipo de ordenação */}
            {produtos[categoria._id]?.filter((produto) =>
              produto.nome.toLowerCase().includes(buscaProduto.toLowerCase())
            ).sort((a, b) => {
              if (ordena === 'nome') {
                return a.nome.localeCompare(b.nome);
              } else if (ordena === 'preco_maior') {
                return parseFloat(a.preco) - parseFloat(b.preco);
              } else if (ordena === 'preco_menor') {
                return parseFloat(b.preco) - parseFloat(a.preco);
              }
              return 0; // Retorna 0 como fallback para evitar erros
            }).map((produto) => (
              <div className="col-sm-6" key={produto.cod}>
                <div className="card_format">
                  <div className="card">
                    <div className="image_width">
                      <img id='dimImagem'
                        src={`data:image/jpeg;base64,${btoa(
                          String.fromCharCode(...produto.imagem.data),
                        )}`}
                        alt={produto.nome}
                        className="card-img-top"
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{produto.nome}</h2>
                      <br></br>
                      <h4>Preço: {produto.preco}</h4>
                      <br></br>
                      <a href={`/details/${produto.cod}`}>
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
      ))}
    </div>
  )
}

export default Produtos
