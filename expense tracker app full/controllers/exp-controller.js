const Users = require("../models/expenses-model");

exports.postaddNew = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body);

Users.findAll({
  where: {
    email: email
  }
})
.then(result=>{
  if(result.length>0){
  res.json(result);
}
else{
  Users.create({
   name,email,password
  })
    .then((result) => {
      console.log("user Created");
      res.status(200).json();
    })
    .catch((err) => console.log(err));
}})


  
};

// exports.postDelete = (req, res, next) => {
//   id = req.params.id;

//   Users.destroy({ where: { id } }).then((data) => {
//     res.json(data);
//     console.log("deleted");
//   });
// };
// exports.getEverything = (req, res, next) => {
//   Users.findAll()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => console.log(err));
//   };
  