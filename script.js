// ===== Liste complète des événements et dates =====
const eventsDates = [
  {event:"Anschluss (Autriche)", date:"13 mars 1938"},
  {event:"Conférence de Munich / Sudètes", date:"30 septembre 1938"},
  {event:"Annexion de la Bohême-Moravie", date:"15 mars 1939"},
  {event:"Invasion de la Pologne", date:"1er septembre 1939"},
  {event:"Déclaration de guerre des alliés", date:"3 septembre 1939"},
  {event:"Drôle de guerre", date:"3 septembre 1939 - 10 mai 1940"},
  {event:"Invasion Danemark et Norvège", date:"9 avril 1940"},
  {event:"Invasion Belgique, France, Pays-Bas", date:"10 mai - 22 juin 1940"},
  {event:"Armistice franco-allemand", date:"22 juin 1940"},
  {event:"Bataille d'Angleterre", date:"10 juillet - 31 octobre 1940"},
  {event:"Italie envahit la Grèce", date:"28 octobre 1940"},
  {event:"Opération Barbarossa", date:"22 juin 1941"},
  {event:"Attaque japonaise Pearl Harbor", date:"7 décembre 1941"},
  {event:"Entrée en guerre des USA", date:"8 décembre 1941"},
  {event:"Bataille de Midway", date:"4 au 7 juin 1942"},
  {event:"Bataille de Stalingrad", date:"23 août 1942 - 2 février 1943"},
  {event:"Bataille d'El-Alamein", date:"23 octobre - 3 novembre 1942"},
  {event:"Débarquement anglo-américain Afrique du Nord", date:"8 novembre 1942"},
  {event:"Conférence de Téhéran", date:"28 novembre - 1er décembre 1943"},
  {event:"Débarquement de Provence", date:"15 août 1944"},
  {event:"Débarquement de Normandie", date:"6 juin 1944"},
  {event:"Libération de Paris", date:"25 août 1944"},
  {event:"Libération de Metz", date:"22 novembre 1944"},
  {event:"Libération de Strasbourg", date:"23 novembre 1944"},
  {event:"Bataille des Ardennes", date:"16 décembre 1944 - 25 janvier 1945"},
  {event:"Libération du camp d’Auschwitz", date:"27 janvier 1945"},
  {event:"Bataille de Berlin", date:"16 avril - 2 mai 1945"},
  {event:"Suicide d’Hitler", date:"30 avril 1945"},
  {event:"Capitulation de l’Allemagne", date:"8 mai 1945"},
  {event:"Bombardement atomique d’Hiroshima", date:"6 août 1945"},
  {event:"Bombardement atomique de Nagasaki", date:"9 août 1945"},
  {event:"Capitulation du Japon", date:"2 septembre 1945"},
  {event:"Opération Bagration", date:"22 juin - 19 août 1944"},
  {event:"Insurrection de Varsovie", date:"1er août - 2 octobre 1944"},
  {event:"Actions des Einsatzgruppen", date:"Juin 1941 - 1944"}
];

// ===== Fonction utilitaire pour mélanger un tableau =====
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

// ===== QCM =====
function generateDatesQCM(){
  const num = Number(document.getElementById('numDatesQ')?.value) || 30;
  const sel = shuffle([...eventsDates]).slice(0, Math.min(num, eventsDates.length));
  const form = document.getElementById('qcmDatesForm'); if(!form) return;
  form.innerHTML='';
  sel.forEach((item,idx)=>{
    const choices = shuffle([item.date, ...shuffle(eventsDates.filter(e=>e.date!==item.date).map(e=>e.date)).slice(0,2)]);
    const fs = document.createElement('fieldset'); fs.className='q';
    fs.innerHTML = `<legend>${idx+1}) Date de : <b>${item.event}</b> ?</legend>`;
    choices.forEach(c => fs.innerHTML += `<label><input type='radio' name='qd_${idx}' value='${c}'> ${c}</label>`);
    fs.innerHTML += `<span class='answer' id='qd_out_${idx}'></span>`;
    fs.dataset.correct = item.date; form.appendChild(fs);
  });
  form.innerHTML += `<button type='button' class='btn' onclick='gradeDatesQCM()'>Corriger le QCM</button>`;
  document.getElementById('qcmDatesScore')?.textContent='';
}

function gradeDatesQCM(){
  const sets = [...document.querySelectorAll('#qcmDatesForm fieldset')].filter(fs=>fs.dataset.correct);
  let ok=0;
  sets.forEach((fs,idx)=>{
    const chosen=fs.querySelector(`input[name="qd_${idx}"]:checked`);
    const out=document.getElementById(`qd_out_${idx}`);
    if(!chosen){out.textContent='—'; out.className='answer muted';}
    else if(chosen.value.trim()===fs.dataset.correct.trim()){ok++; out.textContent='✔'; out.className='answer ok';}
    else{out.textContent=`✖ (rép: ${fs.dataset.correct})`; out.className='answer ko';}
  });
  document.getElementById('qcmDatesScore')?.textContent = `Score : ${ok}/${sets.length}`;
}

function resetDatesQCM(){
  const form=document.getElementById('qcmDatesForm'); if(form) form.innerHTML='';
  const score=document.getElementById('qcmDatesScore'); if(score) score.textContent='';
}

// ===== RELIER =====
let selectedEvent=null;
function createMatch(){
  const container = document.getElementById('matchContainer'); if(!container) return;
  container.innerHTML='';
  const events = shuffle(eventsDates.map(m=>m.event));
  const dates = shuffle(eventsDates.map(m=>m.date));
  events.forEach(e=>{
    const div = document.createElement('div'); div.className='match-box'; div.textContent=e;
    div.onclick=()=>{selectedEvent=e; document.querySelectorAll('.match-box').forEach(b=>b.classList.remove('selected')); div.classList.add('selected');};
    container.appendChild(div);
  });
  dates.forEach(d=>{
    const div = document.createElement('div'); div.className='match-box'; div.textContent=d;
    div.onclick=()=>{
      if(selectedEvent){
        const correct = eventsDates.find(m=>m.event===selectedEvent).date;
        if(d===correct){div.style.background='#4caf50';div.style.borderColor='#4caf50';}
        else{div.style.background='#f44336';div.style.borderColor='#f44336';}
        selectedEvent=null;
        document.querySelectorAll('.match-box').forEach(b=>b.classList.remove('selected'));
      }
    };
    container.appendChild(div);
  });
}

function checkMatches(){
  const res = document.getElementById('matchResult'); if(res) res.textContent='Vérifie les couleurs : vert=correct, rouge=incorrect';
}

// ===== TEXTE À TROUS =====
function createFill(){
  const container=document.getElementById('fillContainer'); if(!container) return;
  container.innerHTML='';
  eventsDates.forEach((ed,idx)=>{
    const div=document.createElement('div');
    div.innerHTML=`${idx+1}) ${ed.event} : <input type="text" class="fill-input" id="fill${idx}" placeholder="Date"> <span id="fill_out_${idx}" class="answer"></span>`;
    container.appendChild(div);
  });
}

function normalizeDate(str){
  return str.trim().toLowerCase().replace(/\s+/g,' ').replace(/\s*-\s*/g,'-');
}

function checkFill(){
  let ok=0;
  eventsDates.forEach((ed,idx)=>{
    const input=document.getElementById(`fill${idx}`); if(!input) return;
    const out=document.getElementById(`fill_out_${idx}`);
    if(normalizeDate(input.value)===normalizeDate(ed.date)){ok++;out.textContent='✔';out.className='answer ok';}
    else{out.textContent=`✖ (rép: ${ed.date})`;out.className='answer ko';}
  });
  document.getElementById('fillResult')?.textContent = `Score : ${ok}/${eventsDates.length}`;
}

// ===== SIMULATION =====
function startSimulation(){
  generateDatesQCM();
  createMatch();
  createFill();
  alert("Simulation lancée : fais le QCM, relie les réponses et complète le texte à trous, puis vérifie chaque partie pour obtenir ton score !");
  const sim=document.getElementById('simResult'); if(sim) sim.textContent='Mode interro actif : complète tout et vérifie chaque section.';
}

// ===== Initialisation automatique si les conteneurs existent =====
window.addEventListener('load', ()=>{
  if(document.getElementById('qcmDatesForm')) generateDatesQCM();
  if(document.getElementById('fillContainer')) createFill();
  if(document.getElementById('matchContainer')) createMatch();
});
// =========================
//  TEXTE À TROUS – ANGLAIS
// =========================

const englishText = `Blue Origin's New Glenn rocket was launched on November 13, 2025. 
It carried two satellites into low Earth orbit, and its first stage landed safely at sea. 
This is important because reusing rockets makes space missions cheaper and more sustainable, which helps the future of space exploration.

The launch also shows how private companies like Blue Origin and SpaceX are pushing space technology forward. 
Their competition encourages faster progress and can lead to new opportunities, such as better satellite networks, scientific missions, and maybe space tourism.

But reusable rockets still bring challenges. 
They must be very safe, and their launches can affect the environment. 
Companies and countries need to work together to make sure future missions are responsible and secure.

Overall, New Glenn's success shows how quickly the space industry is changing and how private companies are now shaping the future of space exploration.`;

// découpes le texte en mots
function createEnglishFill() {
    const container = document.getElementById("englishFillContainer");
    container.innerHTML = "";

    const words = englishText.split(" ");

    // Choisir 12 mots à cacher
    const indexes = [];
    while (indexes.length < 12) {
        let r = Math.floor(Math.random() * words.length);
        if (!indexes.includes(r) && words[r].length > 3) indexes.push(r);
    }

    englishFillAnswers = {};

    const newWords = words.map((w, i) => {
        if (indexes.includes(i)) {
            const clean = w.replace(/[^a-zA-Z']/g, "");
            englishFillAnswers[i] = clean;
            return `<input data-id="${i}" class="fillInput">`;
        }
        return w;
    });

    container.innerHTML = newWords.join(" ");
}

function checkEnglishFill() {
    const inputs = document.querySelectorAll(".fillInput");
    let correct = 0;

    inputs.forEach(input => {
        const id = input.dataset.id;
        const answer = englishFillAnswers[id].toLowerCase();
        const value = input.value.trim().toLowerCase();

        if (value === answer) {
            input.style.background = "#9f9";
            correct++;
        } else {
            input.style.background = "#f99";
        }
    });

    document.getElementById("englishFillResult").innerHTML =
        `<h3>✔️ ${correct} / ${inputs.length} correct</h3>`;
}
