import express from "express";
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import { connectDB } from './config/mogoDB'
import initBoardRoutes from './route/boardRoute';
import initCardRoutes from './route/cardRoute';
import initColumnRoutes from './route/columnRoute';
import { client } from './config/mogoDB'
import cors from 'cors';


require('dotenv').config();
const app = express()

// const corsOptions = {
//     origin: `${process.env.URL_REACT}`,
//     optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
}))

viewEngine(app);
initWebRoutes(app);
initBoardRoutes(app);
initCardRoutes(app);
initColumnRoutes(app);
connectDB(app).then(() => console.log('Connected succesfully to database server!')).catch(err => {

    console.error(err)
    process.exit(1)
})


let port = process.env.PORT || 8087;
let localhost = process.env.HOST
app.listen(port, localhost, () => {
    console.log("Running with port :" + port, 'and local: ', + localhost);
})

