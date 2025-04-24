import styles from "./app.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import { API_URL } from "./constants";
import { useNavigate } from "react-router";
import { Board as BoardModel, } from "./types";
import Board from "./components/board/Board";
import useFetch from "./hooks/useFetch";
import useAuth from "./context/AuthContext";
import ModalManager from "./components/modal-manager/ModalManager";
import { useEffect } from "react";
import useGlobalState from "./context/GlobalContext";

export default function App() {
  // Get this to re-run when a new resource is added
  const {selectedBoard, setSelectedBoard} = useGlobalState()
  const {
    payload: boards,
    error,
  } = useFetch<BoardModel[]>(API_URL + "/boards", "GET", {
    credentials: "include",
  });

  useEffect(() => {
    if (!boards || !selectedBoard) return
    
    for (const board of boards) {
      if (board.id === selectedBoard?.id) {
        setSelectedBoard(board)
        return
      }
    }
  }, [boards])

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) navigate("/login");
  if (error) return <NoBoards />

  return (
    <>
    <ModalManager />
      <div className={styles.rootContainer}>
        <Sidebar boards={boards} />
        <div className={styles.mainContentContainer}>
          <Header />
          <div className={styles.boardContainer}>
            <Board />
          </div>
        </div>
      </div>
    </>
  );
}

function NoBoards() {
  return <div>There arent any available boards</div>;
}