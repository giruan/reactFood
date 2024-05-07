import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './page/Main';
import Login from './page/Login';
import Header from './component/Header';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<DefaultLayout><Main/></DefaultLayout>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      <Footer />
    </>
  );
}

export default App;
