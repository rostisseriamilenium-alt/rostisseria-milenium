// ==========================================
// ROSTISSERIA MILENIUM v2.0
// PARTE 1
// ==========================================

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

    localStorage.setItem(
        "rostisseria",
        JSON.stringify({

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

        })

    );

}

// ---------- CARGAR ----------

function cargarDatos(){

    let datos = localStorage.getItem("rostisseria");

    if(!datos) return;

    let d = JSON.parse(datos);

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

// ---------- HISTORIAL ----------

function guardarHistorial(){

    historial.push({

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
        fritas

    });

}

// ---------- ACTUALIZAR ----------

function actualizar(){

    const quedan = document.getElementById("quedan");

    quedan.textContent = stock;

    if(stock<=10){

        quedan.style.color="#d62828";

    }else{

        quedan.style.color="#0d4f8b";

    }

    document.getElementById("pollosEnteros").textContent = pollosEnteros;
    document.getElementById("mediosPollos").textContent = mediosPollos;

    document.getElementById("sinEncargo").textContent = vendidosSin;
    document.getElementById("conEncargo").textContent = vendidosCon;

    document.getElementById("pan").textContent = pan;
    document.getElementById("canelones").textContent = canelones;
    document.getElementById("caliu").textContent = caliu;
    document.getElementById("bravas").textContent = bravas;
    document.getElementById("fritas").textContent = fritas;

}

// ---------- TIPO VENTA ----------

function seleccionarTipo(tipo){

    tipoVenta = tipo;

    document.getElementById("btnSin").classList.remove("activo");
    document.getElementById("btnCon").classList.remove("activo");

    if(tipo=="sin"){

        document.getElementById("btnSin").classList.add("activo");

    }else{

        document.getElementById("btnCon").classList.add("activo");

    }

    guardarDatos();

}

// ---------- STOCK ----------

function iniciarStock(){

    let valor = parseFloat(
        document.getElementById("stockInicial").value
    );

    if(isNaN(valor)) return;

    stock = valor;
    stockInicial = valor;

    actualizar();
    guardarDatos();

}

function añadirStock(){

    let extra = parseFloat(
        document.getElementById("stockExtra").value
    );

    if(isNaN(extra) || extra<=0) return;

    stock += extra;
    stockReten += extra;

    document.getElementById("stockExtra").value="";

    actualizar();
    guardarDatos();

}
// ==========================================
// PARTE 2
// VENTAS Y PACKS
// ==========================================

// ---------- SUMAR VENTA ----------

function sumarVenta(cantidad){

    if(tipoVenta=="sin"){
        vendidosSin += cantidad;
    }else{
        vendidosCon += cantidad;
    }

}

// ---------- POLLO ENTERO ----------

function venderPollo(){

    if(stock<1){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    stock--;

    pollosEnteros++;

    sumarVenta(1);

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

    sumarVenta(0.5);

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

// ---------- PACK 1 ----------

function pack1(){

    if(stock<0.5){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    stock-=0.5;

    mediosPollos++;

    sumarVenta(0.5);

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

    if(packPendiente=="pack2"){

        stock--;

        pollosEnteros++;

        pan++;

        sumarVenta(1);

    }

    if(packPendiente=="pack3"){

        stock--;

        pollosEnteros++;

        pan++;

        canelones++;

        sumarVenta(1);

    }

    packPendiente="";

    actualizar();
    guardarDatos();

}
// ==========================================
// PARTE 3
// DESHACER - REINICIAR - CERRAR DÍA
// ==========================================

// ---------- DESHACER ----------

function deshacer(){

    if(historial.length===0){
        return;
    }

    let ultimo = historial.pop();

    stock = ultimo.stock;
    stockInicial = ultimo.stockInicial;
    stockReten = ultimo.stockReten;

    tipoVenta = ultimo.tipoVenta;

    pollosEnteros = ultimo.pollosEnteros;
    mediosPollos = ultimo.mediosPollos;

    vendidosSin = ultimo.vendidosSin;
    vendidosCon = ultimo.vendidosCon;

    pan = ultimo.pan;
    canelones = ultimo.canelones;
    caliu = ultimo.caliu;
    bravas = ultimo.bravas;
    fritas = ultimo.fritas;

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

    document.getElementById("stockInicial").value="";
    document.getElementById("stockExtra").value="";

    seleccionarTipo("sin");

    actualizar();
    guardarDatos();

}

// ---------- CERRAR DÍA ----------

function cerrarDia(){

    alert(

`RESUMEN DEL DÍA

Stock inicial: ${stockInicial}

Retén: ${stockReten}

Total disponibles: ${stockInicial + stockReten}

-------------------------

Pollos enteros: ${pollosEnteros}

Medios pollos: ${mediosPollos}

Barras de pan: ${pan}

Canelones: ${canelones}

Caliu: ${caliu}

Bravas: ${bravas}

Fritas: ${fritas}

-------------------------

Sin encargo: ${vendidosSin}

Con encargo: ${vendidosCon}

-------------------------

Quedan: ${stock}`

    );

}

// ---------- INICIO ----------

window.onload=function(){

    cargarDatos();

    actualizar();

    seleccionarTipo(tipoVenta);

};
