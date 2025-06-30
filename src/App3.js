import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import pList from './data/ProductList';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
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

  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Yves Saint Laurent</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>HOME</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>DETAIL</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>CART</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>ABOUT</Nav.Link>

            {/* <Nav.Link onClick={() => {navigate(1)}}>CART</Nav.Link>  1페이지 앞으로
            <Nav.Link onClick={() => {navigate(-1)}}>CART</Nav.Link> 1페이지 뒤로 */}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' />
            <Container>
              <Row>
                {
                  product.map((v, i) => {
                    return <PListCol product={v} key={i} />
                  })
                }
              </Row>
            </Container>
          </>
        } /> 
        <Route path='/detail/:pindex' element={<Detail product={product} />} />

        {/* 
        - member는 문자
        <Route path='/detail/member/:pid' element={<Detail clothes={clothes}/>} />
                  
        - 데이터를 여러개 보낼 때  /detail/1/홍길동 
        <Route path='/detail/:pid/:name' element={<Detail clothes={clothes}/>} />    
        */}           

        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<div>더조은 컴퓨터 아카데미</div>} />

        <Route path='*' element={<div>존재하지 않는 페이지입니다.</div>} />
      </Routes>

      <div className='footer'>
          <p>사업자명: 엘오케이(유) 대표: 사무엘 티보 부티에 뒤 리테일 <br />
          사업자 등록번호: 220-81-73483 <br />
          주소: 서울특별시 강남구 영동대로 517 아셈타워 31층 <br />
          통신판매업신고: 2012-서울강남-01663 <br />
          고객케어센터: 080-835-0089 <br />
          © 2023 Yves Saint Laurent Cosmetics. All rights reserved.</p>
      </div>
      
    </div>
  );
}

function PListCol(props) {
  return (
    <>
      <Col md={4}>
        <img src={`${process.env.PUBLIC_URL}/img/img${props.product.id}.png`} width="45%" />
        <h4>{props.product.title}</h4>
        <p>{props.product.price}원</p>
      </Col>
    </>
  );
}

export default App;
