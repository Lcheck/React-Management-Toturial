const express = require ('express');

const bodyParser = require('body-parser');

//모듈 불러오기

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
//json 형태로 변환?
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
 //1항의 경로로 접속하면 res.send의 내용을 보내줌 
    res.send( [{

        'id' : 1,
        'image' : 'https://placeimg.com/64/64/any',
        'name':'홍동',
        'birthday':'991223',
        'gender':'남자',
        'job':'군인'
        
        },
        {
        
          'id' : 2,
          'image' : 'https://placeimg.com/64/64/any',
          'name':'은호',
          'birthday':'891023',
          'gender':'남자',
          'job':'학생'
          
          },
          {
        
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/any',
            'name':'채림',
            'birthday':'790223',
            'gender':'여자',
            'job':'BJ'
            
            }]);

})
//rest api를 구현해보자.

app.listen(port, ()=> console.log('Listening'));