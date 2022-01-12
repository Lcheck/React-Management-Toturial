import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//리액트를 사용하기 위해 라이브러리를 불러옴

class Customer extends React.Component{

render(){
//render메서드는 return값에 내부 컴포넌트를 가져야함
    return (
        //부모 (app.js)로부터 props를 전달받음.
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
    )

    //react의 요소는 jsx문법을 따르는데, 반드시 요소를 div태그로 감싸야 한다는 문법이 있음
    //
        //커스터머 컴포넌트를 두개의 컴포넌트로 구성했음
        //이러한 계층적 구성은, view를 관리하기 용이하게 함

}
//생각해보니 바벨 문법을 자동으로 쓸 수 있다. 
//render는 컴포넌트에서 항상 실행되는 함수임.
//컴포넌트를 그리겠다는 선언을 가짐

}


export default Customer;
//커스터머 컴포넌트를 내보냄