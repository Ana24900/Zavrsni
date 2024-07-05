
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
        //SLUCAJ KADA JE INFORMATIKA PRVI IZBOR
        if(lista[i].izbor[0].naziv=="Nastavnički informatika" ){
            if(inf.length<6){
                inf.push(lista[i]);
                lista[i].primljena=true;
                console.log("Primljen na inf "+lista[i]);
            }
            else{
                let mini=1000;
                for(let p=0;p<inf.length;p++){
                    if(inf[p].izbor[0].bodovi<mini){
                        mini=inf[p].izbor[0].bodovi;
                    }
                }
                for(let j=0;j<inf.length;j++){
                    if(lista[i].izbor[0].bodovi>=inf[j].izbor[0].bodovi && mini==inf[j].izbor[0].bodovi){
                        let st=inf[j];
                        inf[j]=lista[i];
                        lista[i].primljena=true;
                        let ind=0;
                        for(let c=0;c<lista.length;c++){
                            if(st==lista[c]){
                                ind=c;
                            }
                        }
                        lista[ind].primljena=false;
                        console.log(lista[i].ime+"izgurao "+st.ime);
                        if(st.izbor[1].naziv=="Nastavnički informatika i tehnika"){
                            if(infiteh.length<6){
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
                                    
                                }
                         }
                        }
                        else if(st.izbor[1].naziv=="Informatika baze podataka"){
                            if(baze.length<5){
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
                                   
                                }
                            }
                        }
                        if(st.primljena==false){
                            if(st.izbor[2]=="Nastavnički informatika i tehnika"){
                                infiteh.push(st);
                                lista[ind].primljena=true;
                            }
                            else{
                                baze.push(st);
                                lista[ind].primljena=true;

                            }

                        }
                    }
                    
                    else if(lista[i].primljena==false){
                        console.log("koliko puta vamo ulazi");
                        if(lista[i].izbor[1].naziv=="Nastavnički informatika i tehnika"){
                            if(infiteh.length<6){
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
                                    
                                }
                         }
                        
                        }
                        else if(lista[i].izbor[1].naziv=="Informatika baze podataka"){
                            if(baze.length<5){
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
                                    
                                }
                            }
                        }
                    } 
                  
                    
                }
            }
        }
        //SLUCAJ KADA JE PRVI IZBOR INFORMATIKA I TEHNIKA
        else if(lista[i].izbor[0].naziv=="Nastavnički informatika i tehnika" ){
            if(infiteh.length<6){
                infiteh.push(lista[i]);
                lista[i].primljena=true;
                console.log("Primljen na infiteh "+lista[i]);
            }
            else{
                let mini=1000;
                for(let p=0;p<inf.length;p++){
                    if(inf[p].izbor[0].bodovi<mini){
                        mini=inf[p].izbor[0].bodovi;
                    }
                }
                for(let j=0;j<infiteh.length;j++){
                    if(lista[i].izbor[0].bodovi>=infiteh[j].izbor[0].bodovi && mini==infiteh[j].izbor[0].bodovi){
                        let st=infiteh[j];
                        infiteh[j]=lista[i];
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
                            if(infiteh.length<6){
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
                                }
                         }
                        }
                        else if(st.izbor[1].naziv=="Informatika baze podataka"){
                            if(baze.length<5){
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
        
                                }
                            }
                        }
                        if(st.primljena==false){
                            if(st.izbor[2]=="Nastavnički informatika"){
                                inf.push(st);
                                lista[ind].primljena=true;
                            }
                            else{
                                baze.push(st);
                                lista[ind].primljena=true;

                            }

                        }
                    }
                    else if(lista[i].primljena==false){
                        console.log("koliko puta vamo ulazi");
                        if(lista[i].izbor[1].naziv=="Nastavnički informatika"){
                            if(inf.length<6){
                                inf.push(lista[i]);
                                lista[i].primljena=true;
                                console.log("primljen je na infiteh "+lista[i]);
                            }
                            else{
                                for(let k=0;k<inf.length;k++){
                                    if(lista[i].izbor[0].bodovi>=inf[k].izbor[0].bodovi){
                                        inf[k]=lista[i];
                                        lista[i].primljena=true;

                                    }
                                    else{
                                        baze.push(lista[i]);
                                        lista[i].primljena=true;
                                    }
                                }
                         }
                        
                        }
                        else if(lista[i].izbor[1].naziv=="Informatika baze podataka"){
                            if(baze.length<5){
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
                                    else{
                                        inf.push(lista[i]);
                                        lista[i].primljena=true;
                                    }
                                }
                            }
                        }
                    } 
                  
                    
                }
            }
        }
        //SLUCAJ KAD SU BAZE PRVI IZBOR
        else if(lista[i].izbor[0].naziv=="Informatika baze podataka"){
            if(baze.length<5){
                baze.push(lista[i]);
                lista[i].primljena=true;
                console.log("Primljen na baze kao prvi izbor "+lista[i]);
            }
            else{
                let mini=1000;
                for(let p=0;p<inf.length;p++){
                    if(inf[p].izbor[0].bodovi<mini){
                        mini=inf[p].izbor[0].bodovi;
                    }
                }
                for(let j=0;j<baze.length;j++){
                    if(lista[i].izbor[0].bodovi>=baze[j].izbor[0].bodovi && mini==baze[j].izbor[0].bodovi){
                        let st=baze[j];
                        baze[j]=lista[i];
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
                            if(infiteh.length<6){
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
                                }
                         }
                        }
                        else if(st.izbor[1].naziv=="Nastavnički informatika"){
                            if(inf.length<6){
                                inf.push(st);
                                lista[ind].primljena=true;
                                console.log("primljen je na baze "+st);
                            }
                            else{
                                for(let h=0;h<inf.length;h++){
                                    if(st.izbor[1].bodovi>=inf[h].izbor[1].bodovi){
                                        inf[h]=st;
                                        lista[ind].primljena=true;
                                    }
        
                                }
                            }
                        }
                        if(st.primljena==false){
                            if(st.izbor[2]=="Nastavnički informatika"){
                                inf.push(st);
                                lista[ind].primljena=true;
                            }
                            else{
                                infiteh.push(st);
                                lista[ind].primljena=true;

                            }

                        }
                    }
                    else if(lista[i].primljena==false){
                        console.log("koliko puta vamo ulazi");
                        if(lista[i].izbor[1].naziv=="Nastavnički informatika"){
                            if(inf.length<6){
                                inf.push(lista[i]);
                                lista[i].primljena=true;
                                console.log("primljen je na infiteh "+lista[i]);
                            }
                            else{
                                for(let k=0;k<inf.length;k++){
                                    if(lista[i].izbor[0].bodovi>=inf[k].izbor[0].bodovi){
                                        inf[k]=lista[i];
                                        lista[i].primljena=true;

                                    }
                                    else{
                                        baze.push(lista[i]);
                                        lista[i].primljena=true;
                                    }
                                }
                         }
                        
                        }
                        else if(lista[i].izbor[1].naziv=="Informatika baze podataka"){
                            if(baze.length<5){
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
                                    else{
                                        inf.push(lista[i]);
                                        lista[i].primljena=true;
                                    }
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