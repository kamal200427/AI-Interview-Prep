import { Link, useNavigate } from "react-router-dom";
import { Zap,  Fingerprint, BrainCircuit, Server, Workflow } from "lucide-react";
import { GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { saveUser } from "../services/SignInApi";
import { useState } from "react";
import { sendOtpApi, verifyOtpApi,getUser } from "../services/OTPApi";
import Logo from "../components/Logo";

export default function SignIn() {
const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const go = (e) => {
    e.preventDefault();
    navigate("/onboarding");
  };
 const sendOTP = async () => {

    if (!email.trim()) {

        alert("Please enter your email.");

        return;
    }

    try {

        const res = await sendOtpApi(email);

        if (res.success) {

            alert(res.message);

            setOtpSent(true);

        } else {

            alert(res.message);

        }

    } catch (err) {

        console.error(err);

    }

};
 const verifyOTP = async () => {

    try {

        const res = await verifyOtpApi(
            email,
            otp
        );

        if (!res.success) {

            alert(res.message);

            return;

        }

        const userResponse = await getUser(email);

        if (!userResponse.success) {

            alert(userResponse.message);

            return;

        }

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "user",
            JSON.stringify(userResponse.user)
        );

        navigate("/dashboard");

    } catch (err) {

        console.error(err);

        alert("OTP verification failed.");

    }

};
  return (
    <div className="auth">
      {/* LEFT */}
      <div className="auth-left">
        <Link to="/" style={{ marginBottom: 60,marginTop:0}} >
          <Logo/>
        </Link>
        <h1>
          Master the Future <br />
          of <span className="accent">Tech.</span>
        </h1>
        <p className="muted" style={{ marginTop: 16, maxWidth: 380 }}>
          Join 10M+ learners on the world's most accessible technical platform.
        </p>

        <div className="auth-illus">
          <div className="brain">
            <BrainCircuit size={42} />
          </div>
          <div className="flow-nodes">
            <span className="fn">
              <Server size={20} />
            </span>
            <span className="fn">
              <Workflow size={20} />
            </span>
            <span className="fn">
              <BrainCircuit size={20} />
            </span>
          </div>
          <div className="caption">Continuous Learning Platform</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <h2>Sign In</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Welcome back to LearnPro.
        </p>
 
           <div style={{ marginTop: 26 }}>
  <div >
    <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const user = jwtDecode(
        credentialResponse.credential
      );

      console.log(user);

      const role =
        localStorage.getItem("userRole");

      const userData = {
        login_type: "google",
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: role,
        google_id: user.sub,
      };

      const result =
        await saveUser(userData);

      console.log(result);
      // localStorage.setItem("picture",user.picture)

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }}
  onError={() => {
    console.log("Login Failed");
  }}
  theme="outline"
  size="large"
  text="continue_with"
/>
  </div>
</div>

<div className="divider">or sign in with OTP</div>

  <form
  onSubmit={(e) => e.preventDefault()}
>
  <input
    className="field"
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    required
  />

  {!otpSent ? (
    <button
      className="btn btn-primary btn-block btn-lg"
      onClick={sendOTP}
    >
      Send OTP
    </button>
  ) : (
    <>
      <input
        className="field"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
      />

      <button
        className="btn btn-primary btn-block btn-lg"
        onClick={verifyOTP}
      >
        Verify OTP
      </button>
    </>
  )}
</form>

        <p className="muted center" style={{ marginTop: 22, fontSize: 14 }}>
          Don't have an account?{" "}
          <Link to="/signup" className="green" style={{ fontWeight: 600 }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
