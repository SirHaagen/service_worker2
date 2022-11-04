
let version= "version 2";
let cacheNueva= caches.open(version)

self.addEventListener("install", e=>{
  e.target.skipWaiting();
  //Instalo la caché:
  cacheNueva.then(cache=>cache.addAll(["067_service_worker2.html", "067_service_worker2.js", "067_service2.js"]))
  .catch(error=> console.error(error))
  console.log("Archivos agregados a la caché")
})

self.addEventListener("activate", ()=>{
  caches.keys().then(cache=>{ 
    //con caches.keys() puedo ver todos los cachés instalados
    cache.filter(cache=>{
      //filter para verificar si el caché que quiero agregar ya existe
      if(cache !== version){
        console.log("Se ha eliminado el caché antiguo");
        return caches.delete(cache); //toca caches. Si pongo cache da error
      }
    })
  })
})

self.addEventListener("fetch", e=>{
  e.respondWith(async ()=>{
    //Con el método respondWith() estoy tomando las respuestas HTTP
    let responseCache= await caches.match(e.request);
    //Con caches.match(e.request) obtenemos datos de la caché iguales a las obtenidas de la red
    if(responseCache) return responseCache; //Si hay información en caché que la entregue
    return e.request; //Si no hay respuesta en chaché, que tome las de la red
  })
})

self.addEventListener("message", e=>{
  console.log("Mensaje recibido del usuario:");
  console.log(e.data);
  e.source.postMessage("Enviando mensaje de prueba al usuario")
})


//opción que estaba en internet para verificar y eliminar caché viejo
/* self.addEventListener("activate", ()=>{
  //caches.keys().then(cache=> console.log(cache)) //Puedo ver si existe cachés creadas
  caches.keys().then(key=>{
    return Promise.all(
      key.map(cache=>{
        if(cache !== version){
          console.log("Se ha eliminado el caché antiguo");
          return caches.delete(cache);
        }
      })
    )
  })
}) */

