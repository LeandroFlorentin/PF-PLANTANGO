import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { constrainHuerta } from "../../redux/actions";
import s from "./pagination.module.css";

const Pagination = (props) => {
  const max = props.max;
  const curr = props.curr;
  const apply = props.apply;
  // const { page_count, page } = useSelector((state) => state.arrayHuerta);
  // const dispatch = useDispatch();

  const movements = {
    prev: () => (curr > 0 ? parseInt(curr) - 1 : parseInt(curr)),
    next: () => (curr < max - 1 ? parseInt(curr) + 1 : parseInt(curr)),
  };

  console.log(max, curr);

  const move = (dir) => {
    apply(movements[dir] ? movements[dir]() : dir);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "2rem",
        margin: "1rem",
      }}
    >
      {max > 1 && (
        <>
          <button onClick={() => move("prev")} style={{
            background:
              "linear-gradient(to right, #bafd4e, #79f952, #53f65b, #54f35c, #54f090, #56ed9a, #56efb4, #4ceec5)",
            marginRight: "10px",
            border: 'none',
            width: '35px',
            borderRadius: '5px',
            cursor: 'pointer',
            outline: 'none'
          }}>{"<"}</button>
          {Array(max)
            .fill("exequiel")
            .map((exequiel, index) => (
              <button
                onClick={() => move(index)}
                style={curr == index ? {
                  background:
                    "linear-gradient(to right, #bafd4e, #79f952, #53f65b, #54f35c, #54f090, #56ed9a, #56efb4, #4ceec5)",
                  margin: '0px 10px',
                  border: 'none',
                  width: '35px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  outline: 'none'
                } : {
                  margin: '0px 10px',
                  border: 'none',
                  width: '35px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {index + 1}
              </button>
            ))}
          <button onClick={() => move("next")} style={{
            background:
              "linear-gradient(to right, #bafd4e, #79f952, #53f65b, #54f35c, #54f090, #56ed9a, #56efb4, #4ceec5)",
            marginLeft: "10px",
            border: 'none',
            width: '35px',
            borderRadius: '5px',
            cursor: 'pointer',
            outline: 'none'
          }}>{">"}</button>
        </>
      )
      }
    </div >
  );
};

export default Pagination;
