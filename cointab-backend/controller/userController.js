const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userModel = require("../model/user.model");
const userController = Router();

userController.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.send("singup failed, something went wrong try again later");
    }

    const new_user = new userModel({ email, name, password: hash});

    await new_user
      .save()
      .then(() =>  res.send("signup successfull"))
      .catch(() => res.send("user already exists"));

   
  });
});


userController.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({ email });

  if (!user) {
    return res.send({ message: "Please Signup first", isAuth: false });
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
        
      return res.send({ message: "Invalid Credential", isAuth: false });
    }

    if (result && user.block == false) {
      const token = jwt.sign(
        { email, userId: user._id, name: user.name },
        "userbase"
      );
        console.log(token)
      req.session.tok = token;
      let new_unk = await userModel.findOneAndUpdate({email},{ $set:{count: 0,block:false,logTime:[]}},{new:true})
      await new_unk.save();
      return res.send({
        message: "login Success",
        isAuth: true,
      });
    } else {
        user.count = user.count + 1;
        console.log("user count",user.count);
        if(user.block == false){

            if(user.count == 5){
                user.logTime.push(Date.now())
                let new_upd = await userModel.findOneAndUpdate({email},{ $set:{block:true,logTime:user.logTime}},{new:true})
                await new_upd.save();
                
            }
            else if(user.count == 4){
              user.logTime.push(Date.now())
              let new_mod = await userModel.findOneAndUpdate({email},{ $set:{count: user.count,logTime:user.logTime}},{new:true})
                await new_mod.save();
              return res.send('only one last attempt is left, after that ur block for 24hours ')
            }
            else{
                user.logTime.push(Date.now())
                // console.log(user)
                let new_mod = await userModel.findOneAndUpdate({email},{ $set:{count: user.count,logTime:user.logTime}},{new:true})
                await new_mod.save();
            }
        }
        else{
            let lastTime = user.logTime[4];
            console.log(lastTime);
            let end = Date.now() - lastTime;
            let unlockTime = Math.floor(end / 1000)
            // let unlockTime = 90000
            console.log(unlockTime)


            if(unlockTime >= 86400){
                let new_unk = await userModel.findOneAndUpdate({email},{ $set:{count: 0,block:false,logTime:[]}},{new:true})
                await new_unk.save();
            }
            else{
                console.log(86400 - unlockTime,'time')
                if(86400 - unlockTime > 3600){

                    return res.send(`Try  ${Math.floor(Math.floor((86400-unlockTime)/60)/60)} hours`)
                }
                else{
                    
                    return res.send(`Try after ${Math.floor((3600 - unlockTime)/60)} mins`)
                }
            }

        }
     
      return res.send({ message: "Invalid Credential", isAuth: false });
    }
  });
})

userController.get('/logout', async (req, res) =>{
  // return res.send({message: "Logout Successfully", isAuth: false})
    req.session.destroy(function(err) {
        if(err) {
          return err
        }
       
        return  res.send({message: "Logout Successfully", isAuth: false})
      })

    //   if(x == false){
    //   }
    // else res.send({message: "Logout Successfully", isAuth: false})

})


module.exports = userController;
