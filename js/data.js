/* =====================================================
   DATOS DE LA PÁGINA  (aquí editas todo)
   yt:   ID del video de YouTube (lo que va después de v=)
   file: ruta de un video propio, ej. "videos/nivel1.mp4"
   n: título   d: descripción   t: párrafos del texto desplegable
   ===================================================== */
var LEVELS = [
 {c:"#e0a030",yt:"",file:"",
  es:{n:"Imagen del santo o la Virgen",d:"Es el nivel más alto. Representa el cielo y pide permiso y protección para que las almas puedan visitarnos.",t:["Aquí va el texto completo de lo que dices en el video del primer nivel.","Puedes agregar tantos párrafos como necesites."]},
  en:{n:"Image of the saint or the Virgin",d:"The highest level. It stands for heaven and asks for permission and protection so the souls may visit us.",t:["Place the full text of what you say in the first-level video here.","Add as many paragraphs as you need."]}},
 {c:"#e58f3d",yt:"",file:"",
  es:{n:"Ánimas del purgatorio",d:"Se coloca una imagen o veladora por las almas que aún no descansan, para que encuentren su camino.",t:["Aquí va el texto completo del video del segundo nivel."]},
  en:{n:"Souls in purgatory",d:"An image or candle for the souls that have not yet found rest, so they can find their way.",t:["The full text of the second-level video goes here."]}},
 {c:"#d9654a",yt:"",file:"",
  es:{n:"La sal",d:"La sal simboliza la purificación. Ayuda a que el cuerpo del difunto no se corrompa durante su viaje.",t:["Aquí va el texto completo del video del tercer nivel."]},
  en:{n:"Salt",d:"Salt symbolizes purification. It keeps the body of the departed from corrupting on the journey.",t:["The full text of the third-level video goes here."]}},
 {c:"#c4455f",yt:"",file:"",
  es:{n:"Pan y fruta",d:"El pan de muerto y las frutas de temporada son alimento para las almas que llegan cansadas del camino.",t:["Aquí va el texto completo del video del cuarto nivel."]},
  en:{n:"Bread and fruit",d:"Pan de muerto and seasonal fruit feed the souls arriving tired from their trip.",t:["The full text of the fourth-level video goes here."]}},
 {c:"#a23a73",yt:"",file:"",
  es:{n:"El platillo favorito",d:"La comida y la bebida que más disfrutaba la persona. Es el reencuentro con los sabores de su vida.",t:["Aquí va el texto completo del video del quinto nivel."]},
  en:{n:"Their favorite dish",d:"The food and drink the person loved most, a reunion with the flavors of their life.",t:["The full text of the fifth-level video goes here."]}},
 {c:"#7a3a85",yt:"",file:"",
  es:{n:"Fotografía del difunto",d:"La foto da rostro al recuerdo. Es el lugar donde la familia dice: aquí estás, te estamos esperando.",t:["Aquí va el texto completo del video del sexto nivel."]},
  en:{n:"Photograph of the departed",d:"The photo gives the memory a face. It is where the family says: you are here, we are waiting for you.",t:["The full text of the sixth-level video goes here."]}},
 {c:"#4f3a82",yt:"",file:"",
  es:{n:"Cruz de ceniza o cal",d:"El nivel base, ligado a la tierra. La cruz señala los cuatro rumbos y ayuda a las almas a orientarse.",t:["Aquí va el texto completo del video del séptimo nivel."]},
  en:{n:"Cross of ash or lime",d:"The base level, tied to the earth. The cross marks the four directions and helps souls find their bearings.",t:["The full text of the seventh-level video goes here."]}}
];
var UI = {
 es:{brand:"El altar de muertos",title:"El altar de muertos, nivel por nivel",intro:"Un recorrido por los siete niveles del altar: qué se coloca en cada uno y qué significa. Mira el video de cada nivel y despliega el texto para leerlo completo.",cta:"Comenzar el recorrido",lvl:"Nivel",tx:"Texto completo del video",ph:"El video de este nivel estará disponible aquí",foot:"Algunas regiones y familias cambian el orden o el número de niveles."},
 en:{brand:"The Day of the Dead altar",title:"The Day of the Dead altar, level by level",intro:"A walk through the seven levels of the altar: what goes on each one and what it means. Watch the video for each level and expand the text to read it in full.",cta:"Start the tour",lvl:"Level",tx:"Full video text",ph:"The video for this level will be available here",foot:"Some regions and families change the order or the number of levels."}
};
