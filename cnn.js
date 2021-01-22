const pgPromise= require('pg-promise')
const config={
    host:'localhost',
    post:'5432',
    database:'proyetcom',
    user:'postgres',
    password:'viviana24'
}
const pgp=pgPromise({});
const db=pgp(config);
//esportar la BDD
db.any('select * from serviciocliente').then(res => { console.log(res) });
exports.db=db;