import { FormEvent, useState } from "react";
import styles from "./registration.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext";

// TODO: implement email and password validation
// TODO: update ui to show Register and link to login page if already registered

export default function RegistrationPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { register, setIsAuthenticated } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const res = await register(email, password)
    if (res.ok) {
      setIsAuthenticated(true)
      navigate("/login")
      return
    }
    if (res.status === 409) setErrorMessage("Error: user already exists")
  }

  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.mainContainer}>
          <h1 className={styles.formTitle}>Register</h1>
          <form className={styles.formContainer}>
            <input
              className={styles.formInput}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.formInput}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={styles.submitBtn}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <p style={{ marginTop: "20px" }} >
            Already have an account?
            <Link to="/login"> log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}