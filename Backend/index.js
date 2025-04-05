import express from 'express';
const app =express();

 app.get('/' ,(req, res) =>{
  res.send("Samrat Achiever");
 });
 app.get('/jokes',(req, res) =>{
    const jokes=[
        { id :1,
            conten:"iam  joke first",
        },
        { id :2,
            conten:"iam  joke two",
        },
        { id :3,
            conten:"iam  joke third",
        }
    ];
    res.send(jokes);
 });

const port = process.env.PORT || 4000;

 app.listen( port, () => {
  console.log(`server is  http://localhost:${port}`);
 });