import React from "react";
import { Icon } from "@iconify/react";
import "../../SCSS/MainPage/Dashboard.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressSlide from "./ProgressSlide";
import FavoriteSlide from "./FavoriteSlide";

export default function Dashboard() {
  let userState = useSelector((store) => store.userReducer);
  let loginData = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="dashboard">
      <div className="dashboard__wrap">
        <div className="dashboard__background">
          <div className="row1">
            <div className="row1__user">
              <Icon className="user__image" icon="bi:person-circle" />
              <div className="user__name">
                {loginData === null ? "guest" : loginData.username}
              </div>
              {loginData === null ? null : (
                <div className="user__level">
                  {"Lv." + userState.intraLevel}
                </div>
              )}
            </div>
            <div className="row1__button">
              <Link className="icon__link" to="/profile/edit">
                <Icon icon="akar-icons:edit" />
              </Link>
            </div>
          </div>
          <div className="row2">
            <div className="row2__box1">
              <div className="box1__column1">
                <div className="column1__job">직업</div>
                <div className="column1__level">레벨</div>
                <div className="column1__skill">보유 스킬</div>
              </div>
              <div className="box1__column2">
                <div className="column2__job">
                  {loginData === null ? null : userState.work}
                </div>
                <div className="column2__level">
                  {loginData === null ? null : userState.level}
                </div>
                <div className="column2__skill">
                  {loginData === null
                    ? null
                    : userState.skill.map((e, idx) => {
                        return <img key={idx} alt={"badge" + idx} src={e} />;
                      })}
                </div>
              </div>
            </div>
            <div className="row2__box2">
              <div className="box2__title">진행중인 프로젝트</div>
              <div className="box2__slides">
                {loginData === null ? null : <ProgressSlide />}
              </div>
            </div>
            <div className="row2__box3">
              <div className="box3__title">관심있는 프로젝트</div>
              <div className="box3__slides">
                {loginData === null ? null : <FavoriteSlide />}
              </div>
            </div>
          </div>
          <div className="row3">
            <div className="row3__reportbox">
              <div className="reportbox__report">
                <Link className="dashboard__project__link1" to="/allproject">
                  42
                </Link>
                개의 프로젝트가{" "}
                <Link className="dashboard__project__link2" to="/allproject">
                  진행중
                </Link>
                이고{" "}
                <Link className="dashboard__project__link3" to="/allproject">
                  142
                </Link>
                개의 프로젝트가{" "}
                <Link className="dashboard__project__link4" to="/allproject">
                  완료
                </Link>
                되었어요
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
