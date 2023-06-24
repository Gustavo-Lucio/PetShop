import React, { useState, useEffect } from 'react'
import './perfil.css'
import api from '../services/api'

export default function Perfil() {
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
  const [imagemPreview, setImagemPreview] = useState(null)

  const clienteId = localStorage.getItem("clienteId")

  useEffect(() => {
    // Faça uma chamada à API para obter os dados do perfil atual
    api.get(`/clientes/${clienteId}`)
      .then(response => {
        const { nome, telefone, endereco, nomeCartao, numeroCartao, cvcCartao, cpf, senha, email, imagem } = response.data;
        setNome(nome);
        setTelefone(telefone);
        setEndereco(endereco);
        setNomeCartao(nomeCartao);
        setNumeroCartao(numeroCartao);
        setCvcCartao(cvcCartao);
        setCpf(cpf);
        setSenha(senha);
        setEmail(email);
        setImagem(imagem)
      })
      .catch(error => {
        console.error(error);
        // Lógica de tratamento de erro
      });
  }, []);

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    setImagemPreview(URL.createObjectURL(file));
    setImagem(file);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('endereco', endereco);
    formData.append('telefone', telefone);
    formData.append('cpf', cpf);
    formData.append('nomeCartao', nomeCartao);
    formData.append('numeroCartao', numeroCartao);
    formData.append('cvcCartao', cvcCartao);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('imagem', imagem);

    if (numeroCartao.length < 20 && cvcCartao.length < 3) {
      return alert('Número do cartão e CVC digitado incorretamente!');
    }
    if (numeroCartao.length < 20) {
      return alert('Número do cartão digitado incorretamente!');
    }

    if (cvcCartao.length < 3) {
      return alert('CVC do cartão digitado incorretamente!');
    }


    fetch
      (`http://localhost:3001/clientes/${clienteId}`, {
        method: 'PUT',
        body: formData
      })
    // api.put('/clientes/1', formData)
      .then(response => {
        console.log(response.data);
        alert('O usuário foi alterado com sucesso!');
        // Limpar os campos após a alteração
        setNome('');
        setTelefone('');
        setEndereco('');
        setNomeCartao('');
        setNumeroCartao('');
        setCvcCartao('');
        setCpf('');
        setEmail('');
        setSenha('');
        setImagem(null);
        setImagemPreview(null);
      })
      .catch(error => {
        console.error(error);
        alert('Ocorreu um erro! Veja no console ..');
      });
  }

  const validaEmail = (email) => {
    // Regex para validar o formato do e-mail
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  function handleLoginChange(event) {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValid(validaEmail(newEmail));
  }

  return (
    <div className="form-custom">
      <div className="container text-center">
        <div class="custom-title p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Meu Perfil</h1>
          <form onSubmit={handleSubmit}>
            <div class="row">
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
                  <div class="col-sm-12" id="inputTeste">
                    <input
                      class="form-control"
                      type="file"
                      onChange={handleImagemChange}
                      id="inputGroupFile01"
                    ></input>
                    <br></br>

                    <div id='center'>
                      {imagemPreview && (
                        <img src={imagemPreview} alt="Preview" className='previa_imagem' />
                      )}
                    </div>

                  </div>
                </div>
              </div>
              <br></br>
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

            </div>
          </form>
          <br />
          <br></br>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Alterar perfil
          </button>
        </div>
      </div>

    </div>
  )
}
