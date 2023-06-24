import "./Header.css";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// Componente para renderizar o botão de cadastro na barra de navegação
function PagCad() {
    const location = useLocation();
    // Verifica se o caminho atual é "/register"
    // Se for, renderiza um botão vazio
    if (location.pathname === "/register") {
        return <button type="button" className="btn btn-primary" id="btHollow">...</button>
    }
     // Caso contrário, renderiza o botão "Cadastro"
    return <button type="button" className="btn btn-primary" id='bt-cd'>Cadastro</button>
}
// Componente para o cabeçalho da página
export default function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                </a>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-decoration none">
                    <li> <a className="nav-link px-2 link-dark"> <Link to='/' ><div><img src={'/assets/images/logo.png'} className="nav-bar-image" width="100" height="100" alt="" /> </div></Link></a></li>
                    <li><a className="nav-link px-2 link-dark"><Link to='/' id='link'><div class="nav-bar-edit">Home</div></Link></a></li>

                    <li><a className="nav-link px-2 link-dark"><Link to='/about/gustavo' id='link'><div class="nav-bar-edit">Sobre</div></Link> </a></li>
                </ul>
                <div className="col-md-4 text-end">
                    <div>
                        <button type="button" className="btn btn-outline-primary me-2" id='bg-bt'><Link to='/carrinho' id='link'><div id='bt-login'>Carrinho</div></Link></button>
                        <button type="button" className="btn btn-outline-primary me-2" id='bg-bt'><Link to='/login' id='link'><div id='bt-login'>Login</div></Link></button>
                        <button type="button" className="btn btn-outline-primary me-2" id='bt-mp'><Link to='/perfil' id='link'><div id='bt-perfil'>Meu Perfil</div></Link></button>
                        <Link to='/register'><PagCad /></Link>

                    </div>

                </div>
            </header>
        </div>
    )
};
