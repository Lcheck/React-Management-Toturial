import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
//만들어둔 커스터머 컴포넌트를 불러옴

const customers = [{

'id' : 1,
'image' : 'https://placeimg.com/64/64/any',
'name':'홍동',
'birthday':'991223',
'gender':'남자',
'job':'군인'

},
{

  'id' : 2,
  'image' : 'https://placeimg.com/64/64/any',
  'name':'은호',
  'birthday':'891023',
  'gender':'남자',
  'job':'학생'
  
  },
  {

    'id' : 3,
    'image' : 'https://placeimg.com/64/64/any',
    'name':'채림',
    'birthday':'790223',
    'gender':'여자',
    'job':'BJ'
    
    }]


class App extends Component {
  render(){
  return (
    <div>
   { customers.map(c => {

      return(

      <Customer
      key={c.id}
      //react에서 map을 쓸 때에는 key 프로퍼티를 생성해주어야함
      id={c.id}
      image = {c.image}
      name = {c.name}
      birthday = {c.birthday}
      gender = {c.gender}
      job = {c.job}
      
      />  


      );
    }) }
    </div>
  );
  //고객의 정보를 객체배열에 담고, map으로 일괄처리
  }
}
//리액트는 html문서를 효과적으로 보여주기 위한 도구임.
//그 역할을 하는 것이 컴포넌트
//컴포넌트 하나를 상속하여 만듬.
//컴포넌트 안에는 다른 컴포넌트가 올 수 있음
export default App;

