import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./sidebar.module.css";
import { faEyeSlash, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import ToggleButton from "../toggle-button/ToggleButton";
import { useState } from "react";
import BoardInfo from "../board-info/BoardInfo";
import { Board } from "../../types";
import CreateBoardButton from "../create-board-button/CreateBoardButton";

interface IProps {
  boards: Board[];
  toggle: () => void;
  selectedBoardID: number;
  onBoardInfoClick: (id: number) => undefined;
  onCreateNewBoardClick: () => void
}

export default function Sidebar(props: IProps) {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);

  function handleDarkModeToggle() {
    setIsDarkModeEnabled((prev) => !prev);
  }

  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.sidebarLogoContainer}>
          {/* supposed to render the site logo here */}
          {<h1 className={styles.sidebarTitle}>Kanban</h1>}
        </div>
        <p className={styles.boardCounter}>
          All Boards ({props.boards.length})
        </p>
        <div className={styles.mainSidebarContentContainer}>
          <div className={styles.mainBoardInfoContainer}>
            {props.boards.map((board: Board, i: number) => {
              if (i === props.selectedBoardID) {
                return (
                  <BoardInfo
                    id={i}
                    key={i}
                    title={board.title}
                    onClick={props.onBoardInfoClick}
                    selected={true}
                  />
                );
              }
              return (
                <BoardInfo
                  id={i}
                  key={i}
                  title={board.title}
                  onClick={props.onBoardInfoClick}
                  selected={false}
                />
              );
            })}
            <CreateBoardButton onClick={props.onCreateNewBoardClick} />
          </div>
          <div className={styles.sidebarButtonsContainer}>
            <div className={styles.darkModeToggleContainer}>
              <div>
                <FontAwesomeIcon
                  className={styles.lightModeIcon}
                  icon={faSun}
                />
                <ToggleButton
                  onClick={handleDarkModeToggle}
                  enabled={isDarkModeEnabled}
                  bgColor="#645fc6"
                />
                <FontAwesomeIcon
                  className={styles.darkModeIcon}
                  icon={faMoon}
                />
              </div>
            </div>
            <div className={styles.hideSidebarButtonContainer}>
              <button
                className={styles.hideSidebarButton}
                onClick={props.toggle}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
                <p>Hide Sidebar</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
