import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import img1 from './img/img1.png';
// import { num1, num2 } from './data/ProductList';
import pList from './data/ProductList';

const prodList = [
  {
    id : 1,
    title : '리브르 로 뉘',
    content : '시트러스 플로럴 향수',
    price : 170000
  },
  {
    id : 2,
    title : '뚜쉬 에끌라 글로우-팩트 쿠션',
    content : 'NEW 리미티드 에디션',
    price : 115000
  },
  {
    id : 3,
    title : '러브샤인 캔디 글레이즈',
    content : '캔디글레이즈 글로스밤',
    price : 55000
  }
]

function App() {
  const [product, setProduct] = useState(pList);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Yves Saint Laurent</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#features">CART</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' />
      {/* <p>{num1}</p>
      <p>{num2}</p> */}

      <Container>
        <Row className='prod'>
          <Col>
            {/* src 하위에 넣었을 때는 import하여 넣는다 */}
            <img src={img1} width='75%'/>
            <h4>{product[0].title}</h4>
            <p>{product[0].price}</p>
          </Col>
          <Col>
          {/* public/img 폴더에 그림이 있을 때 import 필요없음 */}
            <img src='img/img2.png' width='75%' />
            <h4>{product[1].title}</h4>
            <p>{product[1].price}</p>
          </Col>
          <Col>
            {/* public/img 폴더에 그림이 있고 배포할 때 url을 얻어와서 앞에 넣어준다 
              배포 시 tjoeun.com/abc/~ 하위 경로일 때는 그림을 못찾음 */} 
            {/* <img src={process.env.PUBLIC_URL + '/img/img3.png'} /> */}
            <img src={`${process.env.PUBLIC_URL}/img/img3.png`} width='75%' />
            <h4>{product[2].title}</h4>
            <p>{product[2].price}</p>
          </Col>
        </Row>
    </Container>

    {/* <p>{num1}</p>
    <p>{num2}</p> */}

    </div>    
  );
}

export default App;
