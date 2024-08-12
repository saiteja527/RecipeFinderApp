import './Login.css';
import googleLogo from '../../assets/google-logo.png'; 
import logo from '../../assets/login-image.jpg'; 

const Login = () => {
  const LoginWithGoogle = () => {
    window.open(`https://recipefinderappbackend.onrender.com/auth/google/callback`, "_self");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src={logo} alt="Login" className="login-logo" />
        </div>
        <div className="login-content">
          <h1 className="login-title">Login</h1>
          <button className="login-with-google-btn" onClick={LoginWithGoogle}>
            <img src={googleLogo} alt="Google" className="google-logo" />
            <span>Sign In With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
