const jwt = require('jsonwebtoken');


const authentication = (req,res,next) =>{
    if(!req.session.token) return res.send('Retry again')
    
    const token = req.session.token;
    
    jwt.verify(token,'userbase', (err,decoded)=>{
        if(err){
            return res.send('login failed')
        }

        
        if(decoded){
          res.body.email =  decoded.email;  
            next()
        }
    })
}

module.exports = authentication;