import React from 'react';


class CustomerDeleted extends React.Component{

deleteCustomer(id){

    const url = '/api/customers/' +id; //rest.api에서 삭제시 고객 데이터에 접근하는 방식임

    fetch(url,{method:'DELETE'}); //삭제를 위한 사용법?

    this.props.stateRefresh(); //삭제했으니 해당 컴포넌트 갱신
}

render(){

    return(

        <button onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</button>
        //부모 컴포넌트에서 대응되는 열의 id를 프롭스로 전달할 예정임
    );
}





}

export default CustomerDeleted;