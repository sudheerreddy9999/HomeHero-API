'use strict'
import AuthService from "../services/auth.service.js";
import logger from "../utility/logger.utility.js";

const GetUserController = async(request,response)=>{
    try {
        const data = await AuthService.GetUserService(request);
        if(data.errorCode){
            return response.status(data.errorCode).json({message:data.customMessage})
        }else{
            return response.status(200).json({message:'Request Sucessfull',data:data});
        }
    } catch (error) {
        logger.error(error.message);
        return response.status(500).json({message:"Internal Server Error"});
    }
}

const GetGoogleAuthController = async(request,response)=>{
    try {
        const data = await AuthService.GoogleAuthService(request);
        if(data?.errorCode){
            return response.status(data.errorCode).json({message:data.customMessage})
        }else{
            return response.status(200).json({message:'Request Sucessfull',data:data});
        }
    } catch (error) {
        logger.error(error.message);
        return response.status(500).json({message:"Internal Server Error"});
    }
}

const VerifyOtpController = async (request, response) => {
    try {
      const data = await AuthService.GetUserService(request);
      if (data.errorCode) {
        return response.status(data.errorCode).json({ message: data.customMessage });
      }
      return response.status(200).json({ message: "Otp Verified Successfully",data:data });
    } catch (error) {
      logger.error({ VerifyOtpController: error.message });
      return response.status(500).json({ message: "Internal server error" });
    }
  };


const AuthController = {GetUserController,GetGoogleAuthController,VerifyOtpController}
export default AuthController;