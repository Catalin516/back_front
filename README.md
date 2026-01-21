# back_front

Mini-progetto full‑stack composto da:
- **Back-end**: API REST in **Flask** (Python) per gestione “Libreria”
- **Front-end**: **React + Vite** per visualizzare e gestire i libri

## Requisiti funzionali
- **Visualizzazione libri**: l’utente può visualizzare l’elenco dei libri disponibili.
- **Caricamento dati da API**: il front-end effettua il fetch dei libri dall’endpoint REST e aggiorna la UI.
- **Aggiunta libro**: l’utente può aggiungere un libro tramite form (titolo, autore, genere, anno).
- **Rimozione libro**: l’utente può rimuovere un libro selezionandolo da un form dedicato.
- **Svuotamento libreria**: l’utente può eliminare tutti i libri (azione disponibile dal form di rimozione).
- **Validazione input**: il form richiede campi obbligatori e vincoli base (es. anno numerico).

## Requisiti non funzionali
- **Usabilità**: navigazione semplice con navbar fissa e form modali chiari.
- **Performance**: il caricamento lista deve essere rapido e non bloccare la UI.
- **Affidabilità**: in caso di errore API, l’app deve evitare crash e gestire lo stato in modo coerente.
- **Manutenibilità**: codice organizzato e facilmente estendibile.

## User stories
- **Studente universitario** : *in quanto studente vorrei poter utilizzare un'app con la quale registrare i libri che i professori ci chiedono di leggere*
- **Madre di famiglia**: *in quanto madre reputo che per l'istruzione dei miei figli sia foondamentale la lettura e mi servirebbe un'app per potergli segnare dei libri da leggere*
- **Appassionato di libri**: *essendo un grande fanatico di letteratura leggo giornalmente e vorrei poter salvare tutti i libri che leggo per poterne tenere traccia*
