import { MutableRefObject, useContext, useState } from "react";
import {
  StatusIndicator,
  StatusIndicatorProps
} from "@cloudscape-design/components";
import HomeContext from "../home/home.context";
import { Message } from "../types/chat";
import { MODEL_MAX_INPUT_LENGTH } from "../utils/constants";

interface Props {
  onSend: (message: Message) => void;
  stopConversationRef: MutableRefObject<boolean>;
  socketStatusType: StatusIndicatorProps.Type;
  socketStatusMessage: string;
}

export const ChatInput = ({
  onSend,
  socketStatusType,
  socketStatusMessage,
}: Props) => {
  const {
    state: { messageIsStreaming, loading },
  } = useContext(HomeContext);

  const [content, setContent] = useState<string>("");

  const handleChange = (value: any) => {
    value.preventDefault();
    if (value.target.value === "\n") {
      return;
    }
    setContent(value.target.value);
  };

  const verifyLength = () => {
    const maxLength = MODEL_MAX_INPUT_LENGTH;

    if (maxLength && content.length > maxLength) {
      alert(
        `Message limit is ${maxLength} characters. You have entered ${content.length} characters.`
      );
      return false;
    }

    return true;
  };

  const handleSend = (e: any) => {
    e.preventDefault(); 
    if (messageIsStreaming || loading || !verifyLength()) {
      return;
    }
    if (!content) {
      alert("Please enter a message");
      return;
    }
    onSend({ role: "user", content });
    setContent("");
  };

  const handleKeyDown = (key: string, shiftKey: boolean, event: any) => {
    if (key === "Enter" && !shiftKey) {
      handleSend(event);
    }
  };

  return (
    <>
      <div className="w-full p-2 bg-white rounded-b-[10px]">
        <div className="mb-1 shadow px-5">
          
        <StatusIndicator type={socketStatusType}> {socketStatusMessage} </StatusIndicator>{' '}
        </div>
        <form className="flex items-center" onSubmit={handleSend}>
          <div className="w-full relative z-0">
            <input
              id="messageArea"
              name="messageArea"
              type="text"
              className={`text-gray-900 text-sm rounded-focus:ring-blue-500 focus:outline-none focus:border-[#444BD3] block w-full p-2.5 rounded-lg border border-gray-300`}
              placeholder={"Type a message..." || ""}
              maxLength={150}
              value={content}
              disabled={messageIsStreaming || loading}
              autoComplete="off"
              spellCheck="true"
              onChange={(detail) => handleChange(detail)}
              onKeyDown={(detail) => {handleKeyDown(detail.key, detail.shiftKey, detail)}}
            />
          </div>
          <div className="mx-2 flex align-middle">
            <button
              id="messageButton"
              type="submit"
              disabled={messageIsStreaming || loading}
              className={`${
                messageIsStreaming || loading
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="#667085"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
