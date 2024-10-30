export function avaaTietokanta() {
    return new Promise((resolve, reject) => {
        // Avaa tietokanta, versio 1
        let request = indexedDB.open('Kilpailijatietokanta', 1);

        // Tietokannan päivitys tai ensimmäinen luonti
        request.onupgradeneeded = (event) => {
            let db = event.target.result;

            // Tarkista ja luo tarvittavat objectStoret, jos ne eivät jo ole olemassa
            if (!db.objectStoreNames.contains('Avaimet')) {
                db.createObjectStore('Avaimet', { keyPath: 'id', autoIncrement: true });
            }

            if (!db.objectStoreNames.contains('Kilpailu')) {
                db.createObjectStore('Kilpailu', { keyPath: 'id', autoIncrement: true });
            }

            if (!db.objectStoreNames.contains('Kilpailijat')) {
                db.createObjectStore('Kilpailijat', { keyPath: 'id', autoIncrement: true });
            }

            if (!db.objectStoreNames.contains('SalaKilpailijat')) {
                db.createObjectStore('SalaKilpailijat', { keyPath: 'id', autoIncrement: true });
            }
        };

        // Kun tietokanta on avattu onnistuneesti
        request.onsuccess = (event) => {
            let db = event.target.result;
            console.log("Tietokanta on avattu onnistuneesti!");
            resolve(db);
        };

        // Jos tietokannan avaaminen epäonnistuu
        request.onerror = (event) => {
            console.error("Tietokannan avaaminen epäonnistui", event);
            reject(event);
        };
    });
}
