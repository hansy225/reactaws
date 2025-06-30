import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import pList from './data/ProductList';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';

/*  
  * SPA의 단점
    - 컴포넌트간의 STATE공유 어려움

  * 공유저장 공간 사용
    1. Context Api : 기본 탑재되어 있음
       잘 안쓰는 이유 : 성능 이슈(하나만 변해도 하위의 모든것들을 재랜더링)
                       재사용이 어렵다
    2. Redux : 외부 라이브러리
       주로 사용
*/

export let Context1 = createContext();

function App() {
  const [product, setProduct] = useState(pList);
  const [clickCount, setClickCount] = useState(2);

  let navigate = useNavigate();

  // 재고 변경 
  let [stock, setStock] = useState([5, 10, 7]);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Yves Saint Laurent</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>HOME</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>CART</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>ABOUT</Nav.Link>
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

            <Button calssname='btn' variant="outline-secondary" onClick={() => {
              axios.get(`https://raw.githubusercontent.com/hansy225/data/refs/heads/main/data${clickCount}.json`)
                   .then((result) => {
                    console.log(result);
                    console.log(result.data);
                    setProduct([...product, ...result.data]);
                    setClickCount(clickCount+1);
                   })
                   .catch(() => {
                    console.log('데이터 가져오기 실패');
                    alert('더이상 상품이 없습니다.');
                   })
            }}>서버에서 데이터 가져오기</Button> <br />

          </>
        } /> 
        <Route path='/detail/:pindex' element={<Detail product={product} />} />      

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

function PListCol({product}) {
  const Navigate = useNavigate();

  const goDetail = () => {
    Navigate(`/detail/${product.id}`);
  }
  return (
    <Col md={4} onClick={goDetail} className='list'>
      <img src={`${process.env.PUBLIC_URL}/img/img${product.id}.png`} width="45%" />
      <h4>{product.title}</h4>
      <p>{product.price}원</p>
    </Col>
  );
}

export default App;
