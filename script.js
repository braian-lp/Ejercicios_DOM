const d= document,
    w= window,
    n= navigator;  
   
/* Activar menu */

d.addEventListener("click", (e)=>{
    if(e.target.matches(".hamburger") || e.target.matches(".hamburger *")){
        d.querySelector(".hamburger").classList.toggle("is-active");
        d.querySelector(".menu").classList.toggle("is-active");
    }

    if(e.target.matches(".option")){
        d.querySelector(".hamburger").classList.toggle("is-active");
        d.querySelector(".menu").classList.toggle("is-active");
    }
})

/* Dark mode */

const $themeButton = d.querySelector(".dark-theme-button"),
    $selectors = d.querySelectorAll("[data-dark]"),
    $stage = d.querySelector(".stage");

    let moon ="🌙",
    sun = "☀️";

    const darkMode = ()=>{
        $selectors.forEach(el => el.classList.add("dark-mode"));
        $stage.classList.add("stage2");
        $themeButton.textContent = sun;

        ls.setItem("theme","dark");
    }

    const lightMode = ()=>{
        $selectors.forEach(el => el.classList.remove("dark-mode"));
        $stage.classList.remove("dark-mode");
        $themeButton.textContent = moon;

        ls.setItem("theme", "light");
    }

    d.addEventListener("click", (e) =>{
        if(e.target.matches(".dark-theme-button")){
            if($themeButton.textContent === moon){
                darkMode();
            }else{
                lightMode();
            }
        }
    })
/* LocalStorage mantener el tema al recargar */

const ls= localStorage;

d.addEventListener("DOMContentLoaded", (e) =>{
    if(ls.getItem("theme") === null) ls.setItem("theme","light");
    if(ls.getItem("theme") === "light") lightMode();
    if(ls.getItem("theme") === "dark") darkMode();
})


/* scroll top */

const $scrollButton = d.querySelector(".scroll-top-button");

    w.addEventListener("scroll", (e)=>{

        let scrollTop = d.documentElement.scrollTop;
        if(scrollTop > 400){
            $scrollButton.classList.remove("hidden");
        }else{
            $scrollButton.classList.add("hidden");
        }
    });
    
    d.addEventListener("click", (e)=>{
        if(e.target.matches(".scroll-top-button")){
            w.scrollTo({
                behavior:"smooth",
                top: 0
            })
            
            d.querySelector(".hamburger").classList.remove("is-active");
            d.querySelector(".menu").classList.remove("is-active");
        }
    })

/**************    EJERCICIO 1    ****************/  

let clockTempo; // variable para luego hacer un clearinterval

d.addEventListener("click", e=>{
   if(e.target.matches("#activar-reloj")){
   clockTempo = setInterval(()=>{
        let clockHour = new Date().toLocaleTimeString();
        d.querySelector("#reloj").innerHTML = `<h3>${clockHour}</h3>`;
    },1000);

    e.target.disabled = true;
   } 

   if(e.target.matches("#desactivar-reloj")){
    clearInterval(clockTempo);
    d.querySelector("#reloj").innerHTML = null;
    d.querySelector("#activar-reloj").disabled = false;
   }
});

let alarmaTempo;
const $alarm = d.createElement("audio");
$alarm.src = "assets/sonido.mp3";

d.addEventListener("click",e =>{
    if(e.target.matches("#activar-alarma")){
        alarmaTempo = setTimeout(()=>{
            $alarm.play();
        },2000)
    e.target.disabled = true
    }

    if(e.target.matches("#desactivar-alarma")){
        clearTimeout(alarmaTempo);
        $alarm.pause(); //pausamos alarma
        $alarm.currentTime = 0; // reseteamos el sonido al seg 0
        d.querySelector("#activar-alarma").disabled = false;
    }
});


/**************EJERCICIO 2****************/  

/* 
    clases de los ele
    .ball
    .stage
*/

let x=0,
    y=0;

const $ball = d.querySelector(".ball"),
    $stageCampo = d.querySelector(".stage");

d.addEventListener("keydown",(e) =>{

  let limitsBall = $ball.getBoundingClientRect(),
    limitsStage = $stage.getBoundingClientRect()

    switch (e.keyCode) {
        case 37://left
        if(limitsBall.left > limitsStage.left){
            e.preventDefault();
            x--; 
        }
            break;
        case 38://up
        if(limitsBall.top > limitsStage.top){
            e.preventDefault();
            y--;
        }
            break;
        case 39://right
        if(limitsBall.right < limitsStage.right){
            e.preventDefault();
            x++;        
        }
            break;
        case 40://down
        if(limitsBall.bottom < limitsStage.bottom){
            e.preventDefault();
            y++;
        }
            break;
    
        default:
            break;
    }
    $ball.style.transform = `translate(${x*10}px, ${y*10}px)`;
})


/**************EJERCICIO 3 ****************/  


const $countdown = d.querySelector(".countdown"),
    countdownDate = new Date("october 26, 2021 18:14:00").getTime();//Pasamos a miliseconds la fecha 

let countdownTempo = setInterval(()=>{
    let now = new Date().getTime(),//time actual en miliseconds
    limitTime= countdownDate - now,
    day = Math.floor(limitTime/(1000*60*60*24)), //pasamos los milisec a dias y redondeamos al entero bajo
    hora = ("0" + Math.floor(limitTime%(1000*60*60*24)/(1000*60*60))).slice(-2),// sacamos el resto de la divicion entre el tiempo total dividido entre la cantidad de ms en un dia, el resto los dividimos para sacar las ms a horas y redondeamos al entero bajo
    minuto =("0" + Math.floor(limitTime%(1000*60*60)/(1000*60))).slice(-2),//
    segundo =("0" + Math.floor(limitTime%(1000*60)/(1000))).slice(-2);
    
    $countdown.innerHTML= `<h3>Faltan : ${day} dias, ${hora} horas, ${minuto} minutos, ${segundo} segundos</h3>`;

    if (limitTime < 0) {
        clearInterval(countdownTempo);
        $countdown.innerHTML = `<h3> Felicidades ha llegado el momento esperado. </h3>`;
    }
},1000);

/**************** EJERCICIO 4 ***********************/
//responsive responsable
//hacemos que cuando la pag se abra en un dispositivo movil no se cargen los iframes, esto hara que es dispositivo no carge mas contenido , ahorrando datos y aumentando el rendimiento.


function responsiveMedia(id, mq, mobileContent, desktopContent){

    let breakpoint = window.matchMedia(mq); // detecta la mediaquery

    
    const responsive = (e) =>{
        if(e.matches){ // si se cumple devuelve true
            d.getElementById(id).innerHTML = desktopContent;
        }else{
            d.getElementById(id).innerHTML = mobileContent;
        }
    }

    //breakpoint.addListener(responsive);
    responsive(breakpoint);// ejecuta responsive para que al cargar las pag se cargen los contenidos
    
    breakpoint.addEventListener("change",responsive);
}

responsiveMedia("youtube", 
"(min-width :1024px)",
`<a href="https://www.youtube.com/watch?v=kDf5p7raMsc&list=RDGMEM2VCIgaiSqOfVzBAjPJm-agVMkDf5p7raMsc&start_radio=1" target = ",blank" rel="noopener">VER VIDEO</a> `, 
`<iframe width="560" height="315" src="https://www.youtube.com/embed/kDf5p7raMsc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);

responsiveMedia("gmap", 
"(min-width :1024px)",
`<a href="https://goo.gl/maps/JYbcQkosao25F3Fs8" target = ",blank" rel="noopener">VER UBICACION</a>`, 
`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.392413700287!2d-16.263994!3d28.461529149999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc41cc9d9f760159%3A0x74f0134768897b66!2sEl%20Corte%20Ingl%C3%A9s%20Tres%20de%20Mayo!5e0!3m2!1sen!2ses!4v1627472235145!5m2!1sen!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);


/**************** EJERCICIO 5 ***********************/

const $form = d.getElementById("responsive-tester");


let tester;

d.addEventListener("click", (e)=>{
    if(e.target === $form.probar){
        e.preventDefault();

        tester = window.open(
            $form.direccion.value,
            "tester",
            `innerWidth =${$form.ancho.value}, innerHeight = ${$form.alto.value}`
        );
    }
});

d.addEventListener("click", (e)=>{
    if(e.target === $form.cerrar){
        tester.close();
    }
});

/**************** EJERCICIO 6  ***********************/

//User Agent

const ua = n.userAgent;

const $id = d.getElementById("data-dispositivo"),
    isMobile = {
        android: () => ua.match(/android/i),
        ios: () => ua.match(/iphone|ipad|ipod/i),
        any: function (){
            return this.android() || this.ios();}
    },
    isDesktop = {
        linux: ()=> ua.match(/linux/i),
        mac: ()=> ua.match(/mac os/i),
        windows: () => ua.match(/windows nt/i),
        any: function (){
            return this.linux() || this.mac() || this.windows();
        }
    },
    isBrowser = {
        chrome: ()=> ua.match(/chrome/i),
        safari: () => ua.match(/safari/i),
        edge: () => ua.match(/edge/i),
        any: function(){
            return this.chrome() || this.safari() || this.edge();
        }
    }
    
    $id.innerHTML = `
    <ul style="list-style: none">
        <li>User Agent: <b> ${ua} </b></li>
        <li>Plataforma: <b> ${isMobile.any()?isMobile.any():isDesktop.any()}</b></li>
        <li>Navegador: <b> ${isBrowser.any()} </b></li>
    </ul>
    `
//Contenido exclusivo

if(isBrowser.chrome()){
    $id.innerHTML += `<p><mark> Este contenido solo se ve en Chrome</mark></p>`;
}
if(isBrowser.edge()){
    $id.innerHTML += `<p><mark> Este contenido solo se ve en Edge</mark></p>`;
}
/* if(isBrowser.safari()){
    $id.innerHTML += `<p><mark> Este contenido solo se ve en Safari</mark></p>`;
} */
if(isDesktop.linux()){
    $id.innerHTML += `<p><mark> Este contenido solo se ve en LINUX</mark></p>`;
}
if(isDesktop.windows()){
    $id.innerHTML += `<p><mark> Este contenido solo se ve en WNDOWS</mark></p>`;
}

//Redirecciones Al abrir la pagina en un dispositivo en especifico

/* if(isMobile.android()){
    window.location.href = "https://www.youtube.com/results?search_query=hoja+en+blanco&sp=CAM%253D";
} 
if(isMobile.ios()){
    window.location.href = "https://www.youtube.com/watch?v=WQFbn-sJj8I"
} */

/**************** EJERCICIO 7  ***********************/

const isOnline = ()=>{
    const $div = d.createElement("div");
    if(n.onLine){
        $div.textContent = "Conexion Reestablecida";
        $div.classList.add("online");
        $div.classList.remove("offline");
    }else{
        $div.textContent = "Conexion Perdida";
        $div.classList.add("offline");
        $div.classList.remove("online");
    }
    d.body.insertAdjacentElement("afterbegin", $div);
    setTimeout(()=>{
        d.body.removeChild($div)
    },2000);
}

w.addEventListener("online",(e) => {
    isOnline();
});
w.addEventListener("offline",(e) => {
    isOnline();
});


/**************** EJERCICIO 8  ***********************/

const $video = d.getElementById("cam");

if (n.mediaDevices.getUserMedia) {
  n.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      $video.srcObject = stream;
      $video.play();
    })
    .catch((err) => {
      $video.insertAdjacentHTML(
        "beforebegin",
        `<p>Sucedio el siguiente error! :
            <mark>${err}</mark></p>`
      );
      console.log(`Sucedio el siguiente error!: ${err}`);
    });
}


/**************** EJERCICIO 9  ***********************/

const $idgeo = d.getElementById("geolocation"),
    $ubi =d.getElementById("ubicacionActual"),
    options ={
        enableHighAccuracy: true,//mejor precicion posible
        timeout: 5000,//tiempo de espera para recibir la respuesta
        maximumAge: 0//
    };
    const success = (position) =>{
        let coords = position.coords;
        console.log(typeof(coords.latitude));
        $idgeo.innerHTML =`
            <p>Tu posicion actual es: </p>
            <ul style="list-style : none">
                <li>Latitud <b>${coords.latitude}</b></li>
                <li>longitud <b>${coords.longitude}</b></li>
                <li>Precision <b>${coords.accuracy}</b> metros</li>
            </ul>
            <a href = "https://www.google.com/maps/@${coords.latitude},${coords.longitude},15z" target="_blank" rel="noopener">Ver en google Maps</a>  
        `;
      
         //iframe de google maps con unas coordenadas especificas
        $ubi.innerHTML = `<iframe src="http://maps.google.com/maps?q=${coords.latitude}, ${coords.longitude}&z=15&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`; 
    }


    const error = (err) =>{
        $idgeo.innerHTML=`<p><mark> Error ${err.code}: ${err.message}</mark></p>`;
        console.log(`Error ${err.code}: ${err.message}`);
    }

    n.geolocation.getCurrentPosition(success, error, options);

/**************** EJERCICIO 10  ***********************/


d.addEventListener("keyup", (e)=>{
    if(e.target.matches(".card-filter")){
        if(e.key === "Escape"){e.target.value = "";}
        d.querySelectorAll(".card").forEach(el =>
            el.textContent.toLowerCase().includes(e.target.value)?
            el.classList.remove("filter"):el.classList.add("filter")
        );
    }
})

/**************** EJERCICIO 11  ***********************/

const getWinner = () =>{
    const $players = d.querySelectorAll(".player"),
    random =Math.floor(Math.random() * $players.length),
    winner = $players[random];

    return `El ganador: ${winner.textContent}`;
}

d.addEventListener("click", (e)=>{
    if(e.target.matches("#winner-btn")){
        let result = getWinner();
        alert(result);
    }
})

/**************** EJERCICIO 12  ***********************/

const $nextBtn = d.querySelector(".sliders-btns .next"),
    $prevBtn = d.querySelector(".sliders-btns .prev"),
    $slides = d.querySelectorAll(".slider-slide");

let i= 0;

//timer

function avance(){
    $slides[i].classList.remove("active");
        i++;

        if(i >= $slides.length){
            i=0;
        }

        $slides[i].classList.add("active");
}

const timer = setInterval(avance,4000);

d.addEventListener("click", (e)=>{
    if(e.target === $prevBtn){
        e.preventDefault(); 
        
        $slides[i].classList.remove("active");
        i--;

        if(i<0){
            i = $slides.length - 1
        }

        $slides[i].classList.add("active")
    }

    if(e.target === $nextBtn){
        e.preventDefault();
        avance();
    }
});

/**************** ScrollSpy ***********************/
const $sections = d.querySelectorAll("section[data-scroll-spy]")

const cb = (entries)=>{

    entries.forEach((entry) =>{
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
            d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.add("active");
        }else{
            d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.remove("active");
        }
    })
};

const observer = new IntersectionObserver(cb, {
    //root
    //root-margin
    //threshold: [0.7, 0.9], min y max
    threshold: [0.4]
});

$sections.forEach((el) =>{
    observer.observe(el);
});
