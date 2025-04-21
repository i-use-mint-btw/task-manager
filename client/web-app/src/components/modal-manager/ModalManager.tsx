import { useState } from "react";
import ViewTaskModal from "../view-task-modal/ViewTaskModal";
import CreateTaskModal from "../create-task-modal/CreateTaskModal";
import CreateBoardModal from "../create-board-modal/CreateBoardModal";
import { Task } from "../../types";
import useGlobalState from "../../context/GlobalContext";

export default function ModalManager() {
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isViewTaskModalVisible, setIsViewTaskModalVisible] = useState(false);
  const [isCreateTaskModalVisible, setIsCreateTaskModalVisible] =
    useState(false);
  const [isCreateBoardModalVisible, setIsCreateBoardModalVisible] =
    useState(false);
    const {selectedBoard} = useGlobalState()

  function handleTaskClick(task: Task) {
    setSelectedTask(task);
    setIsViewTaskModalVisible(true);
  }

  async function handleCreateNewBoardClick() {
    setIsCreateBoardModalVisible(true);
  }

  function handleAddNewTaskClick() {
    if (!selectedBoard) {
      alert("Please select a board first.");
      return;
    }

    setIsCreateTaskModalVisible(true);
  }

  return (
    <>
      {selectedTask && (
        <ViewTaskModal
          onOutOfBoundsClick={handleModalOutOfBoundsClick}
          data={selectedTask}
          boardID={boards[selectedBoardID]?.id}
          onNewResourceAdded={setResourcesAdded}
        />
      )}
      <CreateTaskModal
        onNewResourceAdded={setResourcesAdded}
        boardID={boards[selectedBoardID]?.id}
        onOutOfBoundsClick={handleModalOutOfBoundsClick}
      />
      <CreateBoardModal
        onResourceAdded={handleResourceAdded}
        onOutOfBoundsClick={handleModalOutOfBoundsClick}
      />
    </>
  );
}
