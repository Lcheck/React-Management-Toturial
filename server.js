const fs = require('fs'); //database.json의 환경설정 정보를 읽어오기 위해 파일시스템 모듈 호출

const express = require ('express');

const bodyParser = require('body-parser');

//모듈 불러오기

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
//json 형태로 변환?
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');//데이터베이스 설정정보 읽어오기

const conf = JSON.parse(data); //설정정보를 파싱해서 저장

const mysql = require('mysql'); // mysql라이브러리 호출

const connection = mysql.createConnection({

host:conf.host,
user:conf.user,
password:conf.password,
port:conf.port,
database:conf.database
   //파싱한 정보로 mysql객체 생성
});

connection.connect(); //데이터 베이스 연동

app.get('/api/customers',(req,res)=>{

   
connection.query("SELECT * FROM CUSTOMER",(err,rows,fields)=>{
//CUSTOMER 데이터 베이스틑 가져옴

  res.send(rows); //모든열을 응답

});
})
//rest api를 구현해보자.

app.listen(port, ()=> console.log('Listening'));