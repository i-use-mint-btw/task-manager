import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Board } from "../types";

type IProps = {
  children?: ReactNode;
};

type IGlobalContext = {
  isSidebarOpen: boolean;
  selectedBoard: Board | null
  toggleSidebar: () => void
  setSelectedBoard: Dispatch<SetStateAction<Board | null>>
};

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export function GlobalProvider({ children }: IProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)

  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar, selectedBoard, setSelectedBoard }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalState() {
  return useContext(GlobalContext);
}
