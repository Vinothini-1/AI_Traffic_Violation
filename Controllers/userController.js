import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js';
import cloudinary from 'cloudinary';
import { formatImage } from "../middleware/multerMiddleware.js";





export const getCurrentUser = async (req, res) => {
    const userWithPassword = await User.findOne({_id: req.user.userId});
    const user = userWithPassword.toJSON();
    
    res.status(StatusCodes.OK).json({user});
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await RItem.countDocuments();
    res.status(StatusCodes.OK).json({users: users, jobs: jobs});
}


export const updateUser = async (req, res) => {
    
    const obj = {...req.body};
    delete obj.password;

    if(req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file) ;
       
        obj.avatar = response.secure_url;
        obj.avatarPublicId = response.public_id;
    }

    console.log(obj);
    const updatedUser = await User.findByIdAndUpdate(req.user.userId , obj );
    
    if(req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    } 
    
    res.status(StatusCodes.OK).json({msg:'update user'});

   
}



// Controller to get all users
export const getAllUsers = async (req, res) => {
  try {
    // Query all users from the database
    const users = await User.find();

    // Return users in the response
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    // Return error if something goes wrong
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: "Failed to retrieve users",
      error: error.message
    });
  }
};


// Controller to delete a user
export const deleteUser = async (req, res) => {

    try {
        // Find user by ID and remove it from the database
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
        }

        // If the user has an avatar, delete it from cloudinary
        if (deletedUser.avatarPublicId) {
            await cloudinary.v2.uploader.destroy(deletedUser.avatarPublicId);
        }

        res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            msg: "Failed to delete user",
            error: error.message
        });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters
  
    try {
      // Query the user by ID from the database
      const user = await User.findById(id);
  
      // Check if the user was found
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
      }
  
      // Return user details in the response
      res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      // Return error if something goes wrong (e.g., invalid ID format)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        msg: "Failed to retrieve user",
        error: error.message
      });
    }
  };