import NotFound from "@/components/NotFound";
import React from "react";

const Messages = () => {
  return (
    <div className="h-full w-full flex flex-col items-center">
      <NotFound
        title="No Message Request Found"
        desc="try updating your profile to get more views and message request"
      />
    </div>
  );
};

export default Messages;
