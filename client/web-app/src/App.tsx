import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import { API_URL } from "./constants";
import { useNavigate } from "react-router";
import { Board as BoardModel } from "./types";
import Board from "./components/board/Board";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedBoardID, setSelectedBoardID] = useState<number>(-1);
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const navigate = useNavigate();

  function toggleSidebarOpen() {
    setIsSidebarOpen((prev) => !prev);
  }

  function handleBoardInfoClick(id: number) {
    setSelectedBoardID(id);
    return undefined;
  }

  useEffect(() => {
    async function fetchBoards() {
      try {
        const res = await fetch(API_URL + "/boards", {
          method: "GET",
          credentials: "include",
        });

        if (res.status >= 400 && res.status <= 499 && res.status !== 404) {
          throw Error();
        } else if (res.status === 404) {
          return;
        }

        const payload = await res.json();
        setBoards(payload);
      } catch {
        navigate("/login");
      }
    }
    fetchBoards();
  }, []);

  return (
    <>
      <div className={styles.rootContainer}>
        {isSidebarOpen && (
          <Sidebar
            selectedBoardID={selectedBoardID}
            onBoardInfoClick={handleBoardInfoClick}
            toggle={toggleSidebarOpen}
            boards={boards}
          />
        )}
        <div className={styles.mainContentContainer}>
          <Header
            toggle={toggleSidebarOpen}
            boardName={
              boards[selectedBoardID]
                ? boards[selectedBoardID].title
                : "No board selected"
            }
          />
          <div className={styles.boardContainer}>
            {boards[selectedBoardID] ? (
              <Board data={boards[selectedBoardID]} />
            ) : (
              <div style={{ background: "#21212d", height: "100%" }}></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
