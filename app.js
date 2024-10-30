
let loginContainer;
let db;
import { paivitaPisteet } from './pisteet.js';
let osumalista = [];
let laukausmaara;
//--------------------------------------------------------------Kilpailijan lisäys sivu---------------------------------------------------------------------
//document.addEventListener('DOMContentLoaded',() => {
    // kontti
    loginContainer = document.createElement('div');
    loginContainer.className = 'login-container';

    // --- Lomake 1: Lisää kilpailija ---
    let form = document.createElement('form');
    form.id = 'login-form';
    form.setAttribute('action', '');

    let h1 = document.createElement('h1');
    h1.textContent = 'Lisää kilpailija';

    // Etunimi
    let etunimiLabel = document.createElement('label');
    etunimiLabel.setAttribute('for', 'etunimi');
    etunimiLabel.textContent = 'Etunimi';

    let etunimiInput = document.createElement('input');
    etunimiInput.setAttribute('type', 'text');
    etunimiInput.setAttribute('name', 'etunimi');
    etunimiInput.id = 'etunimi';
    etunimiInput.required = true;

    // Sukunimi
    let sukunimiLabel = document.createElement('label');
    sukunimiLabel.setAttribute('for', 'sukunimi');
    sukunimiLabel.textContent = 'Sukunimi';

    let sukunimiInput = document.createElement('input');
    sukunimiInput.setAttribute('type', 'text');
    sukunimiInput.setAttribute('name', 'sukunimi');
    sukunimiInput.id = 'sukunimi';
    sukunimiInput.required = true;
    // Seura
    let seuraLabel = document.createElement('label');
    seuraLabel.setAttribute('for', 'seura');
    seuraLabel.textContent = 'Yhdistys, seura';

    let seuraInput = document.createElement('input');
    seuraInput.setAttribute('type', 'text');
    seuraInput.setAttribute('name', 'seura');
    seuraInput.id = 'seura';
    seuraInput.required = true;

        // Radio- ja checkbox-valinnat
    let radioDiv = document.createElement('div');
    radioDiv.className = 'radiot';
    
    let yleinenRadio = document.createElement('input');
    yleinenRadio.setAttribute('type', 'radio');
    yleinenRadio.setAttribute('name', 'luokka');
    yleinenRadio.id = 'yleinen';
    
    let yleinenLabel = document.createElement('label');
    yleinenLabel.setAttribute('for', 'yleinen');
    yleinenLabel.textContent = 'H';

    
    let seniorRadio = document.createElement('input');
    seniorRadio.setAttribute('type', 'radio');
    seniorRadio.setAttribute('name', 'luokka');
    seniorRadio.id = 'senior';

    let seniorLabel = document.createElement('label');
    seniorLabel.setAttribute('for', 'senior');
    seniorLabel.textContent = 'H50';


    // Lisää radiot ja checkboxit radioDiviin
    
    radioDiv.appendChild(yleinenRadio);
    radioDiv.appendChild(yleinenLabel);
    radioDiv.appendChild(seniorRadio);
    radioDiv.appendChild(seniorLabel);

    // Lähetä-painike
    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Lisää kilpailija';

    // lisää kilpailija -lomake
    form.appendChild(h1);
    form.appendChild(etunimiLabel);
    form.appendChild(etunimiInput);
    form.appendChild(sukunimiLabel);
    form.appendChild(sukunimiInput);
    form.appendChild(seuraLabel);
    form.appendChild(seuraInput);
    form.appendChild(radioDiv);
    form.appendChild(submitButton);

    // --- Lomake 2: Hae kilpailija ---
    let searchForm = document.createElement('form');
    searchForm.id = 'search-form';

    let h2 = document.createElement('h2');
    h2.textContent = 'Hae kilpailija';

    
    let hakuEtunimi = document.createElement('input');
    hakuEtunimi.id = 'haku-etunimi';
    hakuEtunimi.setAttribute('type', 'text');
    hakuEtunimi.setAttribute('placeholder', 'Hae etunimellä');
    hakuEtunimi.required = true;

    
    let hakuSukunimi = document.createElement('input');
    hakuSukunimi.id = 'haku-sukunimi';
    hakuSukunimi.setAttribute('type', 'text');
    hakuSukunimi.setAttribute('placeholder', 'Hae sukunimellä');
    hakuSukunimi.required = true;

   
    let searchButton = document.createElement('button');
    searchButton.setAttribute('type', 'submit');
    searchButton.textContent = 'Hae kilpailija';

    // haku-lomake
    searchForm.appendChild(h2);
    searchForm.appendChild(hakuEtunimi);
    searchForm.appendChild(hakuSukunimi);
    searchForm.appendChild(searchButton);

    // tulos
    let tulos_naytto = document.createElement('h1');
    tulos_naytto.id = 'search-result';

    // --- Lomake 3: Hae kilpailija ID:llä ---
    let searchIdForm = document.createElement('form');
    searchIdForm.id = 'search-id-form';
    let searchIdInput = document.createElement('input');
    searchIdInput.id = 'search-id';
    searchIdInput.setAttribute('type', 'number');
    searchIdInput.setAttribute('placeholder', 'Hae ID:llä');
    searchIdInput.required = true;

    let searchIdButton = document.createElement('button');
    searchIdButton.setAttribute('type', 'submit');
    searchIdButton.textContent = 'Hae kilpailija ID:llä';

    // Rakennetaan ID-hakulomake
    searchIdForm.appendChild(searchIdInput);
    searchIdForm.appendChild(searchIdButton);

   
    // --- Palaa etusivulle -painike ---
    let frontpageButton = document.createElement('button');
    frontpageButton.id = 'frontpagebutton';
    frontpageButton.textContent = 'Palaa etusivulle';
    frontpageButton.onclick = () => {
        window.location.href = 'index.html'
    };
    //lisätään formit ja muut
    loginContainer.appendChild(form);
    loginContainer.appendChild(searchForm);
    loginContainer.appendChild(tulos_naytto);
    loginContainer.appendChild(searchIdForm);
    loginContainer.appendChild(frontpageButton);
    
    //  lisätään koko kontaineri sivulle
    document.body.appendChild(loginContainer);


//})

//document.addEventListener('DOMContentLoaded', async () => {
    // tietokannan avaaminen 
    const { avaaTietokanta } = await import('./db.js');
    db = await avaaTietokanta();
//});

//document.addEventListener('DOMContentLoaded', function() {
    // Kilpailijan tallennus lomakkeen lähetyksessä
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        let etunimi = document.getElementById('etunimi').value;
        let sukunimi = document.getElementById('sukunimi').value;
        let seura = document.getElementById('seura').value;
        let luokka = document.querySelector('input[name="luokka"]:checked');
        luokka = luokka ? luokka.id : null;
        
       let uusiKayttaja = { 
            
            etunimi, 
            sukunimi, 
            seura, 
            luokka, 
            ammuttu: false, //onko henkilö jo kerran ampunut
            tulokset:{
                pisteet:0,    // Lisää pisteet
                osumat: 0,  // Alustetaan osumat
                napakympit: 0,// Alustetaan napakympit
                osumalista:[] //osumalista
            }
        };


        // tallennusfunktio 
        const { tallennaKilpailija } = await import('./tallenna.js');
        let tulos_naytto = document.getElementById('search-result');
        tallennaKilpailija(db, uusiKayttaja, tulos_naytto);
    });
    // Kilpailijan haku
    document.getElementById('search-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        let etunimi = document.getElementById('haku-etunimi').value;
        let sukunimi = document.getElementById('haku-sukunimi').value;
        
        // Ladataan hakufunktio 
        const { haeKilpailija } = await import('./haku.js');
        let tulos_naytto = document.getElementById('search-result');
        
        haeKilpailija(db, etunimi, sukunimi, tulos_naytto);
    });
    // Kilpailijan haku ID:n perusteella
    document.getElementById('search-id-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        let kilpailijaId = parseInt(document.getElementById('search-id').value, 10);
        let tulos_naytto = document.getElementById('search-result');

       
        const { haeKilpailijaIDlla } = await import('./haku.js');
        haeKilpailijaIDlla(db, kilpailijaId, tulos_naytto);
    });
//});
//---------------------------------------------------------------------- Laskuri-osio--------------------------------------------------------------------------------------------------
const request = indexedDB.open("Kilpailijatietokanta", 1);
request.onsuccess = function(event) {
    db = event.target.result;

    const transaction = db.transaction(["Kilpailu"], "readonly");
    const store = transaction.objectStore("Kilpailu");

    // laukausmäärän hakeminen
    const cursorRequest = store.openCursor(null, "prev");

    cursorRequest.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const kilpailu = cursor.value;
            laukausmaara = kilpailu.laukausmaara;
            
            
        } else {
            console.log("Tietokanta on tyhjä.");
        }
    };

    cursorRequest.onerror = function(event) {
        console.error("Haku epäonnistui: ", event.target.errorCode);
    };
};
request.onerror = function(event) {
    console.error("IndexedDB virhe: ", event.target.errorCode);
};
//document.addEventListener('DOMContentLoaded', function () {
    // Laskuri-painike
    let counterButton = document.createElement('button');
    counterButton.textContent = 'Laskuri';
    loginContainer.appendChild(counterButton);  // Liitetään painike DOM:iin
    counterButton.addEventListener('click', async function () {
        
        loginContainer.innerHTML = '';

        const { haeKaikkiKilpailijat } = await import('./haku.js'); // Tuo hakufunktio
        let kilpailijat = await haeKaikkiKilpailijat(db); 

        // Vrt. haku.js! Tähänkö salauksenpurkufunktio (iteritavalle listalle)???        
        
        let scoreInput = document.createElement('div');
        scoreInput.className = 'score-input';
        
        let selectElement = document.createElement('select');
        selectElement.id = 'kilpailija-valinta';
        
        let addPoints = document.createElement('button');
        addPoints.id = 'lisaa-pisteet';
        addPoints.textContent = 'Lisää pisteet kilpailijalle';

        let removeButton = document.createElement('button'); //tuloksen poisto-painike---
        removeButton.id = 'remove';
        removeButton.textContent = '\u232B' ;
        let removeButton_ispressed = false;
        
              // --- Palaa etusivulle -painike ---
        let frontpageButton = document.createElement('button');
        frontpageButton.id = 'frontpagebutton';
        frontpageButton.textContent = 'Palaa etusivulle';
        frontpageButton.onclick = () => {
            window.location.href = 'index.html'
        };
        loginContainer.appendChild(frontpageButton); //lisätään etusivupainike
        
        let defaultOption = document.createElement('option');
        defaultOption.textContent = 'Valitse kilpailija';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        // Lisää kilpailijat pudotusvalikkoon
        kilpailijat.forEach(kilpailija => {
            let option = document.createElement('option');
            option.value = kilpailija.id; // Oletetaan että kilpailijalla on "id"-kenttä
            option.textContent = `${kilpailija.etunimi} ${kilpailija.sukunimi}`;
            selectElement.appendChild(option);
        });

       
        scoreInput.innerHTML = `
            <h2>Syötä osumat</h2>
            <label for="person">Valitse kilpailija</label>
        `;
        scoreInput.appendChild(selectElement);
        //painikkeiden luonti
        const osumaButtons = document.createElement('div');
        osumaButtons.className = 'buttons';

        const buttonValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'X']; //painikkeiden arvot

        buttonValues.forEach(value => {
            let btn = document.createElement('button');
            btn.className = 'score-btn';
            btn.setAttribute('data-value', value);
            btn.textContent = value; //painikkeiden tekstit
            osumaButtons.appendChild(btn);
        });
        osumaButtons.appendChild(removeButton); // Poista viimeisin-painike lisätään
        scoreInput.appendChild(osumaButtons); //kaikki napiut

        // Tulokset-elementit
        const results = document.createElement('div');
        results.className = 'results';
        results.innerHTML = `
            <p>Laukausten määrä: <span id="yhteis_osumat">0</span></p>
            <p>Osumien summa: <span id="yhteis_pisteet">0</span></p>
            <p>Napakympit: <span id="napakympit">0</span></p>
            <h2>Syötit osumat:<span id="osumat"></span></h2>
            <h2><span id="viimeisin_osuma" class ="osumat-animate-grow"></span><h2>
        `;

        scoreInput.appendChild(results);
        loginContainer.appendChild(scoreInput);
        loginContainer.appendChild(addPoints); // Lisää pisteet-painike lisäys

        // lasketaan osumat ja pisteet
        let yhteisOsumat = 0;
        let yhteisPisteet = 0;
        let napakympit = 0;

        const yhteisOsumatEl = document.getElementById('yhteis_osumat');
        const yhteisPisteetEl = document.getElementById('yhteis_pisteet');
        const napakympitEl = document.getElementById('napakympit');
        const scoreButtons = document.querySelectorAll('.score-btn');
        const osumat = document.getElementById('osumat');
        const viimeisin_osuma = document.getElementById('viimeisin_osuma');

        let kilpailijaId = null;
        // Kilpailijan vaihto
        selectElement.addEventListener('change', function () {
        kilpailijaId = Number(this.value);  // varmistetaan, että kilpailijaId on numero
        console.log(`Valittu kilpailija ID: ${kilpailijaId}`);

        // Nollataan osumat, pisteet ja napakympit uuden kilpailijan osalta
        yhteisOsumat = 0;
        yhteisPisteet = 0;
        napakympit = 0;
        osumalista =[]
        //lisää pisteee nappi
        addPoints.disabled = false;
        yhteisOsumatEl.textContent = yhteisOsumat;
        yhteisPisteetEl.textContent = yhteisPisteet;
        napakympitEl.textContent = napakympit;
    });
       
  //Kilpailijan valinta---
        selectElement.addEventListener('change',async function () {
        kilpailijaId = Number(this.value); // varmistus että kilpailija Id numerona
        let transaction = db.transaction(['Kilpailijat'], 'readonly');
        let objectStore = transaction.objectStore('Kilpailijat');
        let request = objectStore.get(kilpailijaId);

        request.onsuccess = function(event) {
            let valittuKilpailija = request.result; 
            if (!valittuKilpailija) {
                console.error(`Kilpailijaa ID:llä ${kilpailijaId} ei löytynyt.`);
                return;
            }
    
            console.log(`Valittu kilpailija: `, valittuKilpailija);
    
            // Tarkista, onko kilpailija jo ampunut
            if (valittuKilpailija.ammuttu === true) {
                alert('Kilpailija on jo suorittanut ammunnan!');
    
                // Lukitaan pisteiden syöttöpainikkeet ja tallennuspainike
                scoreButtons.forEach(button => {
                    button.disabled = true;
                });
                addPoints.disabled = true;
                removeButton.disabled = true;
            } else {
                removeButton.disabled = false;
                addPoints.disabled = false;
                scoreButtons.forEach(button => {
                    button.disabled = false;
                });
            }
        };


        
        });
       
        // tapahtumankäsittelijä jokaiselle osuma-painikkeelle
        scoreButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (!kilpailijaId) {
                    alert('Valitse ensin kilpailija!');
                    return;
                }
                let valittuKilpailija = kilpailijat.find(kilpailija => kilpailija.id === kilpailijaId);
                console.log(valittuKilpailija.ammuttu);
                if(valittuKilpailija.ammuttu){
                    alert('Olet jo syöttänyt osumat valitulle kilpailijalle!')
                    addPoints.disabled = true;
                    return;
                }
                
                let value = this.getAttribute('data-value');
        
               
                if (value === 'X') {
                    yhteisPisteet += 10;
                    napakympit++;
                    osumalista.push('X');
                } else {
                    yhteisPisteet += parseInt(value, 10);
                    osumalista.push(value);
                }
        
                yhteisOsumat++;
        
                viimeisin_osuma.textContent = value;
                viimeisin_osuma.classList.replace('poisto-animate-grow','osumat-animate-grow'); //luokan vaihto että tämä vihreänä
                yhteisOsumatEl.textContent = yhteisOsumat;
                yhteisPisteetEl.textContent = yhteisPisteet;
                napakympitEl.textContent = napakympit;
                osumat.textContent = osumalista.join(' ');
                animatePoints(viimeisin_osuma); // animoi viimeisimmän lisäyksen
                removeButton_ispressed = false;
                if (yhteisOsumat >= laukausmaara && !removeButton_ispressed) { // Tämä estää näppäilemästä liikaa osumia mutta antaa myös korjata
                    setTimeout(() => {
                        alert('Olet syöttänyt vaadittavan laukausmäärän!');
                    }, 100);                  
                    scoreButtons.forEach(button => {
                        button.disabled = true;
                    });   
                }
            });
        });
        
function animatePoints(element){ //syöttöpisteiden animointi
    element.classList.add('active');
    setTimeout(()=>{
        element.classList.remove('active');
        element.textContent = '';
    },500);
}
removeButton.addEventListener('click',() => { // Poisteteaan viimeinen osuma listasta painiketta painettaessa
    if(osumalista.length === 0){
        osumat.textContent = 'Osumalista on tyhjä!';
        return;
    }
    let value = osumalista[osumalista.length-1];    
               
    if (value === 'X') {
        yhteisPisteet -= 10;
        napakympit--;
        yhteisOsumat -=1;
        yhteisPisteet - value;
        osumalista.pop();
    } else {
        yhteisPisteet -= parseInt(value, 10);
        osumalista.pop();
        yhteisOsumat -=1;
        yhteisPisteet - value;

    }
    viimeisin_osuma.textContent = `-${value}`;
    viimeisin_osuma.classList.replace('osumat-animate-grow','poisto-animate-grow'); //Tämä punaisena
    yhteisOsumatEl.textContent = yhteisOsumat;
    yhteisPisteetEl.textContent = yhteisPisteet;
    napakympitEl.textContent = napakympit;
    osumat.textContent = osumalista.join(' ');
    animatePoints(viimeisin_osuma);
    removeButton_ispressed = true; // Onko korjattu osumia
    scoreButtons.forEach(button => {
        button.disabled = false;
    });
});
  
//Pisteiden lähetys
addPoints.addEventListener('click', function () {
    if (!kilpailijaId) {
        alert('Valitse ensin kilpailija!');
        return;
    }
    if(yhteisOsumat < laukausmaara){
        alert('Kaikki osumat on syötettävä ennen pisteiden lähetystä');
        return;
    }

    let confirmed = 'Tarkista osumat ja lähetä painamalla OK!';
    if (confirm(confirmed)){
        // Palauttaa lopulliset pisteet
        paivitaPisteet(db, Number(kilpailijaId), yhteisOsumat, yhteisPisteet, napakympit,osumalista)
        .then((message) => { 
            alert(message);
        })
        .catch(error => {   //
             console.error('Pisteiden päivityksessä tapahtui jokin virhe:', error);
        });
        addPoints.disabled = true;
        removeButton.disabled = true;
        osumat.textContent = ''; // Tyhjennys

        } else {
            return;
        }
        });    
    });
//});
