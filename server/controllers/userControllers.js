// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');

// const getUser = async (req, res) => {
//   const id = req.user._id;
//   try {
//     let user = await User.findById(id).select('-password');
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json('Internal Server Error');
//     console.log(error);
//   }
// };

// const updateUser = async (req, res) => {
//   const id = req.user._id;
//   const { name, email, password, newPassword } = req.body;
//   const newUser = {};
//   try {
//     if (name) {
//       newUser.name = name;
//     }
//     if (newPassword) {
//       const salt = await bcrypt.genSalt(10);
//       newUser.password = await bcrypt.hash(newPassword, salt);
//     }
//     let user = await User.findById(id);
//     const passCheck = await bcrypt.compare(password, user.password);
//     if (passCheck) {
//       user = await User.findByIdAndUpdate(id, newUser, { new: true }).select('-password');
//       res.status(200).json({ user });
//     } else {
//       res.status(401).json('Incorrect Password');
//     }
//   } catch (error) {
//     res.status(500).json('Internal Sever Error');
//     console.log(error);
//   }
// };

// // const deleteUser = async (req, res) => {
// //   const { id } = req.user;
// //   try {
// //     const user = await User.findByIdAndDelete(id, { new: true });
// //     res.status(200).json('User Deleted Successfully ' + user);
// //   } catch (error) {
// //     res.status(400).json('Internal Server Error');
// //     console.log(error);
// //   }
// // };

// module.exports = { getUser, updateUser };
