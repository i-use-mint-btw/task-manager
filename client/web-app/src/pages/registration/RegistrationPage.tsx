import { FormEvent, useEffect, useState } from "react";
import styles from "./registration.module.css";
import { useNavigate } from "react-router";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

// TODO: implement email and password validation
// TODO: update ui to show Register and link to login page if already registered

export default function RegistrationPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [timesSubmitted, setTimesSubmitted] = useState<number>(0);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setTimesSubmitted((prevTimes) => prevTimes + 1);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL + "users/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        if (res.status === 201) {
          setIsLoginSuccessful(true);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, [timesSubmitted]);

  useEffect(() => {
    if (isLoginSuccessful) {
      navigate("/login", { replace: true });
      return;
    }
  }, [isLoginSuccessful]);

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
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            <input
              className={styles.formInput}
              type="text"
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <button
              className={styles.submitBtn}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
          <p style={{marginTop: "20px"}} >
            Already have an account?
            <Link to="/login"> log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
