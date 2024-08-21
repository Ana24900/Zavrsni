var osnovniurl='http://localhost:4000/login';


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("forma").addEventListener("submit",async function(event) {
        event.preventDefault();
    
        var email = document.getElementById("user").value;
        var lozinka = document.getElementById("lozinka").value;
        
        var podatak = {
            email: email,
            lozinka: lozinka
        };
        
        try {
            const response = await fetch(osnovniurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(podatak)
            });
            const data = await response.json();
            if (data.success) {
                console.log("Pronaden administrator");
                window.location.href = 'stranica.html';
            } else {
                document.getElementById("poruka").textContent = "Korisnički račun ne postoji " + data.username + " " + data.password;
            }
        } catch (er) {
            console.log("greska");
        }
    });
});
document.getElementById("profesori").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='pocetna_prof.html'
})