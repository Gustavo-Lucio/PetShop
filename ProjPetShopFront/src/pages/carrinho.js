import React, { useState } from 'react'
import './carrinho.css'
import AddCarrinho from '../addCarrinho'

export default function Carrinho() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [nomeCartao, setNomeCartao] = useState('')
  const [numeroCartao, setNumeroCartao] = useState('')
  const [cvcCartao, setCvcCartao] = useState('')
  const [cpf, setCpf] = useState('')
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [isValid, setIsValid] = useState(false)

  function handleSubmit() {}
  // Lógica para tratar o envio do formulário
  return (
    <div className="form-custom">
      <div className="container text-center">
        <div class="custom-title p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Checkout</h1>
          <div class="row">
            <div class="col-sm">
              <div className="cardCad">
                <br></br>
                <AddCarrinho />

                {/* {items.map((item) => (
                  <div key={item.id}>
                    <h3>{item.nome}</h3>
                    <p>{item.descricao}</p>
                    <button onClick={() => addToCart(item)}>
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))} */}
                <div className="row">
                  <div class="col-sm"></div>
                </div>
                <br></br>
              </div>
            </div>

            {/* Dados cartão */}
            <div class="col-sm">
              <div className="cardCad">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <br></br>
                    <h2> Dados para entrega: </h2>
                    <br></br>
                    <label>
                      Endereça para entrega:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        // placeholder="Insira o nome do cartão"
                        value={nomeCartao}
                      />
                    </label>
                  </div>
                  <br />
                  <div class="form-group">
                    <label>
                      Número para contato:
                      <input
                        type="text"
                        data-ls-module="charCounter"
                        maxlength="20"
                        className="form-control"
                        // placeholder="Insira o número do cartão"
                        value={numeroCartao}
                      />
                    </label>
                  </div>
                  <br />
                  <div class="form-group">
                    <label>
                      Cartão para compra:
                      <input
                        type="text"
                        data-ls-module="charCounter"
                        maxlength="3"
                        className="form-control"
                        aria-describedby="emailHelp"
                        // placeholder="Insira o CVC"
                        value={cvcCartao}
                      />
                    </label>
                  </div>
                  <br></br>
                  <div class="form-group">
                    <label className="labelAcess">
                      CVC:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        // placeholder="Insira E-mail para login!"
                        value={login}
                      ></input>
                    </label>
                  </div>
                  <br></br>
                </form>
                <br></br>
              </div>
            </div>
          </div>
          <br />
          <br></br>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Finalizar pedido!
          </button>
        </div>
      </div>
    </div>
  )
}
