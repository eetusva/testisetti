

//document.addEventListener('DOMContentLoaded', () => {
    let sija = 1;
    let sarja;

    let kontti = document.createElement('div')
    kontti.className = 'kontti'

    let etusivuBtn = document.createElement('button');
    etusivuBtn.textContent = 'Etusivu';
    kontti.appendChild(etusivuBtn);
    etusivuBtn.onclick = () => {location.href = 'index.html'}

    let kilpailuTiedot = document.createElement('div');
    kontti.appendChild(kilpailuTiedot);
    kilpailuTiedot.textContent = 'Kilpailun tiedot';

    let poyta = document.createElement('table');
    poyta.className = 'tulokset';
    kontti.appendChild(poyta);

    let otsikot = document.createElement('thead');
    poyta.appendChild(otsikot);

    let otsikko = document.createElement('tr');
    otsikot.appendChild(otsikko);

    let sijaOtsikko = document.createElement('th');
    let nimiOtsikko = document.createElement('th');
    let osumaOtsikko = document.createElement('th');
    let tulosOtsikko = document.createElement('th');

    sijaOtsikko.textContent = ' '
    nimiOtsikko.textContent = 'Nimi';
    osumaOtsikko.textContent = 'Osumat';
    tulosOtsikko.textContent = 'Yht.'

    otsikko.appendChild(sijaOtsikko);
    otsikko.appendChild(nimiOtsikko);
    otsikko.appendChild(osumaOtsikko);
    otsikko.appendChild(tulosOtsikko);
    
    let runko = document.createElement('tbody');
    runko.id = 'runko';
    poyta.appendChild(runko);

    let btnKontti = document.createElement('div');
    btnKontti.id = 'btnKontti'
    kontti.appendChild(btnKontti);

    let Kaikki = document.createElement('button');
    Kaikki.textContent = 'Kaikki';
    let H = document.createElement('button');
    H.textContent = 'H';
    let H50 = document.createElement('button');
    H50.textContent = 'H50';

    Kaikki.onclick = () => {sija = 1; haeSarjoittain('all')};
    H.onclick = () => {sija = 1; haeSarjoittain('yleinen')};
    H50.onclick = () => {sija = 1; haeSarjoittain('senior')};

    btnKontti.appendChild(Kaikki);
    btnKontti.appendChild(H)
    btnKontti.appendChild(H50);
    
    document.body.appendChild(kontti);

    // Modaali
    let modaali = document.createElement('div');
    modaali.id = 'modaali';
    modaali.className = 'modaali';

    let sulje = document.createElement('span');
    sulje.id = 'suljeModaali';
    sulje.className = 'sulje';
    sulje.textContent = 'X';
    modaali.appendChild(sulje);

    let modaaliSisalto = document.createElement('div');
    modaaliSisalto.className = 'ModaaliSisalto';
    modaali.appendChild(modaaliSisalto);    

    let kilpailijaKortti = document.createElement('pre');
    kilpailijaKortti.id = 'korttiSisalto';

    let poisto = document.createElement('button');
    poisto.id = 'rivinPoisto';
    poisto.textContent = 'Poista kilpailija';
    poisto.style.backgroundColor = 'orange';
    poisto.style.color = 'black';

    
    modaaliSisalto.appendChild(kilpailijaKortti);
    modaaliSisalto.appendChild(poisto);

    document.body.appendChild(modaali);


    // rivinlisäysfunktio
    function lisaaRivi(nimi, osumat, tulos, id, seura) {
        
        const tableBody = document.querySelector('tbody');
        const rivi = document.createElement('tr');

        const sijaSarake = document.createElement('td');
        sijaSarake.textContent = sija+'.';
        sija += 1;
        
        const nimisarake = document.createElement('td');
        nimisarake.textContent = nimi;
        
        const osumaSarake = document.createElement('td');
        osumaSarake.textContent = osumat;
        
        const tulosSarake = document.createElement('td');
        tulosSarake.textContent = tulos;

        const idSarake = document.createElement('td')
        idSarake.textContent = id;
        idSarake.style.display = 'none';

        const seuraSarake = document.createElement('td');
        seuraSarake.textContent = seura;
        seuraSarake.style.display = 'none';

        const sarjaSarake = document.createElement('td');
        sarjaSarake.textContent = sarja;
        sarjaSarake.style.display = 'none';

        rivi.appendChild(sijaSarake);
        rivi.appendChild(nimisarake);
        rivi.appendChild(osumaSarake);
        rivi.appendChild(tulosSarake);  
        rivi.appendChild(idSarake); 
        rivi.appendChild(seuraSarake);
        rivi.appendChild(sarjaSarake);
        
        tableBody.appendChild(rivi); //lisätään rivit tbodyyn
    }

    function haeKilpailijat() {
        return new Promise(async (resolve, reject) => {

            const { puraKaikkiTiedot } = await import('./aes.js');
            puraKaikkiTiedot()

            // Avataan tietokanta
            const request = indexedDB.open('Kilpailijatietokanta', 1);
    
            request.onerror = function(event) {
                console.error('Tietokannan avaus epäonnistui.', event);
                reject('Tietokannan avaus epäonnistui.');
            };
    
            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction('Kilpailijat', 'readonly');
                const objectStore = transaction.objectStore('Kilpailijat');
    
                const kilpailijat = [];
                
    
                // Hakee kaikkien tiedot objectStoresta
                const requestAll = objectStore.openCursor();
    
                requestAll.onsuccess = function(event) {
                    
                    const cursor = event.target.result;
                    if (cursor) {
                        kilpailijat.push(cursor.value); // Lisätään arvot listaan
                        cursor.continue(); // Siirrytään seuraavaan kilpailijaan
                    } else {
                        // Kaikki tiedot on haettu, palautetaan arvot
                        resolve(kilpailijat);
                    }
                };
    
                requestAll.onerror = function(event) {
                    console.error('Tietojen haku epäonnistui.', event);
                    reject('Tietojen haku epäonnistui.');
                };
            };
        });
    }

    // Haku- ja sorttaus kilpailijat sarjan mukaan
    function haeSarjoittain(sarja) {
        document.getElementById('runko').innerHTML = '';
        // Hakee lista ja sorttaa
        haeKilpailijat().then((kilpailijat) => {
            const sarjaKilpailijat = sarjoittain(kilpailijat, sarja);
            sarjaKilpailijat.forEach(item => {
                lisaaRivi(item.etunimi + ' ' + item.sukunimi, item.tulokset.osumalista, item.tulokset.pisteet, item.id, item.seura, item.sarja);
            });
            //console.log('Kilpailijat:', kilpailijat);
        }).catch((error) => {
            console.error(error);
        });
    }

    // Suodatin sarjan mukaan
    function sarjoittain(kilpailijat, sarja) {
        if (sarja === 'all') {
            return kilpailijat.sort((a, b) => b.tulokset.pisteet - a.tulokset.pisteet);
        } else if (sarja === 'yleinen' || sarja === 'senior') {  // Korjattu vertailu
            return kilpailijat
                .filter(kilpailija => kilpailija.luokka === sarja) // Suodatetaan kilpailijat sarjan mukaan
                .sort((a, b) => b.tulokset.pisteet - a.tulokset.pisteet);
        } else {
            return [];
        }
    }

    haeSarjoittain('all')

    //Modaali    
    const modal = document.getElementById('modaali'); //modal, ettei sekoitu elementtin nimeen
    const modaalinSisalto = document.getElementById('korttiSisalto');
    const modaalinSulkuBtn = document.getElementById('suljeModaali');
    const rivinPoistoBtn = document.getElementById('rivinPoisto');
    let valittuRivi = null;

    // Delegoitu kuuntelija parentille, koska rivikuuntelija ei toiminut
    runko.addEventListener('click', (event) => {
        const row = event.target.closest('tr'); // Tarkistetaan, klikattiinko tr-elementtiä
        if (!row) return; // Jos ei klikattu riviä, lopetetaan
        // Tallenna valittu rivi
        valittuRivi = row;
        // Näytetään kilpailijan tiedot modaalissa
        const nimi = row.cells[1].textContent;
        const osumat = row.cells[2].textContent;
        const tulos = row.cells[3].textContent;
        const seura = row.cells[5].textContent;
        const sarja = row.cells[6].textContent;
        modaalinSisalto.textContent = `
Nimi: ${nimi}
Seura: ${seura}
Sarja: ${sarja}
Osumat: ${osumat}
Tulos: ${tulos}
        `
        
        // Näytetään modaali        
        modal.style.display = 'block';
    });

    // Sulje modaali
    modaalinSulkuBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Poista valittu rivi taulukosta
    rivinPoistoBtn.addEventListener('click', () => {
        if (valittuRivi) {
            let avain = valittuRivi.cells[4].textContent;
            console.log(avain);
            valittuRivi.remove(); // Poista rivi
            modal.style.display = 'none'; // Piilota modaali
            poistaTietue('Kilpailijatietokanta', 1 , 'Kilpailijat', Number(avain));
        }
    });

    function poistaTietue(tietokantaNimi, tietokantaVersio, storeNimi, avain) {
        let request = indexedDB.open(tietokantaNimi, tietokantaVersio);
    
        request.onerror = function(event) {
            console.log("Tietokannan avaaminen epäonnistui:", event.target.errorCode);
        };
    
        request.onsuccess = function(event) {
            let db = event.target.result;
            let transaction = db.transaction([storeNimi], "readwrite");
            let objectStore = transaction.objectStore(storeNimi);
    
            let poistoRequest = objectStore.delete(avain);
    
            poistoRequest.onsuccess = function() {
                console.log("Tietue poistettiin onnistuneesti.");
            };
    
            poistoRequest.onerror = function(event) {
                console.log("Tietueen poistaminen epäonnistui:", event.target.errorCode);
            };
        };
    
        request.onupgradeneeded = function(event) {
            console.log("Tietokannan päivittäminen ei tarpeen tässä, mutta päivityksen käsittelijä täällä.");
        };
    }  

//}); // DOM-kuuntelijan loppusulut
