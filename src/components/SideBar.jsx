import React from "react";

const Sidebar = ({
  conversations,
  selectedConversation,
  isOpen,
  handleConversationChange,
}) => {
  return (
    <div
      className={`w-[25%] rounded-md h-full md:block ${
        isOpen ? "w-[75%] mt-2" : "hidden"
      }`}
    >
      <div
        className={`bg-[#15ABFF] ${
          isOpen ? "hidden" : "block"
        } rounded-md flex justify-between p-5 text-white`}
      >
        <p>Conversations</p>
        <img src="./static/images/add.png" alt="prof" />
      </div>
      <div className="bg-[#F8F9FA] mt-3 min-h-[72vh] shadow-md">
        {conversations.map((conve) => (
          <div
            key={conve.id}
            onClick={() => handleConversationChange(conve)}
            className={`${
              selectedConversation?.id === conve.id
                ? "bg-[#6D31ED] text-white"
                : "bg-[#DEE1E6] text-[#171A1F]"
            } rounded-md flex justify-between p-5 my-2 cursor-pointer`}
          >
            <p>{conve.convname}</p>{" "}
            <img src="./static/images/trash.png" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;   
