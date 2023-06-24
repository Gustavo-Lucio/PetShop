import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './login.css'

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')


  function handleLoginChange(event) {
    setLogin(event.target.value)
  }

  function handleSenhaChange(event) {
    setSenha(event.target.value)
  }

  function handleSubmit() {
  // Lógica para lidar com o envio do formulário de login
  }
  return (
    <div className="form-custom">
      <div className="container text-center">
        <div class="custom-title p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Login Cliente</h1>
          <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm">
              <div className="cardCad">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <br></br>
                    <h4> Login</h4>
                    <label>
                      E-mail:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira o e-mail"
                        value={login}
                        onChange={handleLoginChange}
                      />
                    </label>
                  </div>

                  <div class="form-group">
                    <label>
                      Senha:
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Insira a senha"
                        value={senha}
                        onChange={handleSenhaChange}
                      />
                    </label>

                  </div>
                </form>
                <br></br>
              </div>
            </div>
            <div class="col-sm"></div>
          </div>
          <br />

          <div><button type="button" className="btn btn-secondary" id='text-button' ><Link to='/cadaster' id='link'>Ainda não se cadastrou?</Link></button></div>
          <br></br>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
