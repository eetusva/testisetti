

export async function tallennaKilpailija(db, uusiKayttaja, tulos_naytto) {

    const { luoAvain, salattuDataTallennus } = await import('./aes.js');
    const avain = await luoAvain();
    tallennaAvain(db, avain);
    salattuDataTallennus(uusiKayttaja);

    let transaction = db.transaction(['Kilpailijat'], 'readwrite');
    let objectStore = transaction.objectStore('Kilpailijat');
    let request = objectStore.add(uusiKayttaja,);

    request.onsuccess = function(event) {
        let kilpailijanID = request.result;
        tulos_naytto.textContent = `Kilpailija nro ${kilpailijanID} ${uusiKayttaja.etunimi} ${uusiKayttaja.sukunimi} ${uusiKayttaja.seura} on tallennettu!`;

        setTimeout(() => {
            tulos_naytto.textContent = '';
        }, 4000);
        document.getElementById('login-form').reset();
    };

    request.onerror = function(event) {
        console.error('Tietojen tallentaminen epäonnistui', event);
    };
}

export function tallennaAvain(db, avain) {
    let transaction = db.transaction(['Avaimet'], 'readwrite');
    let objectStore = transaction.objectStore('Avaimet');
    let request = objectStore.add(avain);

    request.onsuccess = function(event) {
        let tallennettuAvain = request.result;
        console.log(`Avaimen ${tallennettuAvain} tallennus onnistui`, event)
    };

    request.onerror = function(event) {
        console.error('Avaimen tallennus epäonnistui!!!', event);
    }
}