
let msgSvr = async()=>{
    console.log("server running")
}

Bun.serve({
    port:3090,
    msgServer: msgSvr(),
    fetch(req, server) {}, // upgrade logic
    websocket: {
      message(ws, message) {}, // a message is received
      open(ws) {}, // a socket is opened
      close(ws, code, message) {}, // a socket is closed
      drain(ws) {}, // the socket is ready to receive more data
    },
  });