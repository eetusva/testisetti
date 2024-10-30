let db;

// IndexedDB ja object store alustus
async function alustaIndexedDB() {

    const { avaaTietokanta } = await import('./db.js');
    db = await avaaTietokanta();
    /*
    let request = indexedDB.open('Kilpailijatietokanta', 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        // object store 'Kilpailut' luonti
        if (!db.objectStoreNames.contains('Kilpailu')) {
            db.createObjectStore('Kilpailu', { keyPath: 'id', autoIncrement: true });
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log('IndexedDB avattu onnistuneesti');
    };

    request.onerror = function(event) {
        console.error('IndexedDB-avaus epäonnistui:', event.target.errorCode);
    }; */
}

// tietojen tallennus IndexedDB:hen
function tallennaKilpailu(yhdistys, paikka, ajankohta, laukausmaara) {
    let transaction = db.transaction(['Kilpailu'], 'readwrite');
    let store = transaction.objectStore('Kilpailu');
    let kilpailu = {
        yhdistys: yhdistys,
        paikka: paikka,
        ajankohta: ajankohta,
        laukausmaara: laukausmaara
    };

    let addRequest = store.add(kilpailu);

    addRequest.onsuccess = function(event) {
        let kilpailuId = event.target.result;
        console.log('Kilpailu tallennettu onnistuneesti!');
        naytaKilpailunTiedot(kilpailuId, yhdistys, paikka, ajankohta, laukausmaara);
    };

    addRequest.onerror = function(event) {
        console.error('Kilpailun tallennus epäonnistui:', event.target.error);
    };
}

// kilpailun tietojen näyttäminen
function naytaKilpailunTiedot(kilpailuId, yhdistys, paikka, ajankohta, laukausmaara) {
    document.getElementById("kilpailun-tiedot").innerHTML = `
        <p><strong>Järjestävä yhdistys:</strong> ${yhdistys}</p>
        <p><strong>Kilpailupaikka:</strong> ${paikka}</p>
        <p><strong>Kilpailun ajankohta:</strong> ${ajankohta}</p>
        <p><strong>Laukausmäärä:</strong> ${laukausmaara}</p>
        <button id="muokkaa-btn" class="btn-small-red">Muokkaa</button>
        <button id="poista-btn" class="btn-small-red">Poista</button>
    `;

    // muokkaus-nappula
    document.getElementById("muokkaa-btn").addEventListener("click", function() {
        document.getElementById("yhdistys").value = yhdistys;
        document.getElementById("paikka").value = paikka;
        document.getElementById("ajankohta").value = ajankohta;
        document.getElementById("laukausmaara").value = laukausmaara;
    });

    // poista-nappula
    document.getElementById("poista-btn").addEventListener("click", function() {
        poistaKilpailu(kilpailuId);
    });
}

// Kilpailun poistaminen
function poistaKilpailu(kilpailuId) {
    let transaction = db.transaction(['Kilpailu'], 'readwrite');
    let store = transaction.objectStore('Kilpailu');
    let deleteRequest = store.delete(kilpailuId);

    deleteRequest.onsuccess = function() {
        console.log('Kilpailu poistettu onnistuneesti!');
        document.getElementById("kilpailun-tiedot").innerHTML = `<p>Ei luotuja kilpailuja</p>`;
    };

    deleteRequest.onerror = function(event) {
        console.error('Kilpailun poisto epäonnistui:', event.target.error);
    };
}

// Lomakkeen käsittely
function kasitteleLomake(event) {
    event.preventDefault();

    const yhdistys = document.getElementById("yhdistys").value;
    const paikka = document.getElementById("paikka").value;
    const ajankohta = document.getElementById("ajankohta").value;
    const laukausmaara = document.getElementById("laukausmaara").value;

    if (yhdistys && paikka && ajankohta && laukausmaara) {
        tallennaKilpailu(yhdistys, paikka, ajankohta, laukausmaara);
        document.getElementById("kisan-lomake").reset();
    } else {
        alert("Täytä kaikki kentät ennen kilpailun luomista.");
    }
}

document.getElementById("kisan-lomake").addEventListener("submit", kasitteleLomake);

alustaIndexedDB();
