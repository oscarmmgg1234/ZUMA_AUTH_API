const {db_init} = require('../db_api/db_init');

const db = db_init();
db.connect();

const querys = {
    auth_: "SELECT * from Credentials WHERE EMAIL = ?",
    auth_get_user: "SELECT * from EMPLOYEE WHERE EMAIL = ?",
}

const signIn = (args) => {
    return new Promise((resolve)=>{
        db.query(querys.auth_,[args.email], (err, result)=>{
        if(err)resolve(err);
        var data = Object.values(JSON.parse(JSON.stringify(result)))
        if(data[0].PASSWORD == args.password){
            db.query(querys.auth_get_user, [args.email],(err,result)=>{
                var data = Object.values(JSON.parse(JSON.stringify(result)))
                resolve(data);
            })
        }
    })
})
}

exports.signIn = signIn;