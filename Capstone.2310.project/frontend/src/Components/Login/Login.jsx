import { useRef, useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.css";
import { login } from "../../api/index";

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
      const response = await login(user, pwd);

      const { token } = response.data;

      setAuth({ user, pwd, accessToken: token });
      setUser("");
      setPwd("");
      setSuccess(true);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };

  return (
    <div>
      <div className="login_home">
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <a href="#">Go to Home</a>
            </p>
          </section>
        ) : (
          <section className="login-container">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="login-heading">Sign In</h1>
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
                className="loginInput"
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="loginInput"
              />
              <Link>
                <button type="submit" className="login-button">
                  Sign In
                </button>
              </Link>
              <Link to="/master_table">
                <button className="guest-button">Book as Guest</button>
              </Link>
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
      </div>
    </div>
  );
};

export default Login;
