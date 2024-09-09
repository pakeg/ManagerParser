import { useEffect, useState } from "react";

export const ChatPage = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (window["WebSocket"]) {
      const socket = new WebSocket("wss://" + document.location.host + "/ws");
      socket.onclose = function (evt) {
        const item = document.createElement("div");
        item.innerHTML = "<b>socketection closed.</b>";
      };
      socket.onmessage = function (evt) {
        const messages = evt.data.split("\n");
        for (let i = 0; i < messages.length; i++) {
          const item = document.createElement("div");
          item.innerText = messages[i];
        }
      };
      setSocket(socket);
    } else {
      alert("<b>Your browser does not support WebSockets.</b>");
    }
    return () => {
      socket.onclose = socket.onmessage = null;
      socket.close(1001, "Urzytkownik się wymeldował");
    };
  }, []);

  return <div>Comments</div>;
};
