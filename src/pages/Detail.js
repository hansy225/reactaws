import { useEffect, useState } from 'react';
import {Button, Nav, Table} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { addItem } from '../store/store';
import { useDispatch } from 'react-redux';

function Detail(props) {

    let dispatch = useDispatch()
    const nav = useNavigate()

    let {pindex} = useParams();
    let findId = props.product.find((v) => v.id === Number(pindex));

    let[alert, setAlert] = useState(true);
    let [tab, setTab] = useState(0);

    useEffect(() => {
        let p = localStorage.getItem('recentProduct')
        p = JSON.parse(p)

        if(!p.includes(findId.id)){
        p.push(findId.id)
        localStorage.setItem('recentProduct', JSON.stringify(p))
        }
    },[])

    useEffect(() => {
        let timer = setTimeout(() => {setAlert(false)}, 3000)
        return () => {
            clearTimeout(timer);
        }
    }, [])
    
    let [detailFade, setDetailFade] = useState('start');

    useEffect(() => {
        setDetailFade('end')
    },[])

    return (
        <div className={detailFade}>
            {
                alert ? <div>3초 이내에 클릭 시 30% 할인</div> : null
            }
            <div className='detail_img'>
                <img src={`${process.env.PUBLIC_URL}/img/img${findId.id}.png`} width="25%" />
            </div>
            <div className='detail_text'>
                <h3>{findId.title}</h3>
                <p>{findId.content}</p> 
                <p>{findId.price}원</p>
                <Button variant="outline-info" onClick={() => {
                        dispatch(addItem({id:findId.id, name:findId.title,  count:1}))
                        nav('/cart')
                    }}    
                    >주문하기</Button>
            </div>

            <Nav variant="tabs" defaultActiveKey="link-0" className='deNav'>
                <Nav.Item>
                    <Nav.Link onClick={() => {setTab(0)}} eventKey="link-0">뷰티에 대하여</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {setTab(1)}} eventKey="link-1">정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {setTab(2)}} eventKey="link-2">기타</Nav.Link>
                </Nav.Item>
            </Nav>

            < TabContent tab = {tab} />
            <RecentViewed product={props.product} />
        </div>
    )
}

function RecentViewed ({product}) {
    const [recent, setRecent] = useState([]);

    useEffect (() => {
        let viewed = JSON.parse(localStorage.getItem('recentProduct')) || []

        let products = viewed
            .map(id => product.find(c => c.id == id))
            .filter(item => item !== undefined);
        setRecent(products)
    },[product])

    return (
        <div>
            <h4>최근 본 상품👀</h4>
            <Table striped bordered hover className="recent-table">
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>제품 설명</th>
                        <th>가격</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        recent.map((item) => 
                            <tr>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.price}원</td>
                            </tr>
                        )
                    }
                    </tbody>
            </Table>
        </div>
    )
}

function TabContent ({tab}) {
    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(() => { setFade('end')}, 100);
        return () => {
            setFade('start ');
        }
    },[tab])

    return (
        <div className={`tab-box ${fade}`}>
            {[<div>화장품으로 얼굴을 꾸미는 행동을 말한다.</div>, <div>피부 건강이나 청결, 화장 등의 외모 관리를 위해 얼굴이나 머리카락 등의 신체에 쓰는 용품</div>, <div>내용들</div>][tab]}
        </div>
    )
}

export default Detail;