import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';
import Details from './pages/details';
import Error from './pages/error.js';
import Cadaster from './pages/cadaster';
import Perfil from './pages/perfil';
import Login from './pages/login';
import Carrinho from './pages/carrinho';

export default function RoutesConfig() {
    return (
        <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about/:name' element={<About />} />
                <Route path='/details/:id' element={<Details />} />
                <Route path='/cadaster' element={<Cadaster />} />
                <Route path='/perfil' element={<Perfil />} />
                <Route path='/login' element={<Login />} />
                <Route path='/carrinho' element={<Carrinho/>} />
                <Route path='*' element={<Error />} />
            </Routes >  
    )};