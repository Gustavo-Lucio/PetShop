import React, { useState } from 'react'

const AddCarrinho = () => {
    // ...
  
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (item) => {
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
  