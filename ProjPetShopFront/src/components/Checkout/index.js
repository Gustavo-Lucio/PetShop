import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'
import './Checkout.css' 

export default function Checkout() {
    // Define os itens do pedido
    const pedidoItems = {
        "total": 285.00,
        "items": [
            {
                "nome": "Item 1",
                "qtde": 2,
                "preco": 150
            },
            {
                "nome": "Item 2",
                "qtde": 1,
                "preco": 50
            },
            {
                "nome": "Item 3",
                "qtde": 1,
                "preco": 50
            },
            {
                "nome": "Item 4",
                "qtde": 1,
                "preco": 50
            },
            {
                "nome": "Item 5",
                "qtde": 1,
                "preco": 50
            }
            ,
            {
                "nome": "Item 5",
                "qtde": 1,
                "preco": 50
            }
            ,
            {
                "nome": "Item 5",
                "qtde": 1,
                "preco": 50
            }

        ]
    }
    // Obtém a função navigate para redirecionar após a finalização do pedido
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        // Obtém o token armazenado no localStorage
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                // Decodifica o token usando jwt-decode
                const data = jwt(storedToken)
                console.log(data)
                alert("Compra efetuada com sucesso para o cliente codigo: " + data.codigo + ".")
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('Usuario não autenticado! Por favor fazer o login!')
            navigate("/login");
        }
    }
    return (
        <div className="form-custom">
            <div className="container text-center">
                <div class="custom-title p-3 pb-md-4 mx-auto text-center">
                    <h1 class="display-4 fw-normal">Checkout</h1>
                    <div class="row">
                        <div class="col-sm-12">
                            <form onSubmit={handleSubmit}>
                            
                                <div className="row">
                                    
                                        {pedidoItems.items.map((item, i) => (
                                            <div className="col" key={i}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.nome} </h5>
                                                        <p>Quantidade: {item.qtde}</p>
                                                        <p>Preço: {item.preco}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                
                                <div className="row">
                                    <div className="col">
                                        <br />
                                        <p className="lead">Valor Total do Pedido: R$ {pedidoItems.total}</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Dados cartão */}
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">
                            <div className="cardDados">
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
                                            // value={nomeCartao}
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
                                            // value={numeroCartao}
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
                                            // value={cvcCartao}
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
                                            // value={login}
                                            ></input>
                                        </label>
                                    </div>
                                    <br></br>
                                </form>
                                <br></br>
                            </div>
                        </div>
                        <div class="col-sm-3"></div>
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
