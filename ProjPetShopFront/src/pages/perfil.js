import React, { useState } from 'react'
import './perfil.css'

export default function Perfil() {
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

  const validaEmail = (login) => {
    // Regex para validar o formato do e-mail
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(login)
  }

  function handleLoginChange(event) {
    const newEmail = event.target.value
    // setLogin(event.target.value)
    setLogin(newEmail)
    setIsValid(validaEmail(newEmail))
  }

  function handleSenhaChange(event) {
    setSenha(event.target.value)
  }

  function handleNomeChange(event) {
    setNome(event.target.value)
  }

  function handleTelefoneChange(event) {
    setTelefone(event.target.value)
  }

  function handleEnderecoChange(event) {
    setEndereco(event.target.value)
  }

  function handleCpfChange(event) {
    setCpf(event.target.value)
  }

  function handleNomeCartaoChange(event) {
    setNomeCartao(event.target.value)
  }

  function handleNumeroCartaoChange(event) {
    setNumeroCartao(event.target.value)
  }

  function handleCvcChange(event) {
    setCvcCartao(event.target.value)
  }

  function handleSubmit() {
    if (numeroCartao.length < 20 && cvcCartao.length < 3) {
      return alert('Número do cartão e CVC digitado incorretamente!')
    }
    if (numeroCartao.length < 20) {
      return alert('Número do cartão digitado incorretamente!')
    }

    if (cvcCartao.length < 3) {
      return alert('CVC do cartão digitado incorretamente!')
    }

    return alert('Cadastro efetuado com sucesso!')
  }

  return (
    <div className="form-custom">
      <div className="container text-center">
        <div class="custom-title p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Meu perfil</h1>
          <div class="row">
            <div class="col-sm">
              <div className="cardCad">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <br></br>
                    <h4> Dados Pessoais</h4>
                    <label>
                      Nome:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira o nome"
                        value={nome}
                        onChange={handleNomeChange}
                      />
                    </label>
                  </div>
                  <br />
                  <div class="form-group">
                    <label>
                      Telefone:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira o telefone"
                        value={telefone}
                        onChange={handleTelefoneChange}
                      />
                    </label>
                  </div>
                  <br />
                  <div class="form-group">
                    <label>
                      Endereço:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira o Endereço"
                        value={endereco}
                        onChange={handleEnderecoChange}
                      />
                    </label>
                  </div>
                  <br></br>
                  <div class="form-group">
                    <label>
                      CPF:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira o CPF"
                        value={cpf}
                        onChange={handleCpfChange}
                      />
                    </label>
                  </div>
                </form>
                <br></br>
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
                    <h4> Dados do Cartão</h4>
                    <label>
                      Nome do Cartão:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira o nome do cartão"
                        value={nomeCartao}
                        onChange={handleNomeCartaoChange}
                      />
                    </label>
                  </div>
                  <br />
                  <div class="form-group">
                    <label>
                      Número do Cartão:
                      <input
                        type="text"
                        data-ls-module="charCounter"
                        maxlength="20"
                        className="form-control"
                        placeholder="Insira o número do cartão"
                        value={numeroCartao}
                        onChange={handleNumeroCartaoChange}
                      />
                    </label>
                  </div>
                  <br />
                  <div class="form-group">
                    <label>
                      CVC:
                      <input
                        type="text"
                        data-ls-module="charCounter"
                        maxlength="3"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira o CVC"
                        value={cvcCartao}
                        onChange={handleCvcChange}
                      />
                    </label>
                  </div>
                  <br></br>
                  <div class="form-group">
                    <label className="labelAcess">
                      Email:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira E-mail para login!"
                        value={login}
                        onChange={handleLoginChange}
                      />
                      {isValid ? (
                        <p className='valida-email'>E-mail é válido.</p>
                      ) : (
                        <p className='n-valida-email'>E-mail inválido.</p>
                      )}
                    </label>
                    </div>
                    <div class="form-group">
                    <label>
                      Senha:
                      <input
                        type="password"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira senha para acesso!"
                        value={senha}
                        onChange={handleSenhaChange}
                      />
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
            Atualizar
          </button>
        </div>
      </div>
    </div>
  )
}
