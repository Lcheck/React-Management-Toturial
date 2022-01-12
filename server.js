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

const multer = require ('multer') ; //데이터 베이스를 추가하기 위한 라이브러리
const upload = multer({dest:'./upload'}); //업로드 폴더 설정

app.get('/api/customers',(req,res)=>{

   
connection.query("SELECT * FROM CUSTOMER",(err,rows,fields)=>{
//CUSTOMER 데이터 베이스틑 가져옴

  res.send(rows); //모든열을 응답

});
})
//rest api를 구현해보자.

app.use('/image',express.static('./upload'));
//서버의 /upload 경로와 사용자의 /image 경로를 매핑해줌

app.post('/api/customers',upload.single('image'),(req,res)=>{
//입력 정보가 /api/customer에 저장되면 추가된 정보를 
//데이터베이스에 추가하는 구문, multer가 ?매개변수에 인자를 넣어준다.
    let sql='INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?)';
    let image = 'http://localhost:5000/image/' + req.file.filename; //멀터가 중복되지 않도록 파일이름을 설정해줌
    //localhost 5000을 붙이니까 이미지가 정상적으로 업로드된다.
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image,name,birthday,gender,job];
   
    connection.query(sql,params, 
      (err,rows,fields)=>{
        res.send(rows);
        console.log(err);
        console.log(rows);
      })

});
app.listen(port, ()=> console.log('Listening'));