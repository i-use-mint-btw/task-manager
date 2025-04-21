import { useState } from "react";
import styles from "./app.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import { API_URL } from "./constants";
import { useNavigate } from "react-router";
import { Board as BoardModel, } from "./types";
import Board from "./components/board/Board";
import useFetch from "./hooks/useFetch";
import useAuth from "./context/AuthContext";
import { GlobalProvider } from "./context/GlobalContext";

export default function App() {
  const [resourcesAdded, setResourcesAdded] = useState(0);
  // Get this to re-run when a new resource is added
  const {
    payload: boards,
    loading,
    error,
  } = useFetch<BoardModel[]>(API_URL + "/boards", "GET", {
    credentials: "include",
  });

  function handleResourceAdded() {
    setResourcesAdded((prev) => prev + 1);
  }

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) navigate("/login");

  if (loading) return <Loading />;

  return (
    <GlobalProvider>
      <div className={styles.rootContainer}>
        <Sidebar
          boards={boards}
          onCreateNewBoardClick={handleCreateNewBoardClick}
        />
        <div className={styles.mainContentContainer}>
          <Header onAddNewTaskClick={handleAddNewTaskClick} />
          <div className={styles.boardContainer}>
            {boards === null ? (
              <NoBoards />
            ) : (
              <Board
                onTaskClick={handleTaskClick}
              />
            )}
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

function NoBoards() {
  return <div>There arent any available boards</div>;
}

function Loading() {
  return <div>Loading...</div>;
}
