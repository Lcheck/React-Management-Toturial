import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import  Typography  from '@material-ui/core/Typography';
class CustomerDeleted extends React.Component{

constructor(props){

super(props);

this.state = {

open : false 

}

}


handleClickOpen = () =>{ //modal open 버튼을 눌렀을 때

    this.setState({

            open:true, //열림 상태로 바꿈
      
    });
}

handleClose = ()=>{

    this.setState({
    open:false})
    //닫힘 상태로 바꾸고 모든 입력정보 초기화

}

deleteCustomer(id){

    const url = '/api/customers/' +id; //rest.api에서 삭제시 고객 데이터에 접근하는 방식임

    fetch(url,{method:'DELETE'}); //삭제를 위한 사용법?

    this.props.stateRefresh(); //삭제했으니 해당 컴포넌트 갱신
}

render(){

    return(
        <div>
        <Button variant='contained' color='secondary' onClick={this.handleClickOpen}>삭제</Button>
        {/* // 부모 컴포넌트에서 대응되는 열의 id를 프롭스로 전달할 예정임 */}
        <Dialog open={this.state.open} onClose={this.handleClose}>
            {/* Dialog는 this.state.open이 true일때 open된다. */}

            <DialogTitle onClose={this.handleClose}>삭제</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>선택한 정보가 삭제됩니다.</Typography>
            </DialogContent>
            <DialogActions>

                <Button variant='contained' color='primary' onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</Button>
                <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}





}

export default CustomerDeleted;