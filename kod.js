
document.getElementById("ucitaj").addEventListener("click",(e)=>{
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
        const list=document.getElementById("lista");
        for(let i of data){
            let novi=document.createElement("li");
            novi.innerHTML+=i.ime+" "+i.prezime+" "+i.studijski_smijer+"\n";
            list.appendChild(novi);
            
        }
    })
})
