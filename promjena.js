document.addEventListener('DOMContentLoaded', (e) => {
    // Uklanjanje e.preventDefault() ovdje jer nije potrebno
    let listaprof = [];

    // Funkcija za dohvaćanje URL parametra
    function ucitavanje(param) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    let podatak = parseInt(ucitavanje('podatak')); // Učitava ID iz URL-a
    let logirani = null;
    let pravi=null;
    if(pravi!=NaN){
        pravi=logirani;
    }
    // Dohvati popis profesora sa servera
    fetch("http://localhost:4000/popis_prof", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        }
    })
    .then(res => res.json())
    .then(data => {
        listaprof = data;
        console.log("Dohvaćeni podaci:", listaprof);

        // Pronađi ulogiranog profesora prema ID-u
        pravi = listaprof.find(prof => prof.id === podatak);

        if (pravi) {
            console.log("Ulogirani profesor:", pravi);

            // Popuni polja forme s trenutnim podacima profesora
            document.getElementById("ime").value = pravi.ime || '';
            document.getElementById("prezime").value = pravi.prezime || '';
            document.getElementById("email").value = pravi.email || '';
            document.getElementById("brojMobitela").value = pravi.kontakt || '';
            document.getElementById("ured").value = pravi.ured || '';
        } else {
            console.log("Profesor s ID-om " + podatak + " nije pronađen.");
        }
    })
    .catch(error => {
        console.error("Greška pri dohvaćanju podataka:", error);
    });

    // Event listener za promjenu podataka
    document.getElementById("promjena").addEventListener("click", (e) => {
        e.preventDefault();

        if (!pravi) {
            alert("Profesor nije pronađen ili podaci nisu učitani.");
            return;
        }
        
        // Dohvati vrijednosti iz input polja
        var ime = document.getElementById("ime").value;
        var prez = document.getElementById("prezime").value;
        var em = document.getElementById("email").value;
        var kon = document.getElementById("brojMobitela").value;
        var ur = document.getElementById("ured").value;
        var loz = document.getElementById("lozinka").value;

        // Ažuriraj podatke ako polja nisu prazna
        if (ime) pravi.ime = ime;
        if (prez) pravi.prezime = prez;
        if (em) pravi.email = em;
        if (kon) pravi.kontakt = kon;
        if (ur) pravi.ured = ur;
        if (loz && loz.length >= 8) {
            pravi.lozinka = loz;
        } else if (loz) {
            alert("Lozinka mora imati najmanje 8 znakova.");
            return;  // Ako lozinka nije ispravna, zaustavi proces
        }

        console.log("Ažurirani podaci profesora:", pravi);

        // Ovdje biste obično poslali ažurirane podatke natrag na server
        fetch("http://localhost:4000/update_prof", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pravi)
        })
        .then(response => {
            if (response.ok) {
                alert("Podaci su uspješno ažurirani!");
            } else {
                alert("Došlo je do greške prilikom ažuriranja podataka.");
            }
        })
        .catch(error => {
            console.error("Greška pri slanju podataka:", error);
        });
    });
});
