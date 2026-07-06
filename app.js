// VARIABLES

let stock = 0;

let vendidosSin = 0;
let vendidosCon = 0;

let pan = 0;
let canelones = 0;
let caliu = 0;
let bravas = 0;
let fritas = 0;

let pack1Total = 0;
let pack2Total = 0;
let pack3Total = 0;

let historial = [];
// GUARDAR Y CARGAR

function guardarDatos(){

    const datos = {
        stock,
        vendidosSin,
        vendidosCon,
        pan,
        canelones,
        caliu,
        bravas,
        fritas,
        pack1Total,
        pack2Total,
        pack3Total,
        historial
    };

    localStorage.setItem(
        "rostiControl",
        JSON.stringify(datos)
    );

}

function cargarDatos(){

    const datos = localStorage.getItem("rostiControl");

    if(!datos) return;

    const d = JSON.parse(datos);

    stock = d.stock || 0;
    vendidosSin = d.vendidosSin || 0;
    vendidosCon = d.vendidosCon || 0;

    pan = d.pan || 0;
    canelones = d.canelones || 0;
    caliu = d.caliu || 0;
    bravas = d.bravas || 0;
    fritas = d.fritas || 0;

    pack1Total = d.pack1Total || 0;
    pack2Total = d.pack2Total || 0;
    pack3Total = d.pack3Total || 0;
// ACTUALIZAR PANTALLA

function actualizar(){

    document.getElementById("quedan").textContent = stock;

    document.getElementById("sinEncargo").textContent = vendidosSin;
    document.getElementById("conEncargo").textContent = vendidosCon;

    document.getElementById("pan").textContent = pan;
    document.getElementById("canelones").textContent = canelones;

    document.getElementById("caliu").textContent = caliu;
    document.getElementById("bravas").textContent = bravas;
    document.getElementById("fritas").textContent = fritas;

    document.getElementById("pack1").textContent = pack1Total;
    document.getElementById("pack2").textContent = pack2Total;
    document.getElementById("pack3").textContent = pack3Total;

}

// STOCK

function iniciarStock(){

    let valor = parseFloat(document.getElementById("stockInicial").value);

    if(isNaN(valor)) return;

    stock = valor;

    actualizar();
    guardarDatos();

}

function añadirStock(){

    let extra = parseFloat(document.getElementById("stockExtra").value);

    if(isNaN(extra) || extra<=0) return;

    stock += extra;

    document.getElementById("stockExtra").value="";

    actualizar();
    guardarDatos();

}
  // =========================
// VENTAS INDIVIDUALES
// =========================

function guardarHistorial(){

    historial.push({
        stock,
        vendidosSin,
        vendidosCon,
        pan,
        canelones,
        caliu,
        bravas,
        fritas,
        pack1Total,
        pack2Total,
        pack3Total
    });

}

function venderPollo(){

    if(stock < 1){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    stock -= 1;
    vendidosSin += 1;

    actualizar();
    guardarDatos();

}

function venderMedioPollo(){

    if(stock < 0.5){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    stock -= 0.5;
    vendidosSin += 0.5;

    actualizar();
    guardarDatos();

}

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
  // =========================
// PACKS
// =========================

function elegirPatatas(){

    let opcion = prompt(
`Elige las patatas:

1 = Caliu
2 = Bravas
3 = Fritas`);

    if(opcion=="1"){
        caliu++;
    }else if(opcion=="2"){
        bravas++;
    }else if(opcion=="3"){
        fritas++;
    }else{
        return false;
    }

    return true;

}

// -------------------------

function pack1(){

    if(stock < 0.5){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    stock -= 0.5;

    caliu += 0.5;

    pack1Total++;

    actualizar();
    guardarDatos();

}

// -------------------------

function pack2(){

    if(stock < 1){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    if(!elegirPatatas()) return;

    stock--;

    pan++;

    pack2Total++;

    actualizar();
    guardarDatos();

}

// -------------------------

function pack3(){

    if(stock < 1){
        alert("No quedan pollos");
        return;
    }

    guardarHistorial();

    if(!elegirPatatas()) return;

    stock--;

    pan++;

    canelones++;

    pack3Total++;

    actualizar();
    guardarDatos();

}
  // =========================
// DESHACER
// =========================

function deshacer(){

    if(historial.length===0){
        return;
    }

    let ultimo = historial.pop();

    stock = ultimo.stock;
    vendidosSin = ultimo.vendidosSin;
    vendidosCon = ultimo.vendidosCon;

    pan = ultimo.pan;
    canelones = ultimo.canelones;
    caliu = ultimo.caliu;
    bravas = ultimo.bravas;
    fritas = ultimo.fritas;

    pack1Total = ultimo.pack1Total;
    pack2Total = ultimo.pack2Total;
    pack3Total = ultimo.pack3Total;

    actualizar();
    guardarDatos();

}

// =========================
// REINICIAR
// =========================

function reiniciar(){

    if(!confirm("¿Seguro que quieres reiniciar el día?")){
        return;
    }

    stock = 0;

    vendidosSin = 0;
    vendidosCon = 0;

    pan = 0;
    canelones = 0;
    caliu = 0;
    bravas = 0;
    fritas = 0;

    pack1Total = 0;
    pack2Total = 0;
    pack3Total = 0;

    historial = [];

    document.getElementById("stockInicial").value = "";
    document.getElementById("stockExtra").value = "";

    actualizar();
    guardarDatos();

}

// =========================
// INICIO
// =========================

window.onload = function(){

    cargarDatos();
    actualizar();

}
    historial = d.historial || [];

}
