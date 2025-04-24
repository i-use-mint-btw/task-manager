import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Board, Task } from "../types";
import { Modals } from "../constants";

type IProps = {
  children?: ReactNode;
};

type IGlobalContext = {
  isSidebarOpen: boolean;
  selectedBoard: Board | null;
  activeModal: Modals;
  selectedTask: Task | null;
  shouldRefetch: boolean
  toggleSidebar: () => void;
  setSelectedBoard: Dispatch<SetStateAction<Board | null>>
  setActiveModal: Dispatch<SetStateAction<Modals>>
  setSelectedTask: Dispatch<SetStateAction<Task | null>>
  forceRefetch: () => void
};

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export function GlobalProvider({ children }: IProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState(Modals.NONE);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false)

  // Forces the app to refetch the newest boards and rerenders the entire component tree

  function forceRefetch() {
    setShouldRefetch(prev => !prev)
  }

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        selectedBoard,
        setSelectedBoard,
        activeModal,
        setActiveModal,
        selectedTask,
        setSelectedTask,
        shouldRefetch, 
        forceRefetch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalState() {
  return useContext(GlobalContext);
}
