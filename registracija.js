function provjera(a){
    if(a.ime.lenght<2){
        
        return false;
    }
    if(a.prezime.lenght<3){
       
        console.log(a.prezime);
        return false;
    }
    if(a.godina_studiranja>8){
        console.log(a.godina_studiranja);
        return false;
    }
    if(a.izbor[0].naziv==a.izbor[1].naziv || a.izbor[0].naziv==a.izbor[2].naziv || a.izbor[1].naziv==a.izbor[2].naziv){
        a.izbor[0].naziv
        return false;
    }
    for(let i=0;i<a.predmeti.length;i++){
        console.log(a.predmeti[i].naziv);
        if(a.predmeti[i].ocjena<1 || a.predmeti[i].ocjena>5){
            return false;
        }
    }
    return true;
}
document.getElementById("unos").addEventListener("click",(e)=>{
    e.preventDefault();
    var ime=document.getElementById("ime").value;
    var prezime=document.getElementById("prezime").value;
    var godina_studiranja=document.getElementById("godina_studija").value;
    var studijski_smijer=document.getElementById("smjer").value;
    var prvi=document.getElementById("prvi_izbor").value;
    var drugi=document.getElementById("drugi_izbor").value;
    var treci=document.getElementById("treci_izbor").value;
    var mat=document.getElementById("matematika").value;
    var baz=document.getElementById("baze").value;
    var arh=document.getElementById("arhitektura").value;
    var prog=document.getElementById("inžinjerstvo").value;
    var el=document.getElementById("elektronika").value;

    let stud={
    id: 0,
    ime: ime,
    prezime: prezime,
    godina_studiranja: godina_studiranja,
    prosjek: 0,
    studijski_smijer: studijski_smijer,
    primljena: false,

    izbor:[
      { naziv:prvi,bodovi: 0},
      { naziv:drugi,bodovi: 0},
      { naziv:treci,bodovi: 0}
    ],
    predmeti: [
      {naziv : "Matematika", ocjena: parseInt(mat)},
      {naziv : "Baze podataka", ocjena: parseInt(baz)},
      {naziv : "Arhitektura računala", ocjena: parseInt(arh)},
      {naziv : "Programsko inžinjerstvo",ocjena: parseInt(prog)},
      {naziv : "Osnove elektronike I.", ocjena: parseInt(el) }
    ]
    }
    console.log(stud);
    if(provjera(stud)==true){
        fetch("http://localhost:4000/popis/novi",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(stud)
        })
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            alert("Uspjesno unesen student "+stud.ime+" "+stud.prezime);
            console.log(data);
            console.log("uneseno");
        })
        .catch(err=>{
            console.log(err);
        })
    }
   else
   {
    console.log("krivi unos");
   }

})
document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'stranica.html';
})
document.getElementById("bris").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'odjava.html';
})
document.getElementById("popprof").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='profesori.html'
})
var pred=[];
document.getElementById("dodpred").addEventListener("click", (e) => {
    e.preventDefault();
    
    let ime = document.getElementById("nazivpred").value;
    let ec = document.getElementById("ects").value;
    
    let pr = {
        naziv: ime,
        ECTS: ec
        
    };
    if(ime!="" && ec>0 && ec<20){
        pred.push(pr);
    let di = document.createElement("div");
    di.className = "kucica";
    let bot = document.createElement("button");
    
    let img = document.createElement("img");
    img.src = "smece.png";
    img.alt = "Smeće";

    bot.appendChild(img); 
    bot.id=pred.length;
    bot.addEventListener("click", (e) => {
        e.preventDefault(); 
        di.remove(); 
        pred.splice(bot.id - 1, 1);  
        console.log(pred);
    });
    console.log(pred);
    
    di.innerHTML = `
    <div class="kucica-naziv">${pr.naziv}</div>
    <div class="kucica-ects">ECTS: ${pr.ECTS}</div>
    `;

    di.appendChild(bot);
    
    let divpred = document.getElementById('divpred');
    let roditelj = divpred.parentNode;
    roditelj.insertBefore(di, divpred);
    }
    
});
function provjeraprof(a){
    if(a.ime==""){
        document.getElementById("imep").style.borderBlockColor="red";
        return false;
    
    }
    else{
        document.getElementById("imep").style.borderBlockColor="#ddd";
    }
    if(a.prezime==""){
        document.getElementById("prezimep").style.borderBlockColor="red";
        return false;
    }
    else{
        document.getElementById("prezimep").style.borderBlockColor="#ddd";
    }
    console.log(a.polozaj);
    if((a.polozaj.toLowerCase())!="prodekan" && (a.polozaj.toLowerCase())!="dekan" && (a.polozaj.toLowerCase())!="profesor" && (a.polozaj.toLowerCase())!="asistent"){
        document.getElementById("polozaj").style.borderBlockColor="red";
        return false;
    }
    else{
        document.getElementById("polozaj").style.borderBlockColor="#ddd";
    }
    if(a.ured=="" || a.email=="" || a.odjel==""){
        document.getElementById("emil").style.borderBlockColor="red";
        return false;
    }
    else{
        document.getElementById("email").style.borderBlockColor="#ddd";
    }
    return true;
}
document.getElementById("dodprofesora").addEventListener("click",(e)=>{
    e.preventDefault();

    

    var ime=document.getElementById("imep").value;
    var prez=document.getElementById("prezimep").value;
    var pol=document.getElementById("polozaj").value;
    var em=document.getElementById("email").value;
    var kon=document.getElementById("kontakt").value;
    var ur=document.getElementById("ured").value;
    var od=document.getElementById("odjel").value;
    var prof={
        ime: ime,
        prezime: prez,
        polozaj: pol,
        email: em,
        kontakt: kon,
        ured: ur,
        odjel: od,
        predmeti: [
        ]
        
    }
    for(let i of pred){
        prof.predmeti.push(i);
    }

    if(provjeraprof(prof)==true){
        fetch("http://localhost:4000/popis_prof/novi",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(prof)
        })
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            alert("Uspjesno unesen profesor "+prof.ime+" "+prof.prezime);
            console.log(data);
            console.log("uneseno");
            window.location.href = 'registracija.html';
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else
    {
    console.log("krivi unos");
    }


})
