import dotenv from 'dotenv'
dotenv.config()
import fetch from 'node-fetch'
//import queryString from 'querystring'
import { createHash } from 'crypto'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

//const expressLayouts = require('express-ejs-layouts')

import session from 'express-session'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import fileUpload from 'express-fileupload'

// mongose schema
// const monk = require('monk')
// const yup = require('yup')

import methodOverRide from 'method-override'
//import corsMiddleware from './cors/index'
const app = new express()

app.set('view engine', 'ejs')
app.use(helmet())
app.use(morgan('tiny'))
    //app.use(corsMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//app.use(expressLayouts)
app.use(express.json())

//post 改用put delete
app.use(methodOverRide('_method'))

app.use(cookieParser('myBlog'))
app.use(session({
    secret: 'myblogsecret',
    saveUninitialized: true,
    resave: true,
}))
app.use(flash())
app.use(fileUpload())
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "X-Custom-Header",
        "Access-Control-Max-Age": 86400,
        "Content-Security-Policy": "default-src *;script-src * 'unsafe-inline'",
        "X-Content-Security-Policy": "default-src *;script-src * 'unsafe-inline'",
        "X-WebKit-CSP": "default-src *;script-src * 'unsafe-inline'"
    })
    next();
});
//通用中间件
//app.use(logger)

//单独接口中间件（logger）
app.get('/', logger, async(req, res) => {
    console.log(req.query)
    const key = 'EkSQa2I16QV5FIDJ2vddBInPIJbZ85hM'
    const action = "https://gogomart168com.com/fundtransfer.php"
    const data = {
        service_version: "3.0",
        partner_code: "EGC00001",
        partner_orderid: "Test0001" + new Date().getTime(),
        member_id: "Test0001",
        currency: "VND",
        amount: 10000000,
        backend_url: "http://101.34.20.66:3100/callback",
        redirect_url: "http://101.34.20.66:3100/index",
        bank_code: "VCB.VN",
    }
    let str = '';
    for (let key in data) {
        str += `${key}=${data[key]}&`
    }
    str += `key=${key}`
    console.log(str)
    let hash = createHash('sha1')
    hash.update(str)
    let sign = hash.digest('hex').toLocaleUpperCase()
    console.log(sign)
    data.sign = sign
    data.action = action
    data.remarks = 1
    data.member_ip = "1.1.1.1"
    data.trans_time = "2022-03-11 04:09:57"
    res.render('home', data);
})

app.post('/callback', (req, res) => {
    res.json(req.body)
    res.send(req.originalUrl + ' callback ok')
})

app.get('/callback', (req, res) => {
    res.send(req.originalUrl + ' callback ok')
})

app.get('/index', (req, res) => {
    res.send('ok')
})

app.get('/error', (req, res) => {
    //res.status(500).send('hi')
    //res.download('app.js')
    res.sendStatus(500)
})

import userRouter from './routes/user.js'
app.use('/users', userRouter)
app.use((err, req, res, next) => {
    res
        .status(err.status ? err.status : 500)
        .json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '1' : err.stack
        })
})

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}
console.log(process.env.WEB_PORT)
app.listen(process.env.WEB_PORT)


// function all(n) {
//     if (n < 1) {
//         return 'n should > 0'
//     }
//     let a = 1,
//         b = 2,
//         method = 0;
//     if (n === 1) {
//         return a;
//     }
//     if (n === 2) {
//         return b;
//     }
//     let A = Math.ceil(n / 2);
//     for (let i = 0; i <= A; i++) {
//         if (i === 0) {
//             method++;
//         } else {
//             method += zuhe(n - i, i)
//         }
//     }
//     console.log('method:', method)
// }

// function zuhe(n, m) {
//     if (n < m) {
//         return 0
//     }
//     let i = 0,
//         j = 1,
//         sum1 = 1,
//         sum2 = 1;
//     while (i < m) {
//         sum1 *= n;
//         n--;
//         i++;
//     }
//     while (j <= m) {
//         sum2 *= j;
//         j++;
//     }
//     return sum1 / sum2
// }

// all(13)