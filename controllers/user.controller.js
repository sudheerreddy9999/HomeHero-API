"use strict";
import logger from "../utility/logger.utility.js";
import UserService from "../services/user.service.js";

const RegisterNewUserController = async (request, response) => {
  try {
    const data = await UserService.RegisterNewUserService(request);
    if (data?.errorCode) {
      return response
        .status(data.errorCode)
        .json({ message: "User Already Exists" });
    }
    return response.status(200).json({ message: "User Created Successfully", data:data });
  } catch (error) {
    logger.error({RegisterNewUser: error.message});
    return response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const GetUserDetailsContoller = async(request,response)=>{
  try {
    const data = await UserService.GetUserDeatilsService(request);
    if(data?.errorCode){
      return response.status(data.errorCode).json({message:data.customMessage})
    }
    return response.status(200).json({data:data})
  } catch (error) {
    return response.status(500).json({message:"Internal Server Error",})
  }
}

const UserController = { RegisterNewUserController,GetUserDetailsContoller };
export default UserController;
