import { useState, FormEvent } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, setIsAuthenticated} = useAuth()
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const res = await login(email, password)
    if (res.ok) {
      setIsAuthenticated(true)
      navigate("/")
      return
    }
    if (res.status === 404) setErrorMessage("Error: user not found")
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.mainContainer}>
        <h1 className={styles.formTitle}>Login</h1>
        <form className={styles.formContainer} onSubmit={e => handleSubmit(e)}>
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
          >
            Submit
          </button>
        </form>
        <p style={{color: "red"}}>{errorMessage}</p>
        <p style={{ marginTop: "20px" }}>
          Dont have an account?
          <Link to="/register"> register</Link>
        </p>
      </div>
    </div>
  );
}
