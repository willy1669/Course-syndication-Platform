import { signUp, login} from '../services/userService';

//Define user sign up
export const userSignUp = async (req, res) => {
    try {
        const data = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
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