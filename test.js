import queryString from 'querystring'
import { createHash } from 'crypto'

const data = {
    service_version: "3.0",
    partner_code: "EGC00001",
    partner_orderid: "20190606004030",
    member_id: "00002",
    member_ip: "1.1.1.1",
    currency: "VND",
    amount: 10000,
    backend_url: "http://101.34.20.66:3100/callback",
    redirect_url: "http://101.34.20.66:3100/index",
    bank_code: "VCB.VN",
    trans_time: "2022-03-11 11:48:00",
}
let str = '';
for (let key in data) {
    str += `${key}=${data[key]}&`
}
let _srt = 'service_version=3.0&partner_code=EGC00001&partner_orderid=GODANCE0001&member_id=GODANCE&member_ip=127.0.0.1¤cy=VND&amount=10000000&backend_url=http://localhost:8081/result.php&redirect_url=http://localhost:8081/notify.php&bank_code=VCB.VN&trans_time=2022-03-11 04:09:57&key=EkSQa2I16QV5FIDJ2vddBInPIJbZ85hM'
let hash = createHash('sha1')
hash.update(_srt)
let sign = hash.digest('hex').toLocaleUpperCase()
console.log(sign)