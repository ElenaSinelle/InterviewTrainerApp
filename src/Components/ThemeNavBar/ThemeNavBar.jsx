import React from "react";
import "./ThemeNavBar.scss";
import check from "../../assets/images/video_checked.svg";
import { Link } from "react-router-dom";

function ThemeNavBar({ data }) {
  return (
    <div className="theme__wrapper">
      <ul className="theme">
        {data &&
          data.map(item => {
            return (
              <li className="theme__item" key={item.id}>
                {!item.isChecked ? (
                  <Link className="theme__item_link">
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <Link className="theme__item_link">
                      {item.title}
                    </Link>
                    <div className="theme__item_div">
                      <img src={check} alt="finished" />
                    </div>
                  </>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default ThemeNavBar;
