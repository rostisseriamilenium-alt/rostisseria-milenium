// ======================================
// ROSTISSERIA MILENIUM v2
// PARTE 1
// ======================================

// ---------- VARIABLES ----------

let stock = 0;
let stockInicial = 0;
let stockReten = 0;

let tipoVenta = "sin";

let pollosEnteros = 0;
let mediosPollos = 0;

let vendidosSin = 0;
let vendidosCon = 0;

let pan = 0;
let canelones = 0;

let caliu = 0;
let bravas = 0;
let fritas = 0;

let historial = [];

let packPendiente = "";

// ---------- GUARDAR ----------

function guardarDatos(){

    const datos = {

        stock,
        stockInicial,
        stockReten,

        tipoVenta,

        pollosEnteros,
        mediosPollos,

        vendidosSin,
        vendidosCon,

        pan,
        canelones,

        caliu,
        bravas,
        fritas,

        historial

    };

    localStorage.setItem(
        "rostiControl",
        JSON.stringify(datos)
    );

}

// ---------- CARGAR ----------

function cargarDatos(){

    const datos = localStorage.getItem("rostiControl");

    if(!datos) return;

    const d = JSON.parse(datos);

    stock = d.stock || 0;
    stockInicial = d.stockInicial || 0;
    stockReten = d.stockReten || 0;

    tipoVenta = d.tipoVenta || "sin";

    pollosEnteros = d.pollosEnteros || 0;
    mediosPollos = d.mediosPollos || 0;

    vendidosSin = d.vendidosSin || 0;
    vendidosCon = d.vendidosCon || 0;

    pan = d.pan || 0;
    canelones = d.canelones || 0;

    caliu = d.caliu || 0;
    bravas = d.bravas || 0;
    fritas = d.fritas || 0;

    historial = d.historial || [];

}

// ---------- ACTUALIZAR ----------

function actualizar(){

    const quedan=document.getElementById("quedan");

    quedan.textContent=stock;

    if(stock<=10){

        quedan.style.color="#d62828";

    }else{

        quedan.style.color="#0d4f8b";

    }

    document.getElementById("pollosEnteros").textContent=pollosEnteros;
    document.getElementById("mediosPollos").textContent=mediosPollos;

    document.getElementById("sinEncargo").textContent=vendidosSin;
    document.getElementById("conEncargo").textContent=vendidosCon;

    document.getElementById("pan").textContent=pan;
    document.getElementById("canelones").textContent=canelones;

    document.getElementById("caliu").textContent=caliu;
    document.getElementById("bravas").textContent=bravas;
    document.getElementById("fritas").textContent=fritas;

    if(tipoVenta=="sin"){

        document.getElementById("btnSin").classList.add("activo");
        document.getElementById("btnCon").classList.remove("activo");

    }else{

        document.getElementById("btnCon").classList.add("activo");
        document.getElementById("btnSin").classList.remove("activo");

    }

}

// ---------- HISTORIAL ----------

function guardarHistorial(){

    historial.push({

        stock,

        stockInicial,
        stockReten,

        pollosEnteros,
        mediosPollos,

        vendidosSin,
        vendidosCon,

        pan,
        canelones,

        caliu,
        bravas,
        fritas,

        tipoVenta

    });

}

// ---------- TIPO DE VENTA ----------

function seleccionarTipo(tipo){

    tipoVenta=tipo;

    actualizar();
    guardarDatos();

}

// ---------- STOCK ----------

function iniciarStock(){

    let valor=parseFloat(
        document.getElementById("stockInicial").value
    );

    if(isNaN(valor)) return;

    stock=valor;
    stockInicial=valor;

    actualizar();
    guardarDatos();

}

function añadirStock(){

    let extra=parseFloat(
        document.getElementById("stockExtra").value
    );

    if(isNaN(extra) || extra<=0) return;

    stock+=extra;

    stockReten+=extra;

    document.getElementById("stockExtra").value="";

    actualizar();
    guardarDatos();

}

// ---------- CONTABILIZAR ----------

function registrarVenta(cantidad){

    if(tipoVenta=="sin"){

        vendidosSin+=cantidad;

    }else{

        vendidosCon+=cantidad;

    }

}
// ======================================
// PARTE 2
// VENTAS Y PACKS
// ======================================

// ---------- POLLO ENTERO ----------

function venderPollo(){

    if(stock<1){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    stock--;

    pollosEnteros++;

    registrarVenta(1);

    actualizar();
    guardarDatos();

}

// ---------- MEDIO POLLO ----------

function venderMedioPollo(){

    if(stock<0.5){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    stock-=0.5;

    mediosPollos++;

    registrarVenta(0.5);

    actualizar();
    guardarDatos();

}

// ---------- PRODUCTOS ----------

function venderPan(){

    guardarHistorial();

    pan++;

    actualizar();
    guardarDatos();

}

function venderCanelon(){

    guardarHistorial();

    canelones++;

    actualizar();
    guardarDatos();

}

function venderCaliu(){

    guardarHistorial();

    caliu++;

    actualizar();
    guardarDatos();

}

function venderBravas(){

    guardarHistorial();

    bravas++;

    actualizar();
    guardarDatos();

}

function venderFritas(){

    guardarHistorial();

    fritas++;

    actualizar();
    guardarDatos();

}

// ---------- PACKS ----------

function pack1(){

    if(stock<0.5){

        alert("No quedan pollos");

        return;

    }

    guardarHistorial();

    stock-=0.5;

    mediosPollos++;

    registrarVenta(0.5);

    caliu+=0.5;

    actualizar();

    guardarDatos();

}

// ---------- PACK 2 ----------

function pack2(){

    if(stock<1){

        alert("No quedan pollos");

        return;

    }

    packPendiente="pack2";

    document.getElementById(
        "selectorPatatas"
    ).style.display="block";

}

// ---------- PACK 3 ----------

function pack3(){

    if(stock<1){

        alert("No quedan pollos");

        return;

    }

    packPendiente="pack3";

    document.getElementById(
        "selectorPatatas"
    ).style.display="block";

}

// ---------- PATATAS ----------

function patataSeleccionada(tipo){

    guardarHistorial();

    document.getElementById(
        "selectorPatatas"
    ).style.display="none";

    if(tipo=="caliu") caliu++;
    if(tipo=="bravas") bravas++;
    if(tipo=="fritas") fritas++;

    stock--;

    pollosEnteros++;

    registrarVenta(1);

    pan++;

    if(packPendiente=="pack3"){

        canelones++;

    }

    packPendiente="";

    actualizar();

    guardarDatos();

}
// ======================================
// PARTE 3
// DESHACER - REINICIAR - INICIO
// ======================================

// ---------- DESHACER ----------

function deshacer(){

    if(historial.length===0){
        return;
    }

    let ultimo = historial.pop();

    stock = ultimo.stock;

    stockInicial = ultimo.stockInicial;
    stockReten = ultimo.stockReten;

    pollosEnteros = ultimo.pollosEnteros;
    mediosPollos = ultimo.mediosPollos;

    vendidosSin = ultimo.vendidosSin;
    vendidosCon = ultimo.vendidosCon;

    pan = ultimo.pan;
    canelones = ultimo.canelones;

    caliu = ultimo.caliu;
    bravas = ultimo.bravas;
    fritas = ultimo.fritas;

    tipoVenta = ultimo.tipoVenta;

    actualizar();
    guardarDatos();

}

// ---------- REINICIAR ----------

function reiniciar(){

    if(!confirm("¿Seguro que quieres reiniciar el día?")){
        return;
    }

    stock = 0;
    stockInicial = 0;
    stockReten = 0;

    pollosEnteros = 0;
    mediosPollos = 0;

    vendidosSin = 0;
    vendidosCon = 0;

    pan = 0;
    canelones = 0;

    caliu = 0;
    bravas = 0;
    fritas = 0;

    historial = [];

    document.getElementById("stockInicial").value = "";
    document.getElementById("stockExtra").value = "";

    actualizar();
    guardarDatos();

}

// ---------- CERRAR DÍA ----------

function cerrarDia(){

    alert(

`RESUMEN DEL DÍA

Stock inicial: ${stockInicial}

Retén añadido: ${stockReten}

Pollos enteros: ${pollosEnteros}

Medios pollos: ${mediosPollos}

Pan: ${pan}

Canelones: ${canelones}

Caliu: ${caliu}

Bravas: ${bravas}

Fritas: ${fritas}

Sin encargo: ${vendidosSin}

Con encargo: ${vendidosCon}

Quedan: ${stock}`

    );

}

// ---------- INICIO ----------

window.onload=function(){

    cargarDatos();

    actualizar();

};

