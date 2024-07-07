
var lista=[];
var inf=[];
var infiteh=[];
var baze=[];
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
            lista.push(i);
            console.log(i);
            let novi=document.createElement("li");
            novi.innerHTML+=i.ime+" "+i.prezime+" "+i.studijski_smijer+"\n";
            list.appendChild(novi);
            
        }
    })
})
// function zamjena(a,niz,smijer){
//     let mini=101;
//     let ind=0;
//     let vr=false;
//     for(let i=0;i<niz.length;i++){
//         for(let j=0;j<3;j++){
//             if(lista[a].izbor[j].naziv==smijer){
//                 if(niz[i].izbor[j].bodovi<mini){
//                     ind=i;
//                     mini=niz[i].izbor[j].bodovi;
//                     vr=true;
//                 }
//             }
//         }
//     }
//     if(vr){
//         lista[a].primljena=true;
//         for(let i=0;i<lista.length;i++){
//             if(niz[ind]==lista[i]){
//                 lista[i].primljena=false;
//             }
//         }
//         niz[ind]=a;
//         return true;
//     }
//     else{
//         vr=false
//         return false;
//     }

// }
function upad(a,b){
    let id=0;
    let min=lista[a].izbor[b].bodovi;
    let ind=0;
    let pr=false;
    let niz=[];
    let smijer="";
    if(lista[a].izbor[b].naziv=="Nastavnički informatika"){
        niz=inf;
        smijer="Nastavnički informatika";
        if(niz.length<3){
            lista[a].primljena=true;
            niz.push(lista[a]);
            return true;
        }
    }
    else if(lista[a].izbor[b].naziv=="Nastavnički informatika i tehnika"){
        niz=infiteh;
        smijer="Nastavnički informatika i tehnika";
        if(niz.length<6){
            lista[a].primljena=true;
            niz.push(lista[a]);
            return true;
        }
    }
    else{
        niz=baze;
        smijer="Informatika baze podataka";
        if(niz.length<10){
            lista[a].primljena=true;
            niz.push(lista[a]);
            return true;

        }
    }
    console.log(niz);
    for(let j=0;j<niz.length;j++){
        console.log(niz[j]);
        for(let h=0;h<3;h++){
            if(niz[j].izbor[h].naziv==smijer){
                console.log(id);
                if(niz[j].izbor[h].bodovi<min){
                    min=niz[j].izbor[h].bodovi;
                    ind=j;
                    id=niz[j].id;
                    pr=true;
                    if(lista[a].ime=="Jozo"){
                        console.log(niz[j].ime+" "+niz[j].izbor[h].bodovi);
                    }
                }

            }
        }
    }
    //let pr=zamjena(a,niz,smijer);
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
    for(let i=0;i<lista.length;i++){
        upad(i,0);
        
        
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false){
        upad(i,1);
        }
        
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false){
            upad(i,2);
        }
    }
    console.log(lista);
    console.log(inf);
    console.log(infiteh);
    console.log(baze);
    const listinf=document.getElementById("inf");
    for(let i=0;i<inf.length;i++){
        
        let novi=document.createElement("li");
        novi.innerHTML+=inf[i].ime+" "+inf[i].prezime+" "+inf[i].studijski_smijer+"\n";
        listinf.appendChild(novi);
    }
    const listinfiteh=document.getElementById("infiteh");
    for(let i=0;i<infiteh.length;i++){
        let novi=document.createElement("li");
        novi.innerHTML+=infiteh[i].ime+" "+infiteh[i].prezime+" "+infiteh[i].studijski_smijer+"\n";
        listinfiteh.appendChild(novi);
    }
    const listbaze=document.getElementById("baze");
    for(let i=0;i<baze.length;i++){
        let novi=document.createElement("li");
        novi.innerHTML+=baze[i].ime+" "+baze[i].prezime+" "+baze[i].studijski_smijer+"\n";
        listbaze.appendChild(novi);
    }
    inf=[];
    infiteh=[];
    baze=[];
})
