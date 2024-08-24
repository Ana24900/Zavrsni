let lista=[];
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
document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    document.getElementById("lista").innerHTML="";
    fetch("http://localhost:4000/stud_dip",{
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
            ectsbodovi(i);
            i.ECTS_bodovi=ectsbodovi(i);
            if(i.predmeti.length!=0){
            i.prosjek=prosjekfun(i);
            }
            lista.push(i);
            
            
        }
        prikazstud(lista);
        
       
    })

})

function ectsbodovi(i){
    var broj=0;
    if(i.predmeti.length!=0){
    for(let j=0;j<i.predmeti.length;j++){
        broj+=i.predmeti[j].ECTS;
    }
}
    return broj;
}

function prosjekfun(a){
    let pros=0;

    for(let i=0;i<5;i++){
        pros+=a.predmeti[i].ocjena;
    }
    pros=pros/5;
    return pros;
}
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
            <p><strong>Godina:</strong>${i.godina_studiranja}</p>
            <p><strong>Semestar:</strong>${i.semestar}</p>
            <p><strong>ECTS bodovi:</strong> ${i.ECTS_bodovi}</p>
            <h3>Predmeti</h3>
            ${i.predmeti.map(predmet => `
                <p><strong>${predmet.naziv}</strong> ocjena: <strong>${predmet.ocjena}</strong></p>
            `).join('')}
        </div>
    `;
            }
        }
        detalji.appendChild(novi);
        
        roditelj.insertAdjacentElement('afterend', detalji);
    }
}

var visagod=[];

function prikazPopisaStudenata(lista) {
    const modalContent = document.getElementById("li");
    modalContent.textContent="";
    let popis ="";
    
    lista.forEach((student, index) => {
        
        popis += `
        <li>
            <strong>${index + 1}. ${student.ime} ${student.prezime}</strong><br>
            Studijski smjer: ${student.studijski_smijer}<br>
            Prosjek: ${student.prosjek}<br>
            <span class="kaolink" onclick="ukloni2(${student.id})">Ukloni</span>
        </li>`;
        
    });

    popis += "</ul>";
    modalContent.innerHTML += popis;
}

document.getElementById("godine").addEventListener("click", (e) => {
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    visagodina(lista);
    for(let student of lista){
        console.log("jeltu");
        if(student.primljena==true && student.semestar!=8){
            
            visagod.push(student);
            console.log(visagod);
     }
    }
    prikazPopisaStudenata(visagod);
    document.getElementById("close").addEventListener("click",(e)=>{
        e.preventDefault();
        let modal = document.getElementById('modal');
        modal.style.display = 'none'; 
        
        
    })
});


function visagodina(lista){
    for(let i of lista){
        console.log("sta je");
        if(i.semestar==5){
            console.log("ima");
            if(i.ECTS_bodovi<10){
                console.log(i.ECTS_bodovi);
                i.primljena=false;
    
            }
            else{
                i.primljena=true;
                
            }
        }
        if(i.semestar==6){
            if(i.ECTS_bodovi<20){
                i.primljena=false;
            }
            else{
                i.primljena=true;
                i.godina_studiranja++;
                
            }
        }
        if(i.semestar==7){
            console.log(i.semestar);
            if(i.ECTS_bodovi<30){
                console.log(i.ECTS_bodovi);
                i.primljena=false;
            }
            else{
                
                i.primljena=true;
               
            }
        }
        
    }
}
function ukloni2(a){
    for(let i=0;i<visagod.length;i++){
        if(visagod[i].id==a){
            visagod.splice(i,1);
            prikazPopisaStudenata(visagod);
        }
    }
}

document.getElementById("visa").addEventListener("click",(e)=>{
    e.preventDefault();
    
    for(let i=0;i<visagod.length;i++){
        visagod[i].primljena=false;
        visagod[i].semestar++;
        fetch(`http://localhost:4000/stud_dip/${visagod[i].id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(visagod[i])
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
    window.location="dipl.html";
    visagod=[];
})





document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})

document.getElementById("popprof").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='profesori.html'
})
document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'stranica.html';
})