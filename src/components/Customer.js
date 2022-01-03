import React from 'react';
//리액트를 사용하기 위해 라이브러리를 불러옴

class Customer extends React.Component{

render(){
//render메서드는 return값에 내부 컴포넌트를 가져야함
    return (<div>
        <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name}/>
        <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
    </div>)

    //react의 요소는 jsx문법을 따르는데, 반드시 요소를 div태그로 감싸야 한다는 문법이 있음
    //
        //커스터머 컴포넌트를 두개의 컴포넌트로 구성했음
        //이러한 계층적 구성은, view를 관리하기 용이하게 함

}
//생각해보니 바벨 문법을 자동으로 쓸 수 있다. 
//render는 컴포넌트에서 항상 실행되는 함수임.
//컴포넌트를 그리겠다는 선언을 가짐

}

class CustomerProfile extends React.Component{
//고객에 대한 정보가 무수히 많을 수 있다.
//고객의 정보중, 고객의 프로필을 구성하는 정보를 구성하는 클래스이다.

render(){

    return(

        <div>
        <img src={this.props.image} alt='profile'/>
        <h2>{this.props.name}({this.props.id})</h2>
        </div>
    );

}


}
class CustomerInfo extends React.Component{
//사용자의 남은 데이터 출력
render(){

    return(

        <div>
<p>{this.props.birthday}</p>
<p>{this.props.gender}</p>
<p>{this.props.job}</p>

        </div>
    );

}


}
export default Customer;
//커스터머 컴포넌트를 내보냄