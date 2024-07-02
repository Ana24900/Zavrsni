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
        if(lista[i].izbor[0].naziv=="Nastavnički informatika"){
            if(inf.length<2){
                lista[i].primljena=true;
                inf.push(lista[i]);
            }
            else{
                let minst=inf[0];
                let minindex=0;
                for(let j=0;j<inf.length;j++){
                    if(minst.izbor[0].bodovi>=inf[j].izbor[0].bodovi){
                        minst=inf[j];
                        minindex=j;
                    }
                }
                if(lista[i].izbor[0].bodovi>=minst.izbor[0].bodovi){
                    console.log(minst);
                    inf[minindex]=lista[i];
                    if(minst.izbor[1]=="Nastavnički informatika i tehnika"){
                        if(infiteh.length<2)
                        {
                            infiteh.push(minst);
                        }
                        else{
                            let minbrit=infiteh[0];
                            let minindexit=0;
                            for(let j=0;j<infiteh.length;j++){
                                if(minbrit.izbor[0].bodovi>infiteh[j].izbor[0].bodovi){
                                    minst=infiteh[j];
                                    minindexit=j;
                                }
                            }
                            if(minst.izbor[0].bodovi>=minbrit.izbor[0].bodovi){
                                infiteh[minindexit]=minst;
                            }
                        }
                    }
                }
                
            
            }
        }
        
    }
    console.log(infiteh);
    console.log(inf);
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
})