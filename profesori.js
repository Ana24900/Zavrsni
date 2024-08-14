let lista=[];
document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    document.getElementById("lista").innerHTML="";
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
        var b=0;
        const list=document.getElementById("lista");
        var novi="<table><thead><tr><th>br.</th><th>Ime</th><th>Prezime</th><th>Položaj</th><th>Odjel</th><th>Kontakt</th><th>Ured</th><th>Detalji</th></tr></thead><tbody>";
        for(let i of data){
            lista.push(i);
            console.log(i);
            b++;
            novi+="<tr><td>"+b+"."+"</td><td>"+i.ime+"</td><td>"+i.prezime+"</td><td>"+i.polozaj+"</td><td>"+i.odjel+"</td><td>"+i.kontakt+"<td>"+i.ured+"</td>"+`</td><td class="kaolink" onclick=prikaziDetalje(${i.id},this)>`+"Detalji"+"</td></tr>";
            
            
        }
        novi+="</tbody></table>"
        list.innerHTML=novi;

    })
})
document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})
document.getElementById("bris").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'odjava.html';
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
