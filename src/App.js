import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
//만들어둔 커스터머 컴포넌트를 불러옴

const customer = {

'name':'홍동',
'birthday':'991223',
'gender':'남자',
'job':'군인'

}
class App extends Component {
  render(){
  return (
    <Customer
    //props라는 객체로 컴포넌트의 내용을 전달할 수 있다.
    name = {customer.name}
    birthday = {customer.birthday}
    gender = {customer.gender}
    job = {customer.job}
    
    /> //커스터머 컴포넌트를 그리겠다.
  );
  }
}
//리액트는 html문서를 효과적으로 보여주기 위한 도구임.
//그 역할을 하는 것이 컴포넌트
//컴포넌트 하나를 상속하여 만듬.
//컴포넌트 안에는 다른 컴포넌트가 올 수 있음
export default App;

