function addNote(event){
    event.preventDefault();
    const data = collectDataFromForm();
    saveNoteToLocalStorage(data);
    cleanForm();
    loadNotesFromStorage();
}
loadNotesFromStorage();
function loadNotesFromStorage() {
    const notesJSON = localStorage.getItem("notes") || "[]";
    const notes = JSON.parse(notesJSON);
    let AllTr = "";
    let index = 0;
    for (const note of notes) {
        const newTR = generateTR(note, index);
        AllTr += newTR;
        index++;
    }
    document.getElementById("NoteList").innerHTML = AllTr;
}
function collectDataFromForm() {
    const noteData = document.getElementById("noteData").value;
    const  targetDate= document.getElementById("targetDate").value;
    const targetTime = document.getElementById("targetTime").value;
    return {
        targetTime: targetTime,
        targetDate: targetDate,
        noteData: noteData,
    };
}
function saveNoteToLocalStorage(note) {
    const notesJSON = localStorage.getItem("notes") || "[]";
    const notes = JSON.parse(notesJSON);
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}
function generateTR(data, index) {
    const newTR = `<div class="noteView"><div class="buttonDiv"><button class="deleteButton" onclick="deleteNote(${index})"><i class="bi bi-x"></i></button></div>
            <div class="text">${data.noteData}</div>            
        ${data.targetDate}<br>
        ${data.targetTime}
        </div>`
    return newTR;
}
function injectTRToDOM(newTR) {
    document.getElementById("NoteList").innerHTML += newTR;
}
function cleanForm(){
    document.getElementById("newNoteForm").reset();
}
function deleteNote(index) {
    const notesJSON = localStorage.getItem("notes");
    const notes = JSON.parse(notesJSON) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotesFromStorage();
}