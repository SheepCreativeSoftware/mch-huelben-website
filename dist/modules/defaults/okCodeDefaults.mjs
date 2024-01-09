const errorCodeDefaults = {
    'Bad Request': {
        code: '401',
        description: 'Der Server kann oder wird die Anforderung aufgrund von etwas, das als Client-Fehler wahrgenommen wird (z. B. fehlerhafte Anforderungssyntax, ungültiges Anforderungs-Message-Framing oder irreführendes Anforderungs-Routing), nicht verarbeiten.',
        header: 'Ups... Fehlerhafte Anfrage',
        text: 'Bad Request',
    },
    'Unauthorized': {
        code: '401',
        description: 'Die Anfage bedarf einer Authentifizierung (User und Passwort), die bei der Anfrage mitgeschickt werden muss.',
        header: 'Ups... Authentifizierung erforderlich',
        text: 'Unauthorized',
    },
    'Forbidden': {
        code: '403',
        description: 'Der Server hat die Anfrage verstanden, aber weigert sich, diese auszuführen. Eine Authentifizierung ist hier nicht möglich. Die Anfrage ist generell nicht erlaubt.',
        header: 'Ups... Anfrage verweigert',
        text: 'Forbidden',
    },
    'Not Found': {
        code: '404',
        description: 'Gr&uuml;nde dafür könnten sein, dass Sie eine falsche oder veraltete URL aufgerufen haben - bitte überprüfen Sie diese noch einmal. Oder aber wir haben die betreffende Seite archiviert, verschoben oder umbenannt.',
        header: 'Ups... Seite wurde nicht gefunden',
        text: 'Not Found',
    },
    'Internal Server Error': {
        code: '500',
        description: 'Der Server hat einen Fehler festgestellt. Bitte versuche es doch später noch einmal.',
        header: 'Ups... Serverfehler',
        text: 'Internal Server Error',
    },
    'Service Unavailable': {
        code: '503',
        description: 'Der Server hat einen Fehler festgestellt. Bitte versuche es doch später noch einmal.',
        header: 'Ups... Hier ist ein Fehler passiert',
        text: 'Service Unavailable',
    },
};
export { errorCodeDefaults };
