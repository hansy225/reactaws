import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import pList from './data/ProductList';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';

/*
  * react-router-dom
    : 페이지를 교체시켜주는 api -> router-dom

  * 사용하려면
    1. 설치 : npm install react-router-dom
    2. index.js에 <BrowserRouter> 태그 넣어주기    
*/

function App() {
  const [product, setProduct] = useState(pList);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="home">Yves Saint Laurent</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">HOME</Nav.Link>
            <Nav.Link href="features">CART</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/home">HOME</Link>
      <Link to="/detail">상세페이지</Link>
      <Link to="/cart">장바구니</Link>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' />
            <Container>
              <Row>
                <PListCol product={product} />
              </Row>
            </Container>
          </>
        } /> 
        <Route path='/detail' element={<Detail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>    
  );
}

function PListCol({ product }) {
  return (
    <>
      {product.map((item, i) => (
        <Col key={i}>
          <img src={`${process.env.PUBLIC_URL}/img/img${i + 1}.png`} width="75%" />
          <h4>{item.title}</h4>
          <p>{item.price}</p>
        </Col>
      ))}
    </>
  );
}

export default App;
