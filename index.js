
//Uključujemo paket "express"
const express = require("express");
// i stvaramo novu aplikaciju
const app = express();

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
// app.post("/popis", (req, res) => {
//   const podatak = req.body;
//   if (!provjera(podatak)) {
//     res.status(400).json({ poruka: "Zahtjev nije ispravan!" });
//   } else {
//     podatak.id = idPopisa;
//     idPopisa++;
//     popis.push(podatak);
//     res.json(popis);
//   }
// });

// Osluškuje konekcije za zadanom portu
app.listen(4000, () => console.log("Server sluša port 4000!"));

// Provjera POST zahtjeva za prvu grupu
// function provjera(tijelo) {
//   console.log(tijelo)
//   if (!tijelo.artikli) {
//    console.log("Popis ne smije biti prazan");
//     return false;
//   }
//   if (!tijelo.cijena) {
//     console.log("Nije definirana cijena");
//      return false;
//    }
//   return true;
// }
