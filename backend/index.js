import express,{json} from 'express';
import { route } from './Routes/adminRoute.js';
import cors from 'cors'

const app = express();

const port = 3000;

app.use(json());
app.use(cors())
app.use('/',route);


app.post('/',(req, res)=>{
    req.send("hello world");
});

app.listen(port, ()=>{
    console.log(`server running port ${port}`);
    
})