
//!EJECUTAR EL CONJUNTO DE ARCHIVOS EN HTDOCS !!!!!!!!!!!!!!

let navegador= navigator.serviceWorker;

navegador.register("067_service2.js");

navegador.ready
.then(respuesta=> respuesta.active.postMessage("Enviando mensaje de prueba a SW"));

navegador.addEventListener("message", e=>{
  console.log("Mensaje recibido del SW:");
  console.log(e.data);
})