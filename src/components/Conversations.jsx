import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { conversations } from "../utils/utils";
import Sidebar from "./SideBar";
import Hamburger from "hamburger-react";
import { AuthContext } from "../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const options = ["Option A", "Option B", "Option C", "Option D"];

const Conversations = () => {
  const { logout } = useContext(AuthContext);
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const setOption = (option) => {
    selectedConversation?.message?.push({ sender: "user", message: option });
    selectedConversation.conversationStarted = true;

    const dummyMessage = {
      sender: "chatbot",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra suscipit turpis, sed pellentesque arcu sollicitudin ut. Morbi metus dui, scelerisque id consectetur quis, accumsan id ipsum.",
      url: "./static/images/randompicture.png",
    };
    setLoading(true);
    setTimeout(() => {
      selectedConversation?.message?.push(dummyMessage);
      setLoading(false);
    }, 3000);
  };

  const handleInput = () => {
    if (inputValue) {
      selectedConversation.message.push({
        sender: "user",
        message: inputValue,
      });
      console.log(selectedConversation);
      setLoading(true);

      setTimeout(() => {
        selectedConversation?.message?.push({
          sender: "chatbot",
          message: "Finished",
        });
        setLoading(false);
      }, 3000);
      setInputValue("");
    }
  };
  const logOut = () => {
    logout();
  };

  const handleConversationChange = (conve) => {
    setSelectedConversation(conve);
    setOpen(false);
  };

  const sidebarToggle = () => {
    setOpen(!isOpen);
  };

  const timestamp = Date.now();
  const dateObject = new Date(timestamp);

  const formattedDate = dateObject.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex justify-between items-center p-5 shadow-md">
        <div
          onClick={() => navigate("/conversation")}
          className="rounded-md bg-[#6D31ED] text-white w-14 h-14 flex justify-center items-center text-[9px] cursor-pointer"
        >
          CHATBOT
        </div>
        <div
          onClick={logOut}
          className=" px-6 py-3 rounded-md bg-[#6D31ED]  text-white flex justify-center items-center cursor-pointer"
        >
          Logout
        </div>
      </div>
      <div className="flex p-5 gap-5">
        <Sidebar
          conversations={conversations}
          setSelectedConversation={setSelectedConversation}
          selectedConversation={selectedConversation}
          handleConversationChange={handleConversationChange}
        />
        <div className="sm:w-[70%] lg:w-full flex flex-col">
          <div className="rounded-md shadow-lg h-full">
            <div className="bg-[#15ABFF] rounded-md flex  justify-between items-center  p-3 text-white">
              <div className="flex gap-4 items-center">
                {!isOpen && (
                  <img src="./static/images/chatbot.png" alt="profimage" />
                )}
                {!isOpen && <p>Chatbot</p>}
                {isOpen && <p>Conversations</p>}
              </div>
              <div className="md:hidden flex items-center gap-5">
                {isOpen && <img src="./static/images/add.png" alt="addImage" />}
                <Hamburger
                  toggled={false}
                  onToggle={sidebarToggle}
                  hideOutline={true}
                />
              </div>
            </div>
            {isOpen ? (
              <div className="md:hidden">
                <Sidebar
                  conversations={conversations}
                  setSelectedConversation={setSelectedConversation}
                  selectedConversation={selectedConversation}
                  isOpen={isOpen}
                  handleConversationChange={handleConversationChange}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-between p-3 min-h-[62vh]">
                <div>
                  <p className="flex w-full justify-center">{formattedDate}</p>
                  {selectedConversation?.message?.map((message, indx) => (
                    <div key={indx}>
                      {message.sender === "chatbot" ? (
                        <div className="flex gap-5 items-end">
                          <img
                            className="flex justify-self-end"
                            src="./static/images/chatbot.png"
                            alt=""
                          />
                          <div className=" w-[60%] md:w-[50%]">
                            <div className="w-fit">
                              <p className="mt-4 my-3 bg-[#F0F9FF] p-2 rounded-3xl text-[#15ABFF]">
                                {message.message}
                              </p>
                              <img src={message.url} alt="" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex w-full gap-3 justify-end">
                          <div className="w-fit gap-3">
                            <p className="mt-4 bg-[#6D31ED] p-2 rounded-3xl text-white">
                              {message.message}
                            </p>
                            <img src={message.url} alt="" />
                          </div>
                          <img
                            src="./static/images/user.png"
                            alt="messageImage"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-5 items-end">
                      <img
                        className="flex justify-self-end"
                        src="./static/images/chatbot.png"
                        alt=""
                      />{" "}
                      <div className="w-fit">
                        <p className="mt-4 my-3 bg-[#F0F9FF] p-2 rounded-2xl text-[#15ABFF]">
                          <SyncLoader
                            color="#15ABFF"
                            loading={loading}
                            size={5}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            speedMultiplier={0.8}
                          />
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {!selectedConversation.conversationStarted && (
                  <div className="grid grid-cols-2 gap-1 md:flex md:gap-2">
                    {options.map((option, index) => (
                      <button
                        onClick={() => setOption(option)}
                        className={`${
                          index === 0 ? "bg-[#6D31ED] text-white" : ""
                        } rounded-3xl w-[8rem] gap-3 border-2 border-[#6D31ED] p-2`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center shadow-lg mt-2 rounded-[100px]">
            <input
              className="align-center p-3 m-4 rounded-[100px] w-full"
              placeholder="Reply to chatbot"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={() => handleInput()}
              className="w-10 h-10 rounded-[50%] mr-5 bg-[#6D31ED] flex justify-center items-center"
            >
              <img src="./static/images/message.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;