

var lista=[];
var inf=[];
var infiteh=[];
var baze=[];



function prikazstud(items) {
    const list = document.getElementById("lista");
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Studijski smjer</th>
                    <th>Prosjek</th>
                    <th>Detalji</th>
                    <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
    `;

    items.forEach((i, index) => {
        novi += `
            <tr>
                <td>${index + 1}.</td>
                <td>${i.ime}</td>
                <td>${i.prezime}</td>
                <td>${i.studijski_smijer}</td>
                <td>${i.prosjek}</td>
                <td class="kaolink" onclick="prikaziDetalje(${i.id}, this)">Detalji</td>
                <td class="kaolink" onclick="brisanje(${i.id}, this)">Brisanje</td>
            </tr>
        `;
    });

    novi += "</tbody></table>";
    list.innerHTML = novi;
}

function sortprikaz(listasort) {
    let list=null;
    if(listasort==inf){
        list = document.getElementById("tablicainf");
    }
    else if(listasort==infiteh){
        list = document.getElementById("tablicainfiteh");

    }
    else{
        list = document.getElementById("tablicabaze");

    }
    let br = 0;
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Studijski smjer</th>
                    <th>Prosjek</th>
                    <th>Broj bodova</th>
                    <th>Uklanjanje</th>
                </tr>
            </thead>
            <tbody>
    `;

    listasort.forEach((student, index) => {
        bodovanje(student);  // Obrada podataka studenta
        br++;
        novi += `
            <tr>
                <td>${br}.</td>
                <td>${student.ime}</td>
                <td>${student.prezime}</td>
                <td>${student.studijski_smijer}</td>
                <td>${student.prosjek}</td>
                <td>${ispisbodova(listasort, index)}</td>
                <td class="kaolink" onclick="uklanjanje(${student.id})">Ukloni</td>
            </tr>
        `;
    });

    novi += "</tbody></table>";
    list.innerHTML = novi;
    
}


document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    document.getElementById("lista").innerHTML="";
    fetch("http://localhost:4000/popis",{
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
        for(let i of data){
            bodovanje(i);
            ectsbodovi(i);
            i.ectsbodovi=ectsbodovi(i);
            i.prosjek=prosjekfun(i);
            lista.push(i);
            prikazstud(lista);
            
        }
        
       
    })

})
function ispisbodova(a,j){
  if(a==inf){
      for(let i=0;i<3;i++){
          if(inf[j].izbor[i].naziv=="Nastavnički informatika"){
              return inf[j].izbor[i].bodovi;
          }
      }
  }
  else if(a==infiteh){
      for(let i=0;i<3;i++){
          if(infiteh[j].izbor[i].naziv=="Nastavnički informatika i tehnika"){
              return infiteh[j].izbor[i].bodovi;
          }
      }
  }
  else{
      for(let i=0;i<3;i++){
          if(baze[j].izbor[i].naziv=="Informatika baze podataka"){
              return baze[j].izbor[i].bodovi;
          }
      }
  }
}
function ectsbodovi(i){
    var broj=0;
    for(let j=0;j<i.predmeti.length;j++){
        broj+=i.predmeti[j].ECTS;
    }
    return broj;
}
function bodovanje(a){
  for(let i=0;i<3;i++){
      if(a.izbor[i].naziv=="Nastavnički informatika"){
          a.izbor[i].bodovi=(180*(a.predmeti[2].ocjena+a.predmeti[3].ocjena)/2)/a.godina_studiranja;
      }
      else if(a.izbor[i].naziv=="Nastavnički informatika i tehnika"){
          a.izbor[i].bodovi=(180*((a.predmeti[3].ocjena+a.predmeti[4].ocjena)/2))/a.godina_studiranja;
      }
      else{
          a.izbor[i].bodovi=(180*(a.predmeti[1].ocjena+a.predmeti[0].ocjena)/2)/a.godina_studiranja;
      }
  }
}
function prosjekfun(a){
    let pros=0;
    for(let i=0;i<5;i++){
        pros+=a.predmeti[i].ocjena;
    }
    pros=pros/5;
    return pros;
}
function upad(a,b){
    let id=0;
    let min=lista[a].izbor[b].bodovi;
    let prosjek1=lista[a].prosjek;
    let ind=0;
    let pr=false;
    let niz=[];
    let smijer="";
    if(lista[a].izbor[b].naziv=="Nastavnički informatika"){
        niz=inf;
        smijer="Nastavnički informatika";
        if(niz.length<7){
            lista[a].primljena=true;
            niz.push(lista[a]);
            return true;
        }
    }
    else if(lista[a].izbor[b].naziv=="Nastavnički informatika i tehnika"){
        niz=infiteh;
        smijer="Nastavnički informatika i tehnika";
        if(niz.length<8){
            lista[a].primljena=true;
            niz.push(lista[a]);
            return true;
        }
    }
    else{
        niz=baze;
        smijer="Informatika baze podataka";
        if(niz.length<8){
            lista[a].primljena=true;
            niz.push(lista[a]);
            return true;

        }
    }

    for(let j=0;j<niz.length;j++){
        console.log(niz[j].ime);
        for(let h=0;h<3;h++){
            if(niz[j].izbor[h].naziv==smijer){
                console.log(id);
                if(niz[j].izbor[h].bodovi<min){
                    min=niz[j].izbor[h].bodovi;
                    ind=j;
                    id=niz[j].id;
                    pr=true;
                    prosjek1=niz[j].prosjek;
                }
                else if(niz[j].izbor[h].bodovi==min){
                    if(prosjek1>niz[j].prosjek){
                        min=niz[j].izbor[h].bodovi;
                        ind=j;
                        id=niz[j].id;
                        pr=true;
                        prosjek1=niz[j].prosjek;
                    }
                }

            }
        }
    }
    if(pr){
        if(lista[a].izbor[b].naziv=="Nastavnički informatika"){
            lista[a].primljena=true;
            inf[ind]=lista[a];
        }
        else if(lista[a].izbor[b].naziv=="Nastavnički informatika i tehnika"){
            lista[a].primljena=true;
            infiteh[ind]=lista[a];
        }
        else{
            lista[a].primljena=true;
            baze[ind]=lista[a];
        }
        for(let j=0;j<lista.length;j++){
            if(lista[j].id==id){
                lista[j].primljena=false;
            }
        }
}
}

document.getElementById("provjera").addEventListener("click",(e)=>{
    e.preventDefault();
    const listinf=document.getElementById("tablicainf");
    const listinfiteh=document.getElementById("tablicainfiteh");
    const listbaze=document.getElementById("tablicabaze");
   
    listinfiteh.innerHTML="";
    listbaze.innerHTML="";
    listinf.innerHTML="";
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==4 && lista[i].uklonjen==false){
        upad(i,0);
        }
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==4 && lista[i].uklonjen==false){
        upad(i,1);
        }
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==4 && lista[i].uklonjen==false){
            upad(i,2);
        }
    }
    
    sortprikaz(inf);
    sortprikaz(infiteh);
    sortprikaz(baze);
    
    
})
document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})

document.getElementById("popprof").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='profesori.html'
})
function prikaziDetalje(id,element) {
    const roditelj = element.closest('tr');
    let detalji = roditelj.nextElementSibling;
    if (detalji && detalji.classList.contains('detalji-row')) {
        detalji.remove();
    } else {
        detalji = document.createElement('tr');
        detalji.classList.add('detalji-row');
        const novi = document.createElement('td');
        novi.colSpan = 6;  // Postavlja koliko kolona ovaj <td> pokriva
        for(let i of lista){
            if(id==i.id){
                novi.innerHTML = `
            <div class="detalji-container">
            <p><strong>Ime:</strong> ${i.ime}</p>
            <p><strong>Prezime:</strong> ${i.prezime}</p>
            <p><strong>Studijski smjer:</strong> ${i.studijski_smijer}</p>
            <p><strong>Prosjek:</strong> ${i.prosjek}</p>
            <p><strong>ECTS bdovi</strong> ${i.ectsbodovi}</p>
            <h3>Izbori</h3>
            <p><strong>1. ${i.izbor[0].naziv}</strong> Broj bodova:<strong> ${i.izbor[0].bodovi}</strong></p>
            <p><strong>2. ${i.izbor[1].naziv}</strong> Broj bodova:<strong> ${i.izbor[1].bodovi}</strong></p>
            <p><strong>3. ${i.izbor[2].naziv}</strong> Broj bodova:<strong> ${i.izbor[2].bodovi}</strong></p>
            <h3>Predmeti</h3>
            <p> <strong>${i.predmeti[0].naziv}</strong> ocijena: <strong>${i.predmeti[0].ocjena}</strong></p>
            <p> <strong>${i.predmeti[1].naziv}</strong> ocijena: <strong>${i.predmeti[1].ocjena}</strong></p>
            <p> <strong>${i.predmeti[2].naziv}</strong> ocijena: <strong>${i.predmeti[2].ocjena}</strong></p>
            <p> <strong>${i.predmeti[3].naziv}</strong> ocijena: <strong>${i.predmeti[3].ocjena}</strong></p>
            <p> <strong>${i.predmeti[4].naziv}</strong> ocijena: <strong>${i.predmeti[4].ocjena}</strong></p>
            </div>         
            `;
            }
        }
        detalji.appendChild(novi);
        
        roditelj.insertAdjacentElement('afterend', detalji);
    }
}
document.getElementById("pretrazivanje").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = lista.filter((item) => {
        return (
            item.ime.toLowerCase().includes(searchData) ||
            item.prezime.toLowerCase().includes(searchData) ||
            item.studijski_smijer.toLowerCase().includes(searchData) 
        );
    });
    prikazstud(filterData); 
});

function brisanje(id){
    
    if(confirm('Da li ste sigurni da želite obrisati?')){
            fetch(`http://localhost:4000/popis/${id}`,{
                method: "DELETE",
                headers:{ 'Content-Type': 'application/json',
                'Accept': '*/*'}
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                console.log(data);
                window.location.href = window.location.href;
            })
            .catch(err=>{
                console.log("greska");
            })
    }
    else{
        alert("odustali ste od brisanja");
    }
}
function uklanjanje(a){
    for(let i=0;i<inf.length;i++){
        if(inf[i].id==a){
            inf.splice(i,1);
            
        }
    }
    for(let i=0;i<infiteh.length;i++){
        if(infiteh[i].id==a){
            infiteh.splice(i,1);
           
        }
    }
    for(let i=0;i<baze.length;i++){
        if(baze[i].id==a){
            baze.splice(i,1);
            
        }
    }
    let mj={};
    for(let j=0;j<lista.length;j++){
        if(lista[j].id==a){
            lista[j].uklonjen=true;
            lista[j].primljena=false;
            mj=lista[j];
        }
    }
    const listinf=document.getElementById("tablicainf");
    const listinfiteh=document.getElementById("tablicainfiteh");
    const listbaze=document.getElementById("tablicabaze");
    console.log(mj);
    listinfiteh.innerHTML="";
    listbaze.innerHTML="";
    listinf.innerHTML="";
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==4 && lista[i].uklonjen==false){
        upad(i,0);
        }
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==4 && lista[i].uklonjen==false){
        upad(i,1);
        }
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==4 && lista[i].uklonjen==false){
            upad(i,2);
        }
    }
    sortprikaz(inf);
    sortprikaz(infiteh);
    sortprikaz(baze);
    fetch(`http://localhost:4000/studenti/${a}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(mj)
    })
    .then(res=>{
        if(res.status==200){
            return true;
        }
        else{
            return false;
        }
        
    })
    .then(data=>{
        console.log("dodan je novi podatak");
    })
    .catch(err=>{
        console.log("Podatak sa tim idom je updatean");
    }
    )
}