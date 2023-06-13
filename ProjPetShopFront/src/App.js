import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import RoutesConfig from './RouteConfig';
import Footer from './components/Footer';


export default function App() {
    return (
        <Router>
            <Header />
            <RoutesConfig />
            <Footer />
        </Router>
    )
}
