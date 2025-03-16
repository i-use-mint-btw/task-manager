import { useState, useEffect, FormEvent } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import { API_URL } from "../../constants";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [timesSubmitted, setTimesSubmitted] = useState<number>(0);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState<boolean>(false);

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

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL + "users/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        if (res.status === 200) {
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
      navigate("/", { replace: true });
      return;
    }
  }, [isLoginSuccessful]);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.formTitle}>Login</h1>
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
    </div>
  );
}
