import { Link, useNavigate } from "react-router-dom";
import {
  Zap,
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { saveUser } from "../services/SignInApi";
import Logo from "../components/Logo";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }
    const role =localStorage.getItem("userRole");
    const userData = {
      login_type: "manual",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: role,
     };

    try {
      await saveUser(userData);

      alert("Account Created Successfully");

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth">

      {/* LEFT SIDE */}
      <div className="auth-left">

        <Link
          to="/"
          
          style={{ marginBottom: 36 }}
        >
          <Logo/>
        </Link>

        <h1>
          Start Your Journey <br />
          in <span className="accent">
            Tech.
          </span>
        </h1>

        <p
          className="muted"
          style={{
            marginTop: 16,
            maxWidth: 380,
          }}
        >
          Create your account and
          unlock personalized
          learning paths, interview
          preparation, mock tests,
          AI mentor and more.
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">

        <h2>Create Account</h2>

        <p
          className="muted"
          style={{ marginTop: 6 }}
        >
          Join LearnPro today.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ marginTop: 25 }}
        >

          <div className="input-group">
            <User size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <Mail size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <Phone size={18} />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
          >
            Create Account
          </button>

        </form>

        <p
          className="muted center"
          style={{
            marginTop: 20,
            fontSize: 14,
          }}
        >
          Already have an account?{" "}
          <Link
            to="/signin"
            className="green"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}