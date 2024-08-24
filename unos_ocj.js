var lista=[];
var listaprof=[];
function ucitavanje(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
let podatak = parseInt(ucitavanje('podatak'));
console.log( podatak);
console.log(listaprof);
let logirani={};

function prikazstud(items) {
    const list = document.getElementById("lista");
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>id</th>
                    <th>Unos ocjene</th>
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
                <td>${i.id}</td>
                <td class="kaolink" onclick="ocjene(${i.id}, this)">Unos ocjene</td>
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
            
            lista.push(i);
            prikazstud(lista);
            
        }
       
    })
})
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
var predmetiLista = document.getElementById('predmetiLista');

function ocjene(a){
    for(let i of listaprof){
        if(i.id==podatak){
            logirani=i;
            console.log(logirani);
        }
    }
    let stud={};
    for(let i of lista){
        if(i.id==a){
            stud=i;
        }
    }
   
    for(let i=0;i<logirani.predmeti.length;i++){
        let li = document.createElement('li');
        li.classList=logirani.predmeti[i].ECTS;
        li.innerHTML=logirani.predmeti[i].naziv;
        let inputOcjena = document.createElement('input');
        inputOcjena.type = 'number';
        inputOcjena.min = '1';
        inputOcjena.max = '5';
        inputOcjena.placeholder = 'Unesi ocjenu';
        inputOcjena.id="ocj";
        let unesi = document.createElement('button');
        unesi.class="unos";
        unesi.onclick = () => {
            klik(unesi);
        };
        unesi.innerHTML = 'Unesi ocjenu';
        li.appendChild(inputOcjena);
        li.appendChild(unesi);
        predmetiLista.appendChild(li);
        
        
    }
    console.log(stud);
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    function klik(e){

        let rod = e.parentElement;
        let originalText = rod.textContent;
        let naziv = originalText.replace(e.textContent, '').trim();
    
        let pred = {
            naziv: naziv,
            ocjena: parseInt(rod.querySelector('input').value),
            ECTS: parseInt(rod.className) 
        };

        stud.predmeti.push(pred);
        console.log(pred);
        
        fetch(`http://localhost:4000/popis/${a}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(stud)
        })
        .then(res=>{
            if(res.status==200){
               
                return res.json();
            }else{
                
                return res.json();
            }
        })
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
        })
        let modal = document.getElementById('modal');
        modal.style.display = 'none'; 
        predmetiLista.textContent="";
    }
    
     
        
            
}
    

document.getElementById("close").addEventListener("click",(e)=>{
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'none'; 
    predmetiLista.textContent="";
})

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
        for(let i of data){
            listaprof.push(i);
        }
    
    })
})
document.getElementById("promjena").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location=`promjena.html?podatak=${podatak}`;
})
document.getElementById("odjava").addEventListener("click",(e)=>{
    e.preventDefault();
    alert("zelite se odjaviti");
    window.location="pocetna_prof.html";
})