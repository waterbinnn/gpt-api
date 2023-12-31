import { Message, useChat } from "ai/react";
import { useCallback, useEffect, useRef } from "react";

import classNames from "classnames/bind";
import styles from "./Chat.module.scss";

const cx = classNames.bind(styles);

export function Chat() {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLUListElement | null>(null);

  const handleResizeHeight = useCallback(() => {
    if (!textRef.current) {
      return;
    }
    textRef.current.style.height = "100px";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className={cx("chat-container")}>
      <div className={cx("chat-wrap")}>
        <ul className={cx("feed")} ref={chatContainerRef}>
          {messages.map((message: Message, index: number) => {
            return (
              <li
                key={message.id + index}
                className={cx("chatting", { user: message.role === "user" })}
              >
                {message.role === "assistant" && (
                  <div className={cx("bot-icon")}></div>
                )}
                <div className={cx("multiple-chats")}>
                  {message.content
                    .split("\n")
                    .map((text: string, index: number) => {
                      if (text === "") {
                        return (
                          <p className={cx("nbsp")} key={message.id + index}>
                            &nbsp;
                          </p>
                        );
                      } else {
                        return (
                          <p
                            className={cx("chat", {
                              user: message.role === "user",
                            })}
                            key={message.id + index}
                          >
                            {text}
                          </p>
                        );
                      }
                    })}
                </div>
              </li>
            );
          })}
        </ul>

        <form onSubmit={handleSubmit} className={cx("form-wrap")}>
          <textarea
            ref={textRef}
            className={cx("message")}
            value={input}
            onChange={handleInputChange}
            onInput={handleResizeHeight}
          />
          <button className={cx("btn-send")}>
            {isLoading ? "Loading.." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
