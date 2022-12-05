const jwt = require('jsonwebtoken');


const authentication = (req,res,next) =>{
    console.log(req.session)
    if(!req.session.tok) return res.send('Retry again')
    
    const token = req.session.tok;
    
    jwt.verify(token,'userbase', (err,decoded)=>{
        if(err){
            return res.send('login failed')
        }

        console.log(decoded)
        if(decoded){

          req.body.email =  decoded.email;  
            next()
        }
    })
}

module.exports = authentication;