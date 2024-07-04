
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

document.getElementById("razvrstaj").addEventListener("click",(e)=> {
    e.preventDefault();

    for(let i=0;i<lista.length;i++){
        if(lista[i].izbor[0].naziv=="Nastavnički informatika" ){
            if(inf.length<2){
                inf.push(lista[i]);
                lista[i].primljena=true;
                console.log("Primljen na inf "+lista[i]);
            }
            else{
                for(let j=0;j<inf.length;j++){
                    if(lista[i].izbor[0].bodovi>=inf[j].izbor[0].bodovi){
                        let st=inf[j];
                        inf[j]=lista[i];
                        lista[i].primljena=true;
                        let ind=0;
                        for(let c=0;c<lista.length;c++){
                            if(st==lista[c]){
                                ind=c;
                                lista[c].primljena=false;
                            }
                        }
                        console.log(lista[i].ime+"izgurao "+st.ime);
                        if(st.izbor[1].naziv=="Nastavnički informatika i tehnika"){
                            if(infiteh.length<2){
                                infiteh.push(st);
                                lista[ind].primljena=true;
                                console.log(" primljen je na infiteh "+st.ime);
                            }
                            else{
                                for(let k=0;k<infiteh.length;k++){
                                    if(st.izbor[1].bodovi>=infiteh[k].izbor[1].bodovi){
                                        infiteh[k]=st;
                                        lista[ind].primljena=true;

                                    }
                                    // else{
                                    //     baze.push(st);
                                    // }
                                }
                         }
                        }
                        else if(st.izbor[1].naziv=="Informatika baze podataka"){
                            if(baze.length<2){
                                baze.push(st);
                                lista[ind].primljena=true;
                                console.log("primljen je na baze "+st);
                            }
                            else{
                                for(let h=0;h<baze.length;h++){
                                    if(st.izbor[1].bodovi>=baze[h].izbor[1].bodovi){
                                        baze[h]=st;
                                        lista[ind].primljena=true;
                                    }
                                    // else{
                                    //     infiteh.push(st);
                                    // }
                                }
                            }
                        }
                    }
                    else if(lista[i].primljena==false){
                        console.log("koliko puta vamo ulazi");
                        if(lista[i].izbor[1].naziv=="Nastavnički informatika i tehnika"){
                            if(infiteh.length<2){
                                infiteh.push(lista[i]);
                                lista[i].primljena=true;
                                console.log("primljen je na infiteh "+lista[i]);
                            }
                            else{
                                for(let k=0;k<infiteh.length;k++){
                                    if(lista[i].izbor[0].bodovi>=infiteh[k].izbor[0].bodovi){
                                        infiteh[k]=lista[i];
                                        lista[i].primljena=true;

                                    }
                                    // else{
                                    //     baze.push(lista[i]);
                                    // }
                                }
                         }
                        
                        }
                        else if(lista[i].izbor[1].naziv=="Informatika baze podataka"){
                            if(baze.length<2){
                                baze.push(lista[i]);
                                lista[i].primljena=true;

                                console.log("primljen je na baze "+lista[i]);
                            }
                            else{
                                for(let h=0;h<baze.length;h++){
                                    if(lista[i].izbor[0].bodovi>=baze[h].izbor[0].bodovi){
                                        baze[h]=lista[i];
                                        lista[i].primljena=true;

                                    }
                                    // else{
                                    //     infiteh.push(lista[i]);
                                    // }
                                }
                            }
                        }
                    } 
                  
                    
                }
            }
        }
    } 

    console.log(infiteh);
    console.log(inf);
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
    
})