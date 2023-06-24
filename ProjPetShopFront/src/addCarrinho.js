import React, { useState } from 'react'

const AddCarrinho = () => {
    // Cria um estado para o carrinho de compras
  
    const [cartItems, setCartItems] = useState([]);
    // Função para adicionar um item ao carrinho
    const addToCart = (item) => {
     // Atualiza o estado do carrinho, adicionando o novo item ao array existente
      setCartItems(prevItems => [...prevItems, item]);
    };
  
    // ...
  
    return (
      <div>
        <h2>Carrinho de Compras</h2>
        {/* ... */}
        <h3>Itens no Carrinho:</h3>
        {cartItems.map(item => (
          <div key={item.id}>
            <h4>{item.nome}</h4>
            <p>{item.descricao}</p>
          </div>
        ))}
      </div>
    );
  };

  export default AddCarrinho;
  
