

export function paivitaPisteet(db, kilpailijaId, osumat, pisteet, napakympit,osumalista) {
    return new Promise(async (resolve, reject) => {
        let transaction = db.transaction(['Kilpailijat'], 'readwrite');
        let objectStore = transaction.objectStore('Kilpailijat');
        
        // kilpailija ID:n perusteella
        let request = objectStore.get(kilpailijaId);
        
        request.onsuccess = function(event) {
            let kilpailija = request.result;
            console.log(kilpailija)
            
            if (!kilpailija) {
                reject(`Kilpailijaa ID:llä ${kilpailijaId} ei löytynyt.`);
                return;
            }
            
            // päivitetään pisteet
            kilpailija.tulokset.osumat = (kilpailija.tulokset.osumat || 0) + osumat;
            kilpailija.tulokset.pisteet = (kilpailija.tulokset.pisteet || 0) + pisteet;
            kilpailija.tulokset.napakympit = (kilpailija.tulokset.napakympit || 0) + napakympit;
            kilpailija.ammuttu = true;
            kilpailija.tulokset.osumalista = osumalista;

            console.log('pisteet kilpailijalle:', kilpailija);
            
            // Tallenna päivitetyt pisteet
            let updateRequest = objectStore.put(kilpailija);
            
            updateRequest.onsuccess = function(event) {
                resolve(`Kilpailijan ${kilpailija.etunimi} ${kilpailija.sukunimi} pisteet ${kilpailija.tulokset.pisteet} (${kilpailija.tulokset.osumalista}) päivitetty!`);
            };
            
            updateRequest.onerror = function(event) {
                console.error("Pisteiden tallennus epäonnistui", event);
                reject('Pisteiden tallennus epäonnistui');
            };
        };
        
        request.onerror = function(event) {
            console.error("Kilpailijan haku epäonnistui", event);
            reject('Kilpailijan haku epäonnistui');
        };
    });
}
