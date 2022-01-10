import React,{Component} from 'react';
import {post} from 'axios';
//axios 모듈의 post 컴포넌트를 가져옴

class CustomerAdd extends Component {


constructor (props){

super(props)

this.state = {

file:null, //파일 데이터
userName:'',
birthday:'',
gender:'',
job:'',
fileName:'' //파일의 이름

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

console.log(response.data)

})

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
render(){

    return(

        <form onSubmit={this.handleFormSubmit}>
                <h1>고객추가</h1>

                프로필 이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName}
                //파일 입력 태그, file이라는 변수에 데이터와 파일명 전달
                //온서브밋과 온체인지는 form에서 국룰인듯
                onChange={this.handleFileChange}/> 
                
                이름:<input type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange} /><br/>
                생년월일:<input type='text' name='birthday' value={this.state.birthday} onChange={this.handleValueChange} /><br/>
                성별:<input type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange} /><br/>
                직업:<input type='text' name='job' value={this.state.job} onChange={this.handleValueChange} /><br/>
                <button type="submit">추가하기</button>
                {/* 위버튼을 누르면 handleFormSubmit 함수가 호출됨 */}

        </form>

    );

}

}




export default CustomerAdd;
