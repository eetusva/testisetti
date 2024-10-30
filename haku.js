export function haeKilpailija(db, etunimi, sukunimi, tulos_naytto) {
    let transaction = db.transaction(['Kilpailijat'], 'readonly');
    let objectStore = transaction.objectStore('Kilpailijat');

    // Tähän salauksenpurkufunktio (iteroitavalle listalle)
    
    let found = false;
    objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            if (cursor.value.etunimi === etunimi && cursor.value.sukunimi === sukunimi) {
                let kilpailijaDiv = document.createElement('div');

                kilpailijaDiv.innerHTML = `
                    <p> Löytyi kilpailija: ${cursor.value.id}  ${cursor.value.etunimi} ${cursor.value.sukunimi}, Seura: ${cursor.value.seura}, Luokka: ${cursor.value.luokka}</p>
                    <button class="poista-btn">Poista</button>
                `;

                kilpailijaDiv.querySelector('.poista-btn').addEventListener('click', function() {
                    let deleteTransaction = db.transaction(['Kilpailijat'], 'readwrite');
                    let deleteObjectStore = deleteTransaction.objectStore('Kilpailijat');
                    let deleteRequest = deleteObjectStore.delete(cursor.value.id);

                    deleteRequest.onsuccess = function(event) {
                        
                        kilpailijaDiv.remove();
                        tulos_naytto.textContent = `Kilpailija: ${cursor.value.id}  ${cursor.value.etunimi} ${cursor.value.sukunimi}, Seura: ${cursor.value.seura}, Luokka: ${cursor.value.luokka} poistettu`
                        setTimeout(() => {
                            tulos_naytto.textContent = '';
                        }, 5000);
                        document.getElementById('search-form').reset();
                    };

                    deleteRequest.onerror = function(event) {
                        console.error('Kilpailijan poistaminen epäonnistui', event);
                    };
                });

                tulos_naytto.appendChild(kilpailijaDiv);
                found = true;


                setTimeout(() => {
                    tulos_naytto.textContent = '';
                }, 5000);
                document.getElementById('search-form').reset();
            }

            cursor.continue();
        } else {
            if (!found) {
                tulos_naytto.textContent = 'Kilpailijaa ei löydy tietokannasta.';
            }
        }
    };
}

export function haeKilpailijaIDlla(db, kilpailijaId, tulos_naytto) {
    let transaction = db.transaction(['Kilpailijat'], 'readonly');
    let objectStore = transaction.objectStore('Kilpailijat');
    
    let request = objectStore.get(kilpailijaId);

    // Tähän salauksenpurkufunktio (ID)
    
    request.onsuccess = function(event) {
        let kilpailija = request.result;
        if (kilpailija) {
            tulos_naytto.textContent = 
                `Löytyi ${kilpailijaId} - ${kilpailija.etunimi} ${kilpailija.sukunimi}, Seura: ${kilpailija.seura}, Luokka: ${kilpailija.luokka}`;
        } else {
            tulos_naytto.textContent = `Kilpailijaa ID:llä ${kilpailijaId} ei löydy.`;
        }

        setTimeout(() => {
            tulos_naytto.textContent = '';
        }, 5000);
        document.getElementById('search-id-form').reset();
    };

    request.onerror = function(event) {
        console.error('Kilpailijan hakeminen epäonnistui', event);
    };
}

export function haeKaikkiKilpailijat(db) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(['Kilpailijat'], 'readonly');
        let objectStore = transaction.objectStore('Kilpailijat');
        let request = objectStore.getAll();

        request.onsuccess = function(event) {

            // Tähänkö salauksenpurkufunktio (iteroitavalle listalle)????

            resolve(request.result);  // Palauttaa listan kilpailijoista
        };

        request.onerror = function(event) {
            console.error("Kilpailijoiden haku epäonnistui", event);
            reject('Kilpailijoiden haku epäonnistui');
        };
    });

}
