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
    if(a.izbor1==a.izbor2 || a.izbor1==a.izbor3 || a.izbor2==a.izbor3){
    
        return false;
    }

    return true;
}
function provjeradip(a){
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
   
    return true;
}
var idstud=0;
document.getElementById("unos").addEventListener("click", (e) => {
    e.preventDefault();
    var ime = document.getElementById("ime").value;
    var prezime = document.getElementById("prezime").value;
    var godina_studiranja = document.getElementById("godina_studija").value;
    var studijski_smijer = document.getElementById("smjer").value;
    var sem = document.getElementById("semestar").value;
    upisi1= document.getElementById("prvi_izbor").value;
    upisi2 = document.getElementById("drugi_izbor").value;
    upisi3= document.getElementById("treci_izbor").value;
    let izb=[];
    var ecc=0;
    let pr=0;

    for(let i of listocj){
        ecc+=i.ECTS;
        pr+=i.ocjena;
    }
    pr=pr/(listocj.length);
    let zao = pr.toFixed(2);
    let stud = {
        ime: ime,
        prezime: prezime,
        godina_studiranja: godina_studiranja,
        prosjek: zao,
        studijski_smijer: studijski_smijer,
        ECTS_bodovi: ecc,
        semestar: sem,
        primljena: false,
        uklonjen: false,
        izbor1: upisi1,
        izbor2: upisi2,
        izbor3: upisi3,
        bodovi1: 0,
        bodovi2: 0,
        bodovi3: 0,
    };

    console.log(stud);

    if (provjera(stud)) {
        async function postStudent(stud) {
            try {
                const response = await fetch("http://localhost:4000/baza/novi", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify({ student: stud })  // Umotaj u objekt student
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                console.log("ovo je odgovor s ID-om studenta:");
                console.log(data);
                for(let i of listocj){
                    i.student_id=data.id;
                    console.log(i.student_id);
                    postOcjena(i);
                }
                idstud=data.id;
                alert("Uspješno unesen student " + stud.ime + " " + stud.prezime + ". ID: " + idstud);
                window.location.href = 'registracija.html';
                return idstud; // Vraćanje ID-a ako je potrebno koristiti kasnije
        
            } catch (err) {
                console.error('Greška pri unosu:', err);
            }
        }
        postStudent(stud);
        console.log(listocj[0].student_id);
        
        async function postOcjena(ocjena) {
            try {
                const response = await fetch("http://localhost:4000/ocjene/novi", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify(ocjena)
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                alert("Uspješno unesen student " + ocjena.ocjena + " ");
                console.log(data);
                console.log("uneseno");
            } catch (error) {
                console.log(ocjena);
                console.error('Greška pri unosu:', error);
            }
        }
        
        
    } else {
        console.log("Krivi unos");
    }
});

document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'stranica.html';
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
        ECTS: ec,
        profesor_id:0
        
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
    var lozinka=document.getElementById("lozinka").value;

    var prof={
        ime: ime,
        prezime: prez,
        polozaj: pol,
        email: em,
        kontakt: kon,
        ured: ur,
        odjel: od,
        lozinka:lozinka
    }
    async function postPredmet(predmet) {
        try {
            const response = await fetch("http://localhost:4000/predmeti/novi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({predmet:predmet} )  // Umotaj u objekt predmet
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            alert("Uspješno unesen predmet: " + predmet.naziv);
            console.log("Novi predmet ID:", data.predmetId);
        } catch (err) {
            console.error('Greška pri unosu predmeta:', err);
        }
    }
    async function postProfesor(prof) {
        console.log("Podaci koje šaljemo:", prof); 
        try {
            const response = await fetch("http://localhost:4000/profesori/novi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({ profesor: prof })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            alert("Uspješno unesen profesor " + prof.ime + " " + prof.prezime);
            console.log(data);
            console.log("uneseno");
            for(let i of pred){
                i.profesor_id=data.id;
                console.log(i);
                postPredmet(i);
            }
            // Preusmjeravanje nakon uspješnog unosa
            window.location.href = 'registracija.html';
        } catch (err) {
            console.error('Greška pri unosu:', err);
        }
    }
    if(provjeraprof(prof)==true){
        console.log(prof);
        postProfesor(prof);
    
    }
    else
    {
    console.log("krivi unos");
    }


})
let predmeti=[];

document.addEventListener("DOMContentLoaded",(e)=>{
    e.preventDefault();
    let roditelj=document.getElementById("predmeti");
    let roditeljdip=document.getElementById("predmetidip");

    fetch(`http://localhost:4000/predmeti`,{
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
        for(i of data){
            predmeti.push(i);
            console.log(i);
            let dijete=document.createElement("option");
            let dijete2=document.createElement("option");
            dijete.innerHTML=i.naziv;
            dijete2.innerHTML=i.naziv;
            roditelj.appendChild(dijete);
            roditeljdip.appendChild(dijete2);

        }
        
    })
})
document.getElementById("predmeti").addEventListener("change", function() {
    var predmet = this.value;
    if (predmet) {
        var modal = document.getElementById("unosOcjeneModal");
        modal.style.display = "block";
        document.getElementById("predmet").textContent = predmet;
    }
});
document.getElementById("predmetidip").addEventListener("change", function() {
    var predmet = this.value;
    if (predmet) {
        var modal = document.getElementById("unosOcjeneModal");
        modal.style.display = "block";
        document.getElementById("predmet").textContent = predmet;
    }
});

// Zatvaranje modala
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("unosOcjeneModal").style.display = "none";
});

let listocj=[];

document.getElementById("spremiOcjenu").addEventListener("click", function() {
    var ocjena = document.getElementById("ocjena").value;
    var predmet = document.getElementById("predmet").textContent;

    if (ocjena >= 1 && ocjena <= 5) {
        alert("Ocjena za " + predmet + " je: " + ocjena);
        document.getElementById("unosOcjeneModal").style.display = "none";
    } else {
        alert("Unesite ispravnu ocjenu (1-5).");
    }
    let obj={
        student_id:0,
        predmet_id: 0,
        ocjena:parseInt(ocjena),
        ECTS:0
    }
    for(let i of predmeti){
        if(i.naziv==predmet){
            obj.predmet_id=i.id;
            obj.ECTS=i.ECTS;
        }
    }
    listocj.push(obj);
});
document.getElementById("unosd").addEventListener("click",(e)=>{
    e.preventDefault();
    var ime = document.getElementById("imed").value;
    var prezime = document.getElementById("prezimed").value;
    var godina_studiranja = document.getElementById("godina_studijad").value;
    var studijski_smijer = document.getElementById("smjerd").value;
    var sem = document.getElementById("semestard").value;
    let ecc=0;
    let pr=0;
    for(let i of listocj){
        ecc+=i.ECTS;
        pr+=i.ocjena;
    }
    pr=pr/(listocj.length);
    let zao = pr.toFixed(2);
    let stud = {
        ime: ime,
        prezime: prezime,
        godina_studiranja: godina_studiranja,
        prosjek: zao,
        studijski_smijer: studijski_smijer,
        ECTS_bodovi: ecc,
        semestar: sem,
        primljena: false,
        
    };

    console.log(stud);

    if (provjeradip(stud)) {
        async function postStudentdip(stud) {
            try {
                const response = await fetch("http://localhost:4000/stud_dip/novi", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify({ student: stud })  // Umotaj u objekt student
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                console.log("ovo je odgovor s ID-om studenta:");
                console.log(data);
                for(let i of listocj){
                    i.student_id=data.id;
                    console.log(i.student_id);
                    postOcjena(i);
                }
                idstud=data.id;
                alert("Uspješno unesen student " + stud.ime + " " + stud.prezime + ". ID: " + idstud);
                window.location.href = 'registracija.html';
                return idstud; // Vraćanje ID-a ako je potrebno koristiti kasnije
        
            } catch (err) {
                console.error('Greška pri unosu:', err);
            }
        }
        postStudentdip(stud);
        console.log(listocj[0].student_id);
        
        async function postOcjena(ocjena) {
            try {
                const response = await fetch("http://localhost:4000/ocjene_dip/novi", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify(ocjena)
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                alert("Uspješno unesen student " + ocjena.ocjena + " ");
                console.log(data);
                console.log("uneseno");
            } catch (error) {
                console.log(ocjena);
                console.error('Greška pri unosu:', error);
            }
        }
        
        
    } else {
        console.log("Krivi unos");
    }
})
document.getElementById("dip").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location="dipl.html";
})
document.getElementById("odjava").addEventListener("click",(e)=>{
    e.preventDefault();
    alert("zelite se odjaviti");
    window.location="pocetna_prof.html";
})