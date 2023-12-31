import React, { useState } from 'react'
import './cadaster.css'
import api from '../services/api'

export default function Cadastro() {
  // Define variáveis de estado usando useState()
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [nomeCartao, setNomeCartao] = useState('')
  const [numeroCartao, setNumeroCartao] = useState('')
  const [cvcCartao, setCvcCartao] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [imagem, setImagem] = useState(null)
  const [previewURL, setPreviewURL] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Cria um objeto com os dados do formulário
    const bodyParam = {
      nome: nome,
      endereco: endereco,
      telefone: telefone,
      cpf: cpf,
      nomeCartao: nomeCartao,
      numeroCartao: numeroCartao,
      cvcCartao: cvcCartao,
      email: email,
      senha: senha,
      imagem: imagem,
    }
    // Valida o tamanho do número do cartão e do CVC
    if (numeroCartao.length < 20 && cvcCartao.length < 3) {
      return alert('Número do cartão e CVC digitado incorretamente!')
    }
    // Valida o tamanho do número do cartão
    if (numeroCartao.length < 20) {
      return alert('Número do cartão digitado incorretamente!')
    }
    // Valida o tamanho do CVC
    if (cvcCartao.length < 3) {
      return alert('CVC do cartão digitado incorretamente!')
    }
    // Faz uma requisição POST para o endpoint da API
    api
      .post('/clientes', bodyParam)
      .then((response) => {
        console.log(response.data)
        alert(' O usuario ' + response.data.codigo + ' foi criado com sucesso!')
      })
      .catch((err) => {
        console.error(err)
        alert(' Ocorreu um erro! Veja no console ..')
      })
      .finally(() => {
        // Reseta os campos do formulário após o envio
        setNome('')
        setTelefone('')
        setEndereco('')
        setNomeCartao('')
        setNumeroCartao('')
        setCvcCartao('')
        setCpf('')
        setEmail('')
        setSenha('')
        setImagem('')
      })

    alert('Cadastro efetuado com sucesso!')
  }

  const validaEmail = (email) => {
    // Regex para validar o formato do e-mail
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  function handleLoginChange(event) {
    const newEmail = event.target.value
    // setLogin(event.target.value)
    setEmail(newEmail)
    setIsValid(validaEmail(newEmail))
  }

  return (
    <div className="form-custom">
      <div className="container text-center">
        <div class="custom-title p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Cadastro de Usuário</h1>
          <div class="row">
            <form onSubmit={handleSubmit}>
            <div class="col-sm-6">
              <div className="cardCad">
                  <div class="form-group">
                    <br></br>
                    <h4> Dados Pessoais</h4>
                    <label>
                      Nome:
                      <input
                        type="text"
                        className="form-control"
                        
                        placeholder="Insira o nome"
                        value={nome}
                        onChange={(e) => { setNome(e.target.value) }}
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
                        onChange={(e) => { setCpf(e.target.value) }}
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
                        onChange={(e) => { setTelefone(e.target.value) }}
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
                        onChange={(e) => { setEndereco(e.target.value) }}
                      />
                    </label>
                  </div>
                  <br></br>
                  <div class="input-group mb-6" id="inputTeste">
                    <input
                      class="form-control"
                      type="file"
                      onChange={(e) => { setImagem(e.target.files[0]) }}
                      id="inputGroupFile01"
                    ></input>
                    <div class="col-sm">
                      {imagem && <p>Arquivo selecionado: {imagem.nome}</p>}
                      {previewURL && <img src={previewURL} alt="Preview" />}
                    </div>
                  </div>
              </div>
            </div>

            {/* Dados cartão */}
            <div class="col-sm-6">
              <div className="cardCad">
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
                        onChange={(e) => { setNomeCartao(e.target.value) }}
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
                        onChange={(e) => { setNumeroCartao(e.target.value) }}
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
                        onChange={(e) => { setCvcCartao(e.target.value) }}
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
                        value={email}
                        onChange={handleLoginChange}
                      />
                      {isValid ? (
                        <p className="valida-email">E-mail é válido.</p>
                      ) : (
                        <p className="n-valida-email">E-mail inválido.</p>
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
                        onChange={(e) => { setSenha(e.target.value) }}
                      />
                    </label>
                  </div>
                  <br></br>
                
                <br></br>
              </div>
            </div>
            </form>
          </div>
          <br />
          <br></br>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </div>
      </div>
      
    </div>
  )
}
