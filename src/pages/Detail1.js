import { useState, useEffect } from 'react';
import {  Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detail(props) {
    let {pindex} = useParams();
    console.log(pindex);

    let id = props.product[pindex].id;
    console.log('id : ', id);

    let findId = props.product.find(function(v) {
        return v.id == id;
    })

    let[alert, setAlert] = useState(true);

    useEffect(() => {
        console.log("timer 실행");
        let timer = setTimeout(() => {setAlert(false)}, 3000)
        return () => {
            clearTimeout(timer);
        }
    }, [])
    

    let [num, setNum] = useState('');
    useEffect(() => {
        if(isNaN(num) == true) {
            alert('숫자만 입력하세요.');
        }
    }, [num])

    return (
        <div className='detail'>
            {/* <input onChange={(e) => {setNum(e.target.value)}} /> */}
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
                <Button variant="outline-secondary">주문하기</Button>
            </div>
        </div>
    )
}

export default Detail;