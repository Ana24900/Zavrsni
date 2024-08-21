document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location="unos_ocj.html";
})
let listaprof=[];
function ucitavanje(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
let podatak = parseInt(ucitavanje('podatak'));
console.log( podatak);
let logirani={};
console.log(listaprof);
console.log(podatak);

document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    fetch("http://localhost:4000/popis_prof",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        
    })
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        listaprof=data;
        for(let i of data){
            if(i.id==podatak){
                logirani=i;
                console.log(logirani);
            }
        }
    
    })
})
function provjera(a){
    if(a.ime==""){
        a.ime=logirani.ime;
    }
    if(a.prezime==""){
        a.prezime=logirani.prezime;
    }
    if(a.email==""){
        a.email=logirani.email;
    }
    if(a.kontakt==""){
        a.kontakt=logirani.kontakt;
    }
    if(a.ured==""){
        a.ured==logirani.ured;
    }
    if(a.lozinka.lenght<8){
        if(a.lozinka.lenght!=0){
            a.lozinka=logirani.lozinka;
            alert("lozinka nije promjenjena");
        }
    }
}
document.getElementById("promjena").addEventListener("click",(e)=>{
    e.preventDefault();
    var ime=document.querySelectorAll("imp")[0].value;
    var prez=document.querySelectorAll("prezime")[1].value;
    var em=document.querySelectorAll("email")[2].value;
    var kon=document.querySelectorAll("brojMobitela")[3].value;
    var ur=document.querySelectorAll("ured")[4].value;
    var loz=document.querySelectorAll("lozinka")[5].value;
    var prof={
        ime: ime,
        prezime: prez,
        polozaj: pol,
        email: em,
        lozinka:loz,
        kontakt: kon,
        ured: ur,
        odjel: logirani.odjel,
        predmeti: [
        ]
        
    }
    console.log(prof);
})