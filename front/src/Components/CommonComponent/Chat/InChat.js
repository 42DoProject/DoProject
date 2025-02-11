import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import "../../../SCSS/Common/Chat/InChat.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatCard from "./ChatCard";
import socket from "../../../socket";
import { Example as Popup } from "./PopUp";
import Conv from "./INChatConv";

function InChat({
  chatRoom,
  clickFlag,
  setClickFlag,
  setInFlag,
  chatOutFlag,
  setChatOutFlag,
}) {
  let loginState = useSelector((state) => state.loginReducer);
  const [chat, setChat] = useState();
  const [inviteFlag, setInviteFlag] = useState(0);
  const [userList, setUserList] = useState(
    chatRoom.users.filter((e) => e.id !== loginState.id)
  );
  const getChat = async (uuid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HTTP_ENV}://${process.env.REACT_APP_BACKEND_DOMAIN}/chat/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${loginState?.accessToken}`,
          },
        }
      );
      setChat(data);
      const inChat__bodyEl = document.querySelector(".inChat__body");
      if (inChat__bodyEl)
        inChat__bodyEl.scrollTop = inChat__bodyEl.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  };
  const getChatMore = async (uuid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HTTP_ENV}://${process.env.REACT_APP_BACKEND_DOMAIN}/chat/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${loginState?.accessToken}`,
          },
        }
      );
      if (data.length)
        await getChatBeforeMore(chatRoom.uuid, data[0].date, data);
      const inChat__bodyEl = document.querySelector(".inChat__body");
      inChat__bodyEl.scrollTop = inChat__bodyEl.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  };
  const getChatBeforeMore = async (uuid, date, chatLog) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HTTP_ENV}://${process.env.REACT_APP_BACKEND_DOMAIN}/chat/${uuid}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${loginState?.accessToken}`,
          },
        }
      );
      setChat([...data, ...chatLog]);
    } catch (err) {
      console.log(err);
    }
  };
  const getChatBefore = async (uuid, date) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HTTP_ENV}://${process.env.REACT_APP_BACKEND_DOMAIN}/chat/${uuid}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${loginState.accessToken}`,
          },
        }
      );
      const inChat__bodyEl = document.querySelector(".inChat__body");
      const inChat_Before = inChat__bodyEl.scrollHeight;
      setChat([...data, ...chat]);
      const inchat__bodyEl2 = document.querySelector(".inChat__body");
      inchat__bodyEl2.scrollTop = inchat__bodyEl2.scrollHeight - inChat_Before;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getChatMore(chatRoom.uuid);
  }, [loginState]);

  useEffect(() => {
    const inChat__bodyEl = document.querySelector(".inChat__body");
    const handleScrollTop = () => {
      if (inChat__bodyEl.scrollTop === 0) {
        getChatBefore(chatRoom.uuid, chat[0].date);
      }
    };
    inChat__bodyEl.addEventListener("scroll", handleScrollTop);
    socket.on("chat:leave", () => {
      if (userList.length === 1) setUserList([]);
      getChat(chatRoom.uuid);
    });
    socket.on("chat:receive", (payload) => {
      chatRoom.uuid === payload.uuid && getChat(chatRoom.uuid);
    });
    return () => {
      inChat__bodyEl.removeEventListener("scroll", handleScrollTop);
      socket.off("chat:receive");
      socket.off("chat:leave");
    };
  }, [chat, chatRoom, loginState]);

  useEffect(() => {
    const $input = document.querySelector(".inChat__input-small input");
    $input?.focus();
  }, []);
  return (
    <>
      <div className="inChat">
        <div className="inChat__header">
          <div className="back" onClick={() => setInFlag(-1)}>
            <Icon icon="dashicons:arrow-left-alt2" fontSize="2rem" />
          </div>
          {clickFlag === 0 ? (
            <Icon
              className="nav__resize-up"
              icon="si-glyph:resize-out-frame"
              hFlip="true"
              fontSize="1.5rem"
              onClick={() => {
                let chatLogEl = document.querySelector(".chatLog");
                chatLogEl.style.width = "80vw";
                chatLogEl.style.height = "90vh";
                setClickFlag(1);
              }}
            />
          ) : (
            <Icon
              className="nav__resize-down"
              icon="si-glyph:resize-in-frame"
              fontSize="1.3rem"
              hFlip="true"
              onClick={() => {
                let chatLogEl = document.querySelector(".chatLog");
                chatLogEl.style.width = "22rem";
                chatLogEl.style.height = "40rem";
                setClickFlag(0);
              }}
            />
          )}
          <div className="name">
            {clickFlag
              ? userList.map((e, idx) => <span key={idx}>{e.username}</span>)
              : userList.map((e, idx) => {
                  if (userList.length <= 2)
                    return <span key={idx}>{e.username}</span>;
                  else {
                    if (idx === 0)
                      return (
                        <span key={idx}>{`${e.username} - 외 ${
                          userList.length - 1
                        }`}</span>
                      );
                    return "";
                  }
                })}
          </div>
          <Popup
            uuid={chatRoom.uuid}
            chatOutFlag={chatOutFlag}
            setChatOutFlag={setChatOutFlag}
            setInFlag={setInFlag}
            setInviteFlag={setInviteFlag}
          />
          <div
            className="close"
            onClick={() => {
              let chatEl = document.querySelector(".chat");
              let chatLogEl = document.querySelector(".chatLog");
              chatEl.style.visibility = "visible";
              chatLogEl.style.visibility = "hidden";
              setInFlag(-1);
            }}>
            <Icon icon="bx:bx-x" fontSize="2rem" />
          </div>
        </div>
        {inviteFlag === 1 && (
          <Conv
            setInviteFlag={setInviteFlag}
            clickFlag={clickFlag}
            chatRoom={chatRoom}
            chatOutFlag={chatOutFlag}
            setChatOutFlag={setChatOutFlag}
            setInFlag={setInFlag}
          />
        )}
        <div className="inChat__body">
          <div className="empty-msg"></div>
          {chat &&
            chat.map((e, idx) => {
              let imgFlag = 1;
              if (idx && chat[idx - 1].userId === chat[idx].userId) imgFlag = 0;
              if (e.userId === -1) imgFlag = 0;
              return <ChatCard key={e.date} chatInfo={e} imgFlag={imgFlag} />;
            })}
          <div className="empty-msg-bottom"></div>
        </div>
        {userList.length !== 0 && (
          <div className="inChat__input-small">
            <input
              placeholder="메세지 입력..."
              spellCheck="false"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (e.target.value.length) {
                    socket.emit("chat:send", {
                      uuid: chatRoom.uuid,
                      message: e.target.value,
                    });
                    e.target.value = "";
                  }
                }
              }}></input>
            <div
              className="input__send"
              onClick={() => {
                const input = document.querySelector(
                  ".inChat .inChat__input-small input"
                );
                if (input.value.length) {
                  socket.emit("chat:send", {
                    uuid: chatRoom.uuid,
                    message: input.value,
                  });
                  input.value = "";
                }
              }}>
              보내기
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default React.memo(InChat);
