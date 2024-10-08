export function teeOtsikko() {
    let otsikko = document.createElement('header');
    let h1 = document.createElement('h1');
    h1.textContent = 'RessuKisaLaskuri'; // otsikko
    otsikko.appendChild(h1);
    return otsikko;
}

export function teeNavigointi() {
    let nav = document.createElement('nav');
    let lista = document.createElement('ul');

    let sivut = ['Kilpailijan Luonti', 'Laskuri', 'Tulokset'];
    
    sivut.forEach(function(sivu) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = `#${sivu.toLowerCase().replace(/\s+/g, '')}`;
        a.textContent = sivu; // Linkin teksti
        li.appendChild(a);
        lista.appendChild(li);
    });

    nav.appendChild(lista);
    return nav;
}

export function teePaasivu() {
    let section = document.createElement('section');

    let nappi = document.createElement('button');
    nappi.textContent = 'Tyhjennä tietokanta'; // Tyhjennysnappi
    nappi.onclick = function() {
        if (confirm('Haluatko varmasti tyhjentää tietokannan?')) {
            console.log('Tietokanta tyhjennetty'); 
            // koodisto tietokannan tyhjentämiseksi
        }
    };

    section.appendChild(nappi);
    return section;
}

document.getElementById('header').appendChild(teeOtsikko());
document.getElementById('navigation').appendChild(teeNavigointi());
document.getElementById('main-content').appendChild(teePaasivu());
