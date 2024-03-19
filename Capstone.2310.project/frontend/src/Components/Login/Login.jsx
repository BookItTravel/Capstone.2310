import { useRef, useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import video from "../../assets/video.mp4";
import Footer from "../Footer/Footer";
import "./login.css";
import axios from "axios";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', {
            username: user,
            password: pwd,
          });
      

      // Check if the response is successful
    if (response.status === 200) {
      const { token } = response.data;
      
      setAuth({ user, pwd, accessToken: token });
      setUser("");
      setPwd("");
      setSuccess(true);
      navigate(from, { replace: true });
    } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error(err);
      setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };

  return (
    <div className="home">
      <div className="overlay"></div>
      {/* <video
        className="video-background"
        src={video}
        muted
        autoPlay
        loop
        type="video/mp4"
      ></video> */}
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span>
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Login;
