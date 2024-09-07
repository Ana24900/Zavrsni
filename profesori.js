let lista=[];
document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    document.getElementById("lista").innerHTML="";
    fetch("http://localhost:4000/profesori",{
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
        lista=data
        prikaziTabelu(lista);

    })
})
document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})
document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'stranica.html';
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
                let novinnerHTML = `
            <div class="detalji-container">
            <p><strong>Ime:</strong> ${i.ime}</p>
            <p><strong>Prezime:</strong> ${i.prezime}</p>
            <p><strong>Polozaj:</strong> ${i.polozaj}</p>
            <p><strong>E-mail:</strong> ${i.email}</p>
            <p><strong>Ured</strong> ${i.ured}</p>
            <p><strong>Odjel</strong> ${i.odjel}</p>
            <h3>Predmeti predavanja</h3> 
            `;
            for (let j = 0; j < i.predmeti.length; j++) {
                novinnerHTML += `<p> <strong>${i.predmeti[j].naziv}</strong> ECTS <strong>${i.predmeti[j].ECTS}</strong></p>`;
            }
            novinnerHTML+=`</div>`
            novi.innerHTML=novinnerHTML;

            }
        }
        detalji.appendChild(novi);
        
        roditelj.insertAdjacentElement('afterend', detalji);
    }
}
const displeyItem = (items) => {
    document.getElementById("ispis").innerHTML = items.map((item) => {
        const { ime, prezime, polozaj } = item;
        return `<p>${ime} ${prezime} - ${polozaj}</p>`;
    }).join("");
};

document.getElementById("pretrazivanje").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = lista.filter((item) => {
        return (
            item.ime.toLowerCase().includes(searchData) ||
            item.prezime.toLowerCase().includes(searchData) ||
            item.polozaj.toLowerCase().includes(searchData)
        );
    });
    prikaziTabelu(filterData); // Prikazuje filtrirane rezultate
});


function prikaziTabelu(items) {
    const list = document.getElementById("lista");
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Položaj</th>
                    <th>Odjel</th>
                    <th>Kontakt</th>
                    <th>Ured</th>
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
                <td>${i.polozaj}</td>
                <td>${i.odjel}</td>
                <td>${i.kontakt}</td>
                <td>${i.ured}</td>
                <td class="kaolink" onclick="prikaziDetalje(${i.id}, this)">Detalji</td>
                <td class="kaolink" onclick="brisanjeprof(${i.id}, this)">Brisanje</td>
            </tr>
        `;
    });

    novi += "</tbody></table>";
    list.innerHTML = novi;
}
function brisanjeprof(id){
    
    if(confirm('Da li ste sigurni da želite obrisati?')){
            fetch(`http://localhost:4000/profesori/${id}`,{
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
document.getElementById("dip").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location="dipl.html";
})
document.getElementById("odjava").addEventListener("click",(e)=>{
    e.preventDefault();
    alert("zelite se odjaviti");
    window.location="pocetna_prof.html";
})