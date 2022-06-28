const socket = io(); // con el io cierro la conexion entre el servidor y el cliente
const message = document.querySelector("#message");
const actions = document.querySelector("#websocket-actions");
const send = document.querySelector("#sendMessage");
const messages = document.querySelector("#websocket-messages");
const btnCierra = document.querySelector("#btn-cierra-dialogo-chat");
const btnAbre = document.querySelector("#btn-open-chat");
const dialogoChat = document.querySelector("#dialogo-chat");


message.addEventListener("keyup", (_event) => {
  if((message.value != "")){
    eventTiping("tiping");
  }else{
    eventTiping("notiping");
  }
});


send.addEventListener("click",()=>{

  
  if(message.value.trim()!=""){
    eventNewMessage();
  }

  
});



btnAbre.addEventListener("click",()=>{
  dialogoChat.setAttribute("open","true");
 
});


btnCierra.addEventListener("click",()=>{
  dialogoChat.removeAttribute("open");
});



socket.on("chat:tiping", (data) => {
  if(data.status === "tiping"){
    actions.innerHTML=`<p>${data.user} esta escribiendo un mensaje</p>`;
  }else{
    actions.innerHTML="";
  }
});


socket.on("new:message",(data)=>{
  if(socket.id === data.idSocket){
    messages.innerHTML+=`<p class="messages-me"><span>${data.user}:</span> ${data.message}</p>`
  }else{
    messages.innerHTML+=`<p class="messages-other"><span>${data.user}:</span> ${data.message}</p>`
  }
  

});

const eventTiping = (status)=>{

  socket.emit("chat:tiping", { user: user.value, idSocket: socket.id,status:status });

}
const eventNewMessage = ()=>{

  socket.emit("new:message", { user: user.value, idSocket: socket.id,message:message.value});
  message.value="";
  eventTiping("notiping");
}
