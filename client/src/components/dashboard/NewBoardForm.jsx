import React, { useContext } from "react";
import useInput from "../../hooks/useInput";
import { BoardDispatchContext } from "../../context/board-context";
import apiClient from "../../lib/ApiClient";

const NewBoardForm = (props) => {
  const { value: title, bind: bindTitle } = useInput("");

  const { createBoard } = useContext(BoardDispatchContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    apiClient.createBoard({ title }, (data) => {
      createBoard(data.board);
      props.onCloseClick(new Event("click"));
    });
  };

  return (
    <div>
      <header>
        <span>Create Board</span>
        <a
          href="#"
          className="icon-sm icon-close"
          onClick={props.onCloseClick}
        ></a>
      </header>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <dl>
            <dt>Title</dt>
            <dd>
              <input
                type="text"
                placeholder='Like "Publishing Calendar"...'
                value={title}
                {...bindTitle}
              />
            </dd>
          </dl>
          <button className="button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBoardForm;
