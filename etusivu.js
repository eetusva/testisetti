function teeOtsikko() {
    let otsikko = document.createElement('header');
    let h1 = document.createElement('h1');
    h1.textContent = 'Ressulaskuri'; // otsikko
    otsikko.appendChild(h1);
    return otsikko;
}

function teeNavigointi() {
    let ladattavaSivu;
    let nav = document.createElement('nav');
    let lista = document.createElement('ul');

    let sivut = [
        { nimi: 'Kisan Luonti', tiedosto: 'kisanluonti.html' },
        { nimi: 'Kilpailijan Luonti', tiedosto: 'kilpailijanluonti.html' },
        { nimi: 'Tulokset', tiedosto: 'tulokset.html' }
    ];
    
    sivut.forEach(function(sivu) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = sivu.tiedosto; //a.href
        a.textContent = sivu.nimi; // Linkin teksti
        li.appendChild(a);
        lista.appendChild(li);
    });

    nav.appendChild(lista);
    return nav;
}

function teePaasivu() {
    let section = document.createElement('section');

    let nappi = document.createElement('button');
    let gdpr_nappi = document.createElement('button');
    gdpr_nappi.textContent = 'GDPR';
    nappi.textContent = 'Tyhjennä tietokanta'; // Tyhjennysnappi
    nappi.onclick = function() {
        if (confirm('Haluatko varmasti tyhjentää tietokannan?')) {
            console.log('Tietokanta tyhjennetty'); 
            // koodisto tietokannan tyhjentämiseksi
            indexedDB.deleteDatabase('Kilpailijatietokanta');
        }
    };
    gdpr_nappi.onclick = () => {
        infoGDPR();
    }
    section.appendChild(nappi);
    section.appendChild(gdpr_nappi);
    return section;
}

document.getElementById('header').appendChild(teeOtsikko());
document.getElementById('navigation').appendChild(teeNavigointi());
document.getElementById('main-content').appendChild(teePaasivu());

function infoGDPR() {
    const infomsg = `
    
    <h2>Toiminnot:</h2>
    
    <h3>Henkilöstä kerättävät tiedot:</h3>
    <pre>
  -Nimi
  -Yhdistys
  -Summittainen ikä
    </pre>
    <p>
        Kaikki tiedot tallentuvat vain päätelaitteeseen,
        mitään tietoja ei lähetetä verkkoon. <br><br>
        Kaikki päätelaitteeseen tallentuvat tiedot voi 
        poistaa etusivun 'Tyhjennä tietokanta'-painikkeella 
        esim. kilpailun päätyttyä (suositus).
    </p>`;

    document.getElementById('modalInfo').innerHTML = infomsg;
    document.getElementById('gdprModal').style.display = 'block'; 
}

function closeModal() {
    document.getElementById('gdprModal').style.display = 'none'; 
}

window.onclick = function(event) {
    const modal = document.getElementById('gdprModal');
    if (event.target === modal || modal.contains(event.target)) {
        modal.style.display = 'none';
    }
}
