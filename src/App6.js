import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import pList from './data/ProductList';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';

function App() {

/*
  // [object Object]의 문자열로 들어감 쓸 수 없음
  let obj = {addr : '강남구'}
  localStorage.setItem('addr', obj);
  */

  // JSON으로 모두 문자열로 변환하여 넣는다
  let obj = {addr : '강남구'}
  let addr = JSON.stringify(obj)
  localStorage.setItem('addr', addr);

  let user = {
    name: 'kim',
    age : 25,
    hobbies : ['programing', 'gaming']
  }
  localStorage.setItem('user', JSON.stringify(user))

  // 가져올 때 json의 형태로 들어옴
  let getUser = localStorage.getItem('user');
  console.log(getUser)
  console.log(getUser.name)  // 사용못함

  // 가져올 때 json -> object 형태로 변환
  let storageUser = localStorage.getItem('user');
  let u = JSON.parse(storageUser) // object로 변경
  console.log(u.name)

  // 문. 최근에 본 상품 보여주기
  useEffect(() => {
    localStorage.setItem('recentProduct', JSON.stringify( [] ))
  },[])

  const [product, setProduct] = useState(pList);
  const [clickCount, setClickCount] = useState(2);

  let navigate = useNavigate();

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
                    return (
                    <PListCol product={v} key={i} />
                    )
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
