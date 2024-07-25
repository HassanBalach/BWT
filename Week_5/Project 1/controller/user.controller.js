import { v4 as uuidv4 } from "uuid";

let user = [
  {
    userName: "Ali",
    email: "ali@gmail.com",
    age: 12,
  },
];

export const createUser = (req, res) => {
  const userDetail = req.body;
  const createUser = user.push({ ...userDetail, id: uuidv4() });
  res.status(201).json({ message: `User is successfully created` });
};
export const getAllUsers = (req, res) => {
  res.status(201).json(user);
};
///I have to start from here tomorrow inshallah
export const getAUser = (req, res) => {
  const { id } = req.params;

  const User = user.find((users) => users.id === id);
 
  res.status(201).json({"Message:": User});
};
export const updateUser =  (req, res) => {
   const { id } = req.params;
   const { userName ,  email , age} = req.body;

   if (!userName || !email || !age) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  
 const User =  user.find((users)=>users.id === id)

 if(userName){
  User.userName =  userName;
 }
 if(email){
  User.email =  email;
 }
 if(age){
  User.age =  age;
 }
   
 res.status(201).json(User)

  
};
export const deleteUser = (req, res) => {
  const { id } = req.params;

  user =  user.filter((users)=>users.id !== id)

 res.status(201).json({message: "User is successfully deleted"})
  


};
