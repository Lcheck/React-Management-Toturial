import React from 'react';
//리액트를 사용하기 위해 라이브러리를 불러옴

class Customer extends React.Component{

render(){
//render메서드는 return값에 내부 컴포넌트를 가져야함
    return (<div>

        <h2>{this.props.name}</h2>
        <p>{this.props.birthday}</p>
        <p>{this.props.gender}</p>
        <p>{this.props.job}</p>
        {/* props로 프로퍼티 전달 */}
    </div>)


}
//render는 컴포넌트에서 항상 실행되는 함수임.
//컴포넌트를 그리겠다는 선언을 가짐

}


export default Customer;
//커스터머 컴포넌트를 내보냄