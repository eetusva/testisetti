document.getElementById("kisan-lomake").addEventListener("submit", function(event) {
    event.preventDefault();

    // Haetaan syötetyt tiedot
    const yhdistys = document.getElementById("yhdistys").value;
    const paikka = document.getElementById("paikka").value;
    const ajankohta = document.getElementById("ajankohta").value;
    const laukausmaara = document.getElementById("laukausmaara").value;

    // Tarkistetaan, että kaikki kentät ovat täytettyjä
    if (yhdistys && paikka && ajankohta && laukausmaara) {
        // Näytetään kilpailun tiedot
        document.getElementById("kilpailun-tiedot").innerHTML = `
            <p><strong>Järjestävä yhdistys:</strong> ${yhdistys}</p>
            <p><strong>Kilpailupaikka:</strong> ${paikka}</p>
            <p><strong>Kilpailun ajankohta:</strong> ${ajankohta}</p>
            <p><strong>Laukausmäärä:</strong> ${laukausmaara}</p>
            <button id="muokkaa-btn" class="btn-small-red">Muokkaa</button>
            <button id="poista-btn" class="btn-small-red">Poista</button>
        `;

        // Muokkaa-painike
        document.getElementById("muokkaa-btn").addEventListener("click", function() {
            document.getElementById("yhdistys").value = yhdistys;
            document.getElementById("paikka").value = paikka;
            document.getElementById("ajankohta").value = ajankohta;
            document.getElementById("laukausmaara").value = laukausmaara;
        });

        // Poista-painike
        document.getElementById("poista-btn").addEventListener("click", function() {
            document.getElementById("kilpailun-tiedot").innerHTML = `<p>Ei luotuja kilpailuja</p>`;
        });

        // Tyhjennetään lomake
        document.getElementById("kisan-lomake").reset();
    } else {
        alert("Täytä kaikki kentät ennen kilpailun luomista.");
    }
});
