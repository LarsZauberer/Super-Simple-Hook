# Level Loading
Das Levelloading System geschieht über eine Json Datei,
welche geladen wird. Dort drinnen ist ein Array zufinden,
welches weitere JSON Strukturen beeinhaltet.
Dort sind alle Objekte aufgelistet.

Die Objekte werden dort mit IDs: ausseinandergehalten, welche durch den Index in der `objectRegistry` in `main.js` festgelegt wird.

Die Koordinaten für die Position werden in Prozent angegeben.
Die Grösse ebenfalls.


# Level Editor:
Der Leveleditor soll nicht für den Spieler zugänglich sein. Er soll nur den Entwicklern eine Unterstützung zum Levelbauen sein.

Da der Leveleditor nicht den Spieler zur Verfügung steht muss er nicht komplett Bug frei sein.

## Möglichkeiten:
- Man soll Objekte neu positionieren können
- Man soll Objekte neu Vergrössern können
- Man soll Objekte löschen können
- Man soll Objekte erschaffen können
- Man soll **nicht** Objekte drehen können

## Steuerung:
Durch **drag and drop** soll man Objekte verschieben können

Durch das halten und zeigen auf ein Objekt mit **Controll** kann man mithilfe der **Pfeiltasten** die Grösse des Objektes verändern.

Mit **q** kann man das Aktuelle Level herunterladen/speichern.

Mit **esc** kann man ein Menu aufrufen um neue Objekte in die Welt hinein zu holen.

Mit **del** und das zeigen mit der Maus auf ein Objekt, löscht das Objekt.
