import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { userRoles } from '../utils/constant.js';
import { fieldNotFound } from '../utils/helper.js';


const options = {
  httpOnly : true,
  secure : true
}

const generateAccessRefreshToken= async (userId) => {
      const user = await User.findById(userId)

     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()

     user.refreshToken = refreshToken

    user.save({validateBeforeSave: false})

     return {
      accessToken,
      refreshToken
     }
}

const registerUser = asyncHandler(async(req,res)=>{

  const { username, password, secretKey, email } = req.body

      if(secretKey === undefined || secretKey === "") {
        throw new ApiError(400, "Secret is required for admin sign-up")
      }

      const userAlreadyExists = await User.findOne(
        {
           $or : [{ email  } , { username }]
        }
      )

      if(userAlreadyExists) {
        throw new ApiError(208, "user already exists")
      }

      const userData = {
        username,
        password,
        username,
        role : secretKey && userRoles.ADMIN ,
        email
      }

      const user = await User.create(userData)

      if(!user) {
        throw new ApiError(500, "Internal server error try again some time")
      }

      /*
        TODO : when user register and then return a log or email
        for verifing user are not login with dummy credentials
      */

    return res.status(201).json(new ApiResponse(201,
      { user }
    ,"userCreated Successfully"))
})

const loginUser = asyncHandler(async(req,res)=>{

    const { email, password } = req.body

    const user = await User.findOne({email})

    fieldNotFound(user)

    const isPasswordCorrect = await user.isValidPassword(password)

    if(!isPasswordCorrect) {
      throw new ApiError(401, "Credentials faild")
    }

    const  {
      accessToken,
      refreshToken
    } = await generateAccessRefreshToken(user._id)


  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(new ApiResponse(200,  {}, "Admin login successfully"))
})

const logoutUser = asyncHandler(async(req,res)=>{

  const user = req.user

  fieldNotFound(user)

  await User.findByIdAndUpdate(user._id, {
    refreshToken : ""
  })

  await user.save({validateBeforeSave: false})

  return res.status(200)
  .cookie("accessToken", options)
  .cookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logout successfully"))
})

const getUser = asyncHandler(async(req,res)=>{

  const user = req.user

  fieldNotFound(user)

  const getUser = await User.findById(user._id)

  return res.status(200).json(new ApiResponse(200 , {getUser} , "User fetch Successfully"))
})

const updateUserProfile = asyncHandler(async(req,res)=>{

    const user = req.user

    fieldNotFound(user)

    await User.findByIdAndUpdate(
  user._id,
  { $set: req.body },
  { new: true, runValidators: true }
    );



  return res.status(200).json(new ApiResponse(200,{}, "User fileds udpate successfully"))
})

const changeCurrentPassword = asyncHandler(async(req,res) => {

  const { oldPassword, newPassword } = req.body

  const user = req.user

  fieldNotFound(user)

  const userPasswordCheck = await User.findById(user._id)

  const isPasswordCorrect = await userPasswordCheck.isValidPassword(oldPassword)

  if(!isPasswordCorrect) {
    throw new ApiError(401, "oldPassword check onece")
  }

  userPasswordCheck.password = newPassword

    await user.save({validateBeforeSave: false})

  return res.status(200).json(new ApiResponse(200, {}, "password Change successfully"))
})



export {
  changeCurrentPassword, getUser, loginUser,
  logoutUser, registerUser, updateUserProfile
};
