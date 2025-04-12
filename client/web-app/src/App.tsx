import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import { API_URL } from "./constants";
import { useNavigate } from "react-router";
import { Board as BoardModel, Task } from "./types";
import Board from "./components/board/Board";
import ViewTaskModal from "./components/view-task-modal/ViewTaskModal";
import CreateTaskModal from "./components/create-task-modal/CreateTaskModal";
import CreateBoardModal from "./components/create-board-modal/CreateBoardModal";

// TODO: Stop taskcolumn from overlapping when there are too many tasks
// Make it so that subtasks are sent along with the dto to create a new task
// Add completion status to subtask

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isViewTaskModalVisible, setIsViewTaskModalVisible] =
    useState<boolean>(false);
  const [isCreateTaskModalVisible, setIsCreateTaskModalVisible] =
    useState<boolean>(false);
  const [isCreateBoardModalVisible, setIsCreateBoardModalVisible] =
    useState<boolean>(false);
  const [selectedBoardID, setSelectedBoardID] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [resourcesAdded, setResourcesAdded] = useState<number>(0);
  const [error, setError] = useState<unknown | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function toggleSidebarOpen() {
    setIsSidebarOpen((prev) => !prev);
  }

  function toggleCreateTaskModalVisibility() {
    setIsCreateTaskModalVisible((prev) => !prev);
  }

  function handleBoardInfoClick(id: number) {
    setSelectedBoardID(id);
    return undefined;
  }

  function handleModalOutOfBoundsClick() {
    setIsCreateTaskModalVisible(false);
    setIsViewTaskModalVisible(false);
    setIsCreateBoardModalVisible(false);
  }

  function handleTaskClick(task: Task) {
    setSelectedTask(task);
    setIsViewTaskModalVisible(true);
  }

  async function handleCreateNewBoardClick() {
    setIsCreateBoardModalVisible(true)
  }

  function handleResourceAdded() {
    setResourcesAdded(prev => prev + 1)
  }

  function handleAddNewTaskClick() {
    if (selectedBoardID === -1) {
      alert("Please select a board first.");
      return;
    }

    setIsCreateTaskModalVisible(true);
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
  }, [navigate, resourcesAdded]);

  return (
    <>
      <div className={styles.rootContainer}>
        {selectedTask && (
          <ViewTaskModal
            onOutOfBoundsClick={handleModalOutOfBoundsClick}
            visible={isViewTaskModalVisible}
            data={selectedTask}
            boardID={boards[selectedBoardID]?.id}
            onNewResourceAdded={setResourcesAdded}
          />
        )}
        <CreateTaskModal
          toggleVisibility={toggleCreateTaskModalVisibility}
          onNewResourceAdded={setResourcesAdded}
          boardID={boards[selectedBoardID]?.id}
          onOutOfBoundsClick={handleModalOutOfBoundsClick}
          visible={isCreateTaskModalVisible}
        />
        <CreateBoardModal 
          visible={isCreateBoardModalVisible}
          onResourceAdded={handleResourceAdded}
          onOutOfBoundsClick={handleModalOutOfBoundsClick}
        />
        {isSidebarOpen && (
          <Sidebar
            selectedBoardID={selectedBoardID}
            onBoardInfoClick={handleBoardInfoClick}
            toggle={toggleSidebarOpen}
            boards={boards}
            onCreateNewBoardClick={handleCreateNewBoardClick}
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
            onAddNewTaskClick={handleAddNewTaskClick}
          />
          <div className={styles.boardContainer}>
            {boards[selectedBoardID] && (
              <Board
                data={boards[selectedBoardID]}
                onTaskClick={handleTaskClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
