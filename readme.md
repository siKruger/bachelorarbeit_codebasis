Dieses Repository beinhaltet den Code, der zu der Bachelorarbeit
**Evaluation verschiedener TypeScript ORM für Web-Anwendungen**
gehört.

Die einzelnen Tests sind in ihren entsprechend benannten Packages zu finden. Ferner exisiert eine Auswahl an NPM Scripts, die für die automatisierte Testdurchführung genutzt werden können.
Standardmäßig wird eine SQLite Datenbank verwendet. Es besteht kein Handlungsbedarf.

Ein Test setzt eine MariDB Datenbank vorraus. Folgende Verbindungsdaten müssen hierbei gelten:
- host: 'localhost'
- port: 32768
- user: root
- passwort: abcdefg

Folgende Datenbanken müssen existieren
- typeorm
- sequelize
- prisma

Zusätzlich muss in src/sequelizeInit.ts und prisma/schema.prisma der Konnektor gewechselt werden. Kommentare stehen an entsprechenden stellen.