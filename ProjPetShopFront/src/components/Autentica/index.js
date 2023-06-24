import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './autentica.css'

export default function Autentica() {
  // Define os estados para o email e senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Obtém a função navigate para redirecionar após o login
  const navigate = useNavigate();
  // Manipulador para o envio do formulário de autenticação
  function handleSubmit(event) {
    event.preventDefault();
    // Cria um objeto com os parâmetros de email e senha
    const bodyParam = {
      email: email,
      senha: senha
    }

    api.post('/auth', bodyParam)
      .then(async (response) => {
        console.log(response.data)
        alert(" Token gerado para o usuario " + response.data.nome)
        localStorage.setItem("token", response.data.token);

        await api.get('/clientes')
          .then((clientesResponse) => {
            const clientes = clientesResponse.data;

            // Procurar o email correspondente
            const cliente = clientes.find((cliente) => cliente.email === email);

            if (cliente) {
              // Armazenar o ID do cliente no localStorage
              localStorage.setItem("clienteId", cliente.id);
            } else {
              alert("O e-mail não foi encontrado na rota /clientes");
            }

            navigate("/");
          })
          .catch((err) => {
            console.error(err);
            alert("Ocorreu um erro ao obter a lista de clientes");
            navigate("/");
          });

        navigate("/");
      })
      .catch((err) => {
        console.error(err.response.data) // Objeto de erro vindo do axios
        alert(" Ocorreu um erro! " + err.response.data.error)
      })
      .finally(() => {
        setEmail("")
        setSenha("")
      })
  }

  return (
    <div className="form-custom">
      <div className="container text-center">
        <form onSubmit={handleSubmit}>
          <div class="custom-title p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Acesso</h1>
            <div class="row">
              <div class="col-sm"></div>
              <div class="col-sm">
                <div className="cardCad">
                  <div class="form-group">
                    <br></br>
                    <h4> Login</h4>
                    <label>
                      E-mail:
                      <input
                        type="text"
                        className="form-control"

                        placeholder="Insira o e-mail"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                      />
                    </label>
                  </div>
                  <div class="form-group">
                    <label>
                      Senha:
                      <input
                        type="password"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira a senha"
                        value={senha}
                        onChange={(e) => { setSenha(e.target.value) }}
                      />
                    </label>
                  </div>
                  <br></br>
                </div>
              </div>
              <div class="col-sm"></div>
            </div>
            <br />
            <div>
              <button
                type="button"
                className="btn btn-secondary"
                id="text-button"
              >
                <Link to="/cadaster" id="link">
                  Ainda não se cadastrou?
                </Link>
              </button>
            </div>
            <br></br>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
