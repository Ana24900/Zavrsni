
//Uključujemo paket "express"
let idPopisa=1039;
let idprof=10010;
const express = require("express");

// i stvaramo novu aplikaciju
const app = express();
const administratiri=[
  { email: 'iva', lozinka: 'iva123' },
  { email: 'lara', lozinka: '12345678' },
  { email: 'ana', lozinka: 'ana123'}
];
app.use(function (req, res, next) {
  // Stranice (izvori) koji imaju pristup
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Dozvoljene metode zahtjeva
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Dozvoljena zaglavlja zahjteva
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Postaviti na TRUE ako je potrebno slanje cookie-ja uz zahtjev API-ju
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Nastavi na iduci sloj
  next();
});

const body_parser = require("body-parser");
// obradjuje zahtjeve tipa (application/json content-type)
app.use(body_parser.json());

// Ucitavamo podatke iz datoteke
let popis = require("./popis");

// Definiramo osnovnu rutu za GET zahtjev
app.get("/", (req, res) =>
  res.send("Dobrodošli na server!")
);
app.get("/popis", (req, res) => res.json(popis));

// POST ruta za dodavanje novog naloga
app.post("/popis/novi", (req, res) => {
  const podatak = req.body;
  
    podatak.id = idPopisa;
    idPopisa++;
    popis.push(podatak);
    res.json(popis);
  
});

// Osluškuje konekcije za zadanom portu
app.listen(4000, () => console.log("Server sluša port 4000!"));

let popis2 = require("./popis_prof");

// Definiramo osnovnu rutu za GET zahtjev
app.get("/", (req, res) =>
  res.send("Dobrodošli na server!")
);
app.get("/popis_prof", (req, res) => res.json(popis2));

app.post("/popis_prof/novi", (req, res) => {
    const podatak = req.body;
    
      podatak.id = idPopisa;
      idPopisa++;
      popis2.push(podatak);
      res.json(popis2);
    
  });

  app.put("/studenti/:id", (req, res) => {
    const studid= req.params.id;
    const novi = req.body;
    console.log("Promjena studenta: ", studid);
  
    let nasao = false;
    const noviNizPodataka = [];

    popis.forEach(stari => {
      if (stari.id == studid) {
        novi.id = studid;  // Dodajemo ID u novi objekt
        noviNizPodataka.push(novi);
        console.log("Nasao sam podatak za promjenu");
        nasao = true;
      } else {
        noviNizPodataka.push(stari);
      }
    });
    if (nasao) {
      popis = noviNizPodataka;
      res.status(200).json({ poruka: "Uspjesno azurirani podaci!!", popis: noviNizPodataka });
    } else {
      res.status(204).send();
    }
  });
  
  

app.post('/login', (req, res) => {
  let  {email, lozinka } = req.body;
  // Pronađi korisnika s odgovarajućim korisničkim imenom i lozinkom
  const user = administratiri.find(user => user.email === email && user.lozinka === lozinka);
  console.log(`Pronađeni korisnik: ${JSON.stringify(user)}`); //provjeravam jeli dobra pohrana
  if(user) {
      res.json({ success: true, email: email }); 
  } else {
      res.json({ success: false,email: email,lozinka: lozinka });
  }
});
app.post('/login/prof', (req, res) => {
  let  {email, lozinka } = req.body;
  // Pronađi korisnika s odgovarajućim korisničkim imenom i lozinkom
  const user = popis2.find(user => user.email === email && user.lozinka === lozinka);
  console.log(`Pronađeni korisnik: ${JSON.stringify(user)}`); //provjeravam jeli dobra pohrana
  if(user) {
      res.json({ success: true, user }); 
  } else {
      res.json({ success: false,email: email,lozinka: lozinka });
  }
});
app.delete('/popis/:id', (req, res) => {
  const studentid = Number(req.params.id);
  const podaciNakonBrisanja = popis.filter((student) => student.id != studentid);

  if (!podaciNakonBrisanja) {
    res.status(500).send('Podatak za brisanje nije pronađen');
  } else {
    popis = podaciNakonBrisanja;
    res.send(popis);
  }
});
app.delete('/popis_prof/:id', (req, res) => {
  const profid = Number(req.params.id);
  const podaciNakonBrisanja = popis2.filter((prof) => prof.id != profid);

  if (!podaciNakonBrisanja) {
    res.status(500).send('Podatak za brisanje nije pronađen');
  } else {
    popis2 = podaciNakonBrisanja;
    res.send(popis2);
  }
});