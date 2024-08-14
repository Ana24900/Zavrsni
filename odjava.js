let lista=[];
let listap=[]
document.getElementById("trazenje").addEventListener('click',(e)=> {
    e.preventDefault();
    var im=document.querySelectorAll("input")[0].value;
    var pr=document.querySelectorAll("input")[1].value;
    var god=document.querySelectorAll("input")[2].value;
    var sm=document.getElementById("smjer").value;
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
        var b=0;
        const list=document.getElementById("lista");
        var novi="<table><thead><tr><th>br.</th><th>Ime</th><th>Prezime</th><th>Studij</th><th>Prosjek</th><th>id</th><th>Brisanje</th></tr></thead><tbody>";
        for(let i of data){
            if(i.ime.toLowerCase()==im.toLowerCase() && i.prezime.toLowerCase()==pr.toLowerCase() && i.godina_studiranja==god && i.studijski_smijer.toLowerCase()==sm.toLowerCase()){
            lista.push(i);
            console.log(i);
            b++;
            novi+="<tr><td>"+b+"."+"</td><td>"+i.ime+"</td><td>"+i.prezime+"</td><td>"+i.studijski_smijer+"</td><td>"+i.prosjek+"</td><td>"+i.id+`</td><td class="link-like" onclick=brisanje(${i.id})>`+"Brisanje"+"</td></tr>";
            }
            
        }
        novi+="</tbody></table>"
        list.innerHTML=novi;

    })
})
document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'stranica.html';
})
document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})
document.getElementById("popprof").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='profesori.html'
})
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
            })
            .catch(err=>{
                console.log("greska");
            })
    }
    else{
        alert("odustali ste od brisanja");
    }
}
document.getElementById("trazenjep").addEventListener('click',(e)=> {
    e.preventDefault();
    var im=document.getElementById("imep").value;
    var pr=document.getElementById("prezimep").value;
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
        var novi="<table><thead><tr><th>br.</th><th>Ime</th><th>Prezime</th><th>Položaj</th><th>E-mail</th><th>Kontakt</th><th>id</th><th>Brisanje</th></tr></thead><tbody>";
        for(let i of data){
            if(i.ime.toLowerCase()==im.toLowerCase() && i.prezime.toLowerCase()==pr.toLowerCase()){
            listap.push(i);
            console.log(i);
            b++;
            novi+="<tr><td>"+b+"."+"</td><td>"+i.ime+"</td><td>"+i.prezime+"</td><td>"+i.polozaj+"</td><td>"+i.email+"</td><td>"+i.kontakt+"</td><td>"+i.id+`</td><td class="link-like" onclick=brisanjeprof(${i.id})>`+"Brisanje"+"</td></tr>";
            }
            
        }
        novi+="</tbody></table>"
        list.innerHTML=novi;

    })
})
function brisanjeprof(id){
    
    if(confirm('Da li ste sigurni da želite obrisati?')){
            fetch(`http://localhost:4000/popis_prof/${id}`,{
                method: "DELETE",
                headers:{ 'Content-Type': 'application/json',
                'Accept': '*/*'}
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                console.log(data);
            })
            .catch(err=>{
                console.log("greska");
            })
    }
    else{
        alert("odustali ste od brisanja");
    }
}