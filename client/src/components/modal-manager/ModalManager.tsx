import ViewTaskModal from "../view-task-modal/ViewTaskModal";
import CreateTaskModal from "../create-task-modal/CreateTaskModal";
import CreateBoardModal from "../create-board-modal/CreateBoardModal";
import useGlobalState from "../../context/GlobalContext";
import { Modals } from "../../constants";

export default function ModalManager() {
    const {activeModal} = useGlobalState()

  switch (activeModal) {
    case Modals.VIEW_TASK: 
      return <ViewTaskModal />

    case Modals.CREATE_TASK:
      return <CreateTaskModal />

    case Modals.CREATE_BOARD:
      return <CreateBoardModal />
  }
}
