import React,{Component} from 'react';
import {post} from 'axios';
//axios 모듈의 post 컴포넌트를 가져옴


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

//dialog 모달창을 적용하기 위한 라이브러리들

const styles = theme => ({

    hidden:{
        display:'none'

    }
});
//모달 라이브러리에 스타일을 적용해주기 위함


class CustomerAdd extends Component {


constructor (props){

super(props)

this.state = {

file:null, //파일 데이터
userName:'',
birthday:'',
gender:'',
job:'',
fileName:'', //파일의 이름
open:false //현재 모달이 떠있는 상황인지 체크하는 state 프로퍼티

}}

handleFileChange = (e) =>{

    this.setState(

        {
            file:e.target.files[0], //e.target은 현재 선택된 파일임
            //files는 현재 선택 파일 중 하나
            fileName: e.target.value //현재 선택 파일의 이름
        }
    )

}

handleValueChange = (e)=>{

    let nextState = {};
    nextState[e.target.name] = e.target.value;
    //사용자가 현재 입력하고 있는 값 (value)을 현재 태그의 name 속성이 갖고 있는 프로퍼티 (birthday, gender ...)에 할당해 nextState 객체에 저장
    //그리고 해당 객체를 넘기면 해당되는 프로퍼티가 setState됨 
    this.setState(nextState);

}
handleFormSubmit = (e) => {

e.preventDefault() //해당함수의 기본기능 막기

this.addCustomer() //addCustomer는 비동기이다.
.then((response)=>{ 

    this.props.stateRefresh();
    //프롭스로 전달 받은 갱신 메서드 실행
    //addCustomer는 비동기이기 때문에 then에 갱신 메서드를 적는다.
    //addCustomer의 실행을 보장받기 위해서
    
})
//고객 정보 추가후 다시 정보기입란을 초기화한다.
this.setState({file:null, 
                userName:'',
                birthday:'',
                gender:'',
                job:'',
                fileName:'',
            open:false})

           

                // window.location.reload(); //그냥 페이지 새로고침
                //(원래는 컴포넌트만 갱신해주는 게 좋음)
                //리액트는 spa(single page application)이다.
                //웹페이지 전체를 새로고침 해주는 것은 비효율적이다.
                //고객정보 컴포넌트만을 새로고침 해주는 게 바람직하다.
                //이때 부모컴포넌트 (app.js)?의 props를 이용해 해당 컴포넌트를 갱신해주면 된다.

} 
addCustomer = () =>{ //입력한 정보를 바탕으로 고객 정보를 추가해주는 메서드

const url = '/api/customers'; //추가할 곳
const formData = new FormData();//form data 객체 생성
formData.append('image',this.state.file);
formData.append('name',this.state.userName);
formData.append('birthday',this.state.birthday);
formData.append('gender',this.state.gender);
formData.append('job',this.state.job);
//각각 입력된 요소를 전달

const config = {
headers:{

    'content-type': 'multipart/form-data'
}//웹 표준에 맞는 header 설정(전달하는 데이터에 file이 있을 경우 설정)

}
return post(url, formData, config)
//axios라이브러리의 post 메서드를 이용해 원하는 url에 formdata를 전송함

}

handleClickOpen = () =>{ //modal open 버튼을 눌렀을 때

    this.setState({


            open:true, //열림 상태로 바꿈
      
    });
}

handleClose = ()=>{

    this.setState({file:null, 
        userName:'',
        birthday:'',
        gender:'',
        job:'',
        fileName:'',
    open:false})
    //닫힘 상태로 바꾸고 모든 입력정보 초기화

}


render(){
    const {classes} = this.props; //이건 뭐지? app.js로부터 받는 props는 setRefresh뿐인데?
    
    return(


        <div>
            <Button variant='contained' color='primary' onClick={this.handleClickOpen}>
            고객추가하기
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}> 
                {/* open이 true일 때만 보임, 닫기 버튼 누르면 handleClose 실행 */}
                <DialogTitle>고객추가</DialogTitle>

                <DialogContent>

                <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
{/* 클래스 설정, 이미지 파일만 받게함 */}
            <label htmlFor='raised-button-file'>

                <Button variant='contained' color='primary' component='span' name='file'>
                    {this.state.fileName === "" ? '프로필 이미지 선택' : this.state.fileName}
                    {/* 현재 fileName이 선택되지 않았으면 전자 됐으면 후자를 출력 */}
                </Button>
            </label>
            <br/>
                <TextField label='이름' type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange} /><br/>
                <TextField label='생년월일' type='text' name='birthday' value={this.state.birthday} onChange={this.handleValueChange} /><br/>
                <TextField label='성별' type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange} /><br/>
               <TextField label='직업' type='text' name='job' value={this.state.job} onChange={this.handleValueChange} /><br/>

                </DialogContent>
                <DialogActions>

                    <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>


        </div>




        // <form onSubmit={this.handleFormSubmit}>
        //         <h1>고객추가</h1>

        //         프로필 이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName}
        //         //파일 입력 태그, file이라는 변수에 데이터와 파일명 전달
        //         //온서브밋과 온체인지는 form에서 국룰인듯
        //         onChange={this.handleFileChange}/> 
                
        //         이름:<input type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange} /><br/>
        //         생년월일:<input type='text' name='birthday' value={this.state.birthday} onChange={this.handleValueChange} /><br/>
        //         성별:<input type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange} /><br/>
        //         직업:<input type='text' name='job' value={this.state.job} onChange={this.handleValueChange} /><br/>
        //         <button type="submit">추가하기</button>
        //         {/* 위버튼을 누르면 handleFormSubmit 함수가 호출됨 */}

        // </form>

    );

}

}




export default withStyles(styles)(CustomerAdd);
            //props를 classes 전달하여 사용했는데 이게 그 출처인가? 
