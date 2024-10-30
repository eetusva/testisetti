:::mermaid
graph TD;
    
    etusivu-->luoKilpailu;
    etusivu-->luoKilpailija
    etusivu-->laskuri
    etusivu-->tulokset    
    luoKilpailu-->etusivu
    luoKilpailija-->etusivu
    laskuri-->etusivu
    tulokset-->etusivu
    luoKilpailu-->objectStore-kilpailu
    objectStore-kilpailu-->tallenna-kilpaluDB;
    tallenna-kilpaluDB-->luoKilpailija;
    luoKilpailija-->salaaData;
    objectStore-kilpailija-->tallenna-kilpailuDB;
    tallenna-kilpailuDB-->luoKilpailija
    luoKilpailija-->laskuri;
    laskuri-->salaaData;
    salaaData-->objectStore-kilpailija
    tallenna-kilpailuDB-->laskuri
    tulokset-->haeDB-kilpailuDB
    haeDB-kilpailuDB-->puraSalattuData
    puraSalattuData-->tulokset
    tulokset-->luoPDF

:::
