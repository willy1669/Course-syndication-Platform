import { signUp, login, userSignUpForACourse} from '../services/userService';

//Define user sign up
export const userSignUp = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      countryCode: req.body.countryCode,
    };
    const user = await signUp(req, res, data);
    return user;
  } catch (exception) {
    console.error(`Error: ${exception}`);
  }
};

//Define user login
export const userLogin = async (req, res) => {
  try {
    const userLogin = await login(req, res);
    return userLogin;
  } catch (exception) {
    console.error(`Error: ${exception}`);
  }
};

//Define user sign up for a course 
export const userSignUpForACourse = async (req, res) => {
  try {
    const {userId, courseDetails } = req.params;
    const result = await userSignUpForACourse(req, res, userId, courseDetails);
    return result;
  } catch (exception) {
    console.error(`Error: ${exception}`);
  }
}