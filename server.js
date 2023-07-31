let msgSvr = async () => {
  console.log("server running");
};

Bun.serve({
  port: 3090,
  msgServer: msgSvr(),
  async fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed :(", { status: 500 });
  },

  websocket: {
    // a message is received
    open(ws) {
      console.log("welcome");
      let data = { f_connection: true, playerId: crypto.randomUUID() };
      console.log(data);
      ws.send(JSON.stringify(data));
      ws.subscribe("room");
      //ws.close()
    },
    message(ws, message) {
      console.log("send");
      let jsonMsg = JSON.parse(message);
      if (jsonMsg.type == "type_select") {
        let updateMSG = {
          type : "type_select",
          f_connection: false,
          playerID: jsonMsg.playerID,
          playerValue: jsonMsg.playerValue,
          playerAdv: jsonMsg.playerAdv
        };
        ws.publish("room", JSON.stringify(updateMSG));
      }
      if(jsonMsg.type =="type_Game"){
        let updateMSG = {
          type : "type_Game",
          f_connection: false,
          playerID: jsonMsg.playerID,
          playerPos: jsonMsg.playerPos,
          row_case: jsonMsg.row_case,
          key: jsonMsg.key,
        };
        ws.publish("room", JSON.stringify(updateMSG));
      }
    }, // a socket is opened
    close(ws, code, message) {}, // a socket is closed
    drain(ws) {} // the socket is ready to receive more data
  }
});
