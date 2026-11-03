/* =====================================================
   CHATBOT DEL ALTAR (sin servidor)
   Busca palabras clave en la pregunta y responde con los
   textos de KB. Para agregar respuestas, añade un bloque:
   { k:["palabra1","palabra2"], es:"...", en:"..." }
   ===================================================== */
(function () {
  var KB = [
    { k:["hola","buenas","hello","hi","hey"],
      es:"¡Hola! Pregúntame lo que quieras sobre el altar de muertos: niveles, ofrendas, flores, fechas…",
      en:"Hello! Ask me anything about the Day of the Dead altar: levels, offerings, flowers, dates…" },
    { k:["cuantos niveles","niveles tiene","levels","how many"],
      es:"Hay altares de 2, 3 o 7 niveles. Dos representan cielo y tierra; tres suman el inframundo; siete representan los pasos del alma para llegar al descanso. Aquí explicamos el de 7.",
      en:"Altars can have 2, 3 or 7 levels. Two stand for heaven and earth; three add the underworld; seven represent the steps of the soul toward rest. This site covers the 7-level one." },
    { k:["cempasuchil","flor","flores","marigold","flower"],
      es:"La flor de cempasúchil guía a las almas con su color intenso y su aroma. Se usa en arcos, caminos y alrededor del altar.",
      en:"The cempasúchil (marigold) guides souls with its vivid color and scent. It is used in arches, paths and around the altar." },
    { k:["copal","incienso","incense","humo"],
      es:"El copal y el incienso purifican el espacio y su humo sirve de guía para las almas.",
      en:"Copal and incense cleanse the space, and their smoke guides the souls." },
    { k:["veladora","vela","velas","luz","candle","candles","light"],
      es:"Las velas son la luz que ilumina el camino de regreso de las almas. Se acostumbra una por cada difunto.",
      en:"Candles light the souls’ way back. It is customary to place one for each departed person." },
    { k:["papel picado","picado","cut paper"],
      es:"El papel picado representa el viento y la fragilidad de la vida.",
      en:"Papel picado stands for the wind and the fragility of life." },
    { k:["agua","vaso","water","glass","sed"],
      es:"Se coloca un vaso de agua para calmar la sed de las almas después del largo viaje.",
      en:"A glass of water quenches the souls’ thirst after the long journey." },
    { k:["pan de muerto","pan","bread"],
      es:"El pan de muerto se coloca en el cuarto nivel. Sus “huesitos” y su forma redonda recuerdan el ciclo de la vida y la muerte.",
      en:"Pan de muerto goes on the fourth level. Its “bones” and round shape recall the cycle of life and death." },
    { k:["calavera","calaveras","azucar","skull","sugar"],
      es:"Las calaveras de azúcar representan a los difuntos y se decoran con sus nombres. Recuerdan, con alegría, que la muerte es parte de la vida.",
      en:"Sugar skulls represent the departed and are decorated with their names, a cheerful reminder that death is part of life." },
    { k:["perro","xolo","xoloitzcuintle","dog"],
      es:"Según la tradición, el perro xoloitzcuintle acompañaba a las almas a cruzar el río del Mictlán.",
      en:"By tradition, the xoloitzcuintle dog accompanied souls across the river of Mictlán." },
    { k:["cuando","fecha","dia","noviembre","when","date","november"],
      es:"Se celebra el 1 y 2 de noviembre. El 1 se recuerda a los niños (Día de los Angelitos) y el 2 a los adultos.",
      en:"It is celebrated on November 1 and 2. The 1st honors children (Día de los Angelitos) and the 2nd honors adults." },
    { k:["origen","historia","mictlan","prehispanico","origin","history","aztec"],
      es:"La tradición mezcla creencias prehispánicas, como el viaje al Mictlán, con elementos católicos llegados tras la Conquista.",
      en:"The tradition blends pre-Hispanic beliefs, such as the journey to Mictlán, with Catholic elements brought after the Conquest." },
    { k:["que debo poner","que se pone","ofrenda","poner","what to put","offering"],
      es:"Lo básico: foto del difunto, velas, cempasúchil, copal, agua, sal, pan, fruta y su comida favorita. Revisa los niveles de la página para ver cada uno.",
      en:"The basics: a photo, candles, cempasúchil, copal, water, salt, bread, fruit and their favorite food. See the levels on this page for each one." }
  ];
  var LEVEL_KEYS = [
    ["primer nivel","nivel 1","santo","virgen","first level","level 1","saint"],
    ["segundo nivel","nivel 2","animas","purgatorio","second level","level 2","purgatory"],
    ["tercer nivel","nivel 3","sal","salt","third level","level 3"],
    ["cuarto nivel","nivel 4","fruta","fourth level","level 4","fruit"],
    ["quinto nivel","nivel 5","platillo","comida favorita","fifth level","level 5","favorite dish"],
    ["sexto nivel","nivel 6","fotografia","foto","sixth level","level 6","photograph","photo"],
    ["septimo nivel","nivel 7","cruz","ceniza","cal","seventh level","level 7","cross","ash","lime"]
  ];
  var T = {
    es:{title:"Pregunta sobre el altar",sub:"Respuestas rápidas",open:"Preguntas",close:"Cerrar chat",ph:"Escribe tu pregunta…",send:"Enviar",
        hello:"¡Hola! Soy el asistente del altar de muertos. ¿Qué te gustaría saber?",
        fallback:"No encontré una respuesta a eso. Prueba con: niveles, cempasúchil, copal, velas, pan de muerto, fechas u origen.",
        sug:["¿Cuántos niveles tiene?","¿Qué es el cempasúchil?","¿Cuándo se celebra?","¿Qué debo poner?"]},
    en:{title:"Ask about the altar",sub:"Quick answers",open:"Questions",close:"Close chat",ph:"Type your question…",send:"Send",
        hello:"Hi! I’m the Day of the Dead altar assistant. What would you like to know?",
        fallback:"I couldn’t find an answer to that. Try: levels, marigold, copal, candles, pan de muerto, dates or origin.",
        sug:["How many levels are there?","What is cempasúchil?","When is it celebrated?","What should I put on it?"]}
  };
  function norm(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[¿?¡!.,]/g," ");}
  function cl(){return document.documentElement.lang==="en"?"en":"es";}
  function answer(q){
    var text=" "+norm(q)+" ",best=null,top=0,l=cl(),entries=KB.slice();
    LEVELS.forEach(function(L,i){entries.push({k:LEVEL_KEYS[i]||[],es:L.es.n+": "+L.es.d,en:L.en.n+": "+L.en.d});});
    entries.forEach(function(e){
      var s=0;
      e.k.forEach(function(kw){var k=norm(kw);if(k.length<=4?text.indexOf(" "+k+" ")>-1:text.indexOf(k)>-1)s+=k.length;});
      if(s>top){top=s;best=e;}
    });
    return best?best[l]:T[l].fallback;
  }
  var root=document.createElement("div");
  root.innerHTML=
    '<button class="cb-toggle" id="cb-toggle" aria-expanded="false" aria-controls="cb-panel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg><span id="cb-open-label"></span></button>'+
    '<section class="cb-panel" id="cb-panel" role="dialog" aria-labelledby="cb-title"><div class="cb-head"><div><strong id="cb-title"></strong><small id="cb-sub"></small></div><button class="cb-close" id="cb-close" type="button">×</button></div>'+
    '<div class="cb-msgs" id="cb-msgs" aria-live="polite"></div><div class="cb-sug" id="cb-sug"></div>'+
    '<form class="cb-form" id="cb-form"><input id="cb-input" type="text" autocomplete="off"><button class="cb-send" id="cb-send" type="submit"></button></form></section>';
  document.body.appendChild(root);
  var el=function(id){return document.getElementById(id);};
  var panel=el("cb-panel"),msgs=el("cb-msgs"),input=el("cb-input"),toggle=el("cb-toggle");
  function add(t,who){var d=document.createElement("div");d.className="cb-msg "+who;d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;}
  var hist=[];
  function getReply(q){
    if(typeof CHAT_ENDPOINT==="undefined"||!CHAT_ENDPOINT)return Promise.resolve(answer(q));
    return fetch(CHAT_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message:q,lang:cl(),history:hist.slice(-6)})})
    .then(function(r){if(!r.ok)throw new Error(r.status);return r.json();})
    .then(function(d){if(!d.reply)throw new Error("empty");return d.reply;})
    .catch(function(){return answer(q);});   /* si la IA falla, responde con la base local */
  }
  function ask(q){
    q=q.trim();if(!q)return;add(q,"me");
    var w=document.createElement("div");w.className="cb-msg bot";w.textContent="…";msgs.appendChild(w);msgs.scrollTop=msgs.scrollHeight;
    getReply(q).then(function(a){w.textContent=a;hist.push({role:"user",content:q},{role:"assistant",content:a});msgs.scrollTop=msgs.scrollHeight;});
  }
  function labels(){
    var t=T[cl()];
    el("cb-open-label").textContent=t.open;el("cb-title").textContent=t.title;el("cb-sub").textContent=t.sub;
    el("cb-close").setAttribute("aria-label",t.close);el("cb-send").textContent=t.send;
    input.placeholder=t.ph;input.setAttribute("aria-label",t.ph);el("cb-sug").innerHTML="";
    t.sug.forEach(function(s){var b=document.createElement("button");b.type="button";b.textContent=s;b.addEventListener("click",function(){ask(s);});el("cb-sug").appendChild(b);});
  }
  function reset(){msgs.innerHTML="";hist=[];add(T[cl()].hello,"bot");labels();}
  function setOpen(o){panel.classList.toggle("open",o);toggle.setAttribute("aria-expanded",o);if(o)input.focus();}
  toggle.addEventListener("click",function(){setOpen(!panel.classList.contains("open"));});
  el("cb-close").addEventListener("click",function(){setOpen(false);toggle.focus();});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")setOpen(false);});
  el("cb-form").addEventListener("submit",function(e){e.preventDefault();ask(input.value);input.value="";});
  document.addEventListener("langchange",reset);
  reset();
})();
