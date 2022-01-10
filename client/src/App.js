import React, {Component} from 'react';
import './App.css';

import Paper from '@material-ui/core/Paper'
//컴포넌트를 감싸기 위한 태그

import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';


import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import CircularProgress  from '@material-ui/core/CircularProgress';
//meterial의 테이블 ui

import { withStyles } from '@material-ui/core/styles';
import createSpacing from '@material-ui/core/styles/createSpacing';
//리액트로 css지정하는 라이브러리

//만들어둔 커스터머 컴포넌트를 불러옴


const styles = { //이게 props로 전달되는 듯?
  root: {
  width: "100%",
  overflowX: "auto"
  
  },
  table: {
  minWidth: 1080
  },
  progress:{

    margin:100
  }
  };


//고객 데이터는 처음에 비어있다가, 요청이 들어올 경우 서버에서 가져온다.
//그래야 불필요한 데이터를 불러오지 않을 수 있다. (성능 업업)

class App extends Component {

  state = { //변경될 수 있는 정보들

      customers: "",
      completed:0 //로딩변수 
  }

  componentDidMount(){//컴포넌트가 로드되었을 때 실행되는 메서드
    this.timer = setInterval(this.progress, 20); //0.2초마다 progress 함수 실행
      this.callApi() 
      .then(res=>this.setState({customers:res})) //callApi가 실행되고나면
      .catch(err=>console.log(err));
  } //body를 res로 바꾸어 customers에 할당해 설정

  callApi = async () => { //비동기적으로 수행
    const response = await fetch('/api/customers');//고객정보 추출
    const body = await response.json(); //순차 수행
    return body; //서버의 customers 정보를 추출해 body로 반환
  }

  progress = () =>{
    const {completed} = this.state;
    this.setState({completed:completed >= 100 ? 0 : completed+1});
    //로딩바가 100넘으면 0으로 아니면 1씩 증가

  }
  render(){
    const {classes} = this.props;//props의 정체가 뭘까?
    console.log(classes);
  return (
  <div>
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
      <TableRow>

<TableCell>번호</TableCell>
<TableCell>이미지</TableCell>
<TableCell>이름</TableCell>
<TableCell>생년월일</TableCell>
<TableCell>성별</TableCell>
<TableCell>직업</TableCell>

      </TableRow>


        </TableHead>
    <TableBody>
   
  
    { 
    //테이블 태그가 로드되는 시점에는 customers의 정보가 아직
    //다 로드되지 않았으므로 
    // 조건연산자를 사용해 불려와졌을 때 출력토록 한다.
    this.state.customers ? this.state.customers.map(c => {return( <Customer
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
    }) : <TableRow>
      <TableCell colSpan='6' align='center'>


        <CircularProgress className={classes.progress} variant='indeterminate' value={this.state.complete}/>
      </TableCell>

    </TableRow> }
    </TableBody>
      </Table>
      </Paper>
      <CustomerAdd/>
      </div>
  );
  //고객의 정보를 객체배열에 담고, map으로 일괄처리
  }
}
//리액트는 html문서를 효과적으로 보여주기 위한 도구임.
//그 역할을 하는 것이 컴포넌트
//컴포넌트 하나를 상속하여 만듬.
//컴포넌트 안에는 다른 컴포넌트가 올 수 있음
export default withStyles(styles)(App);
