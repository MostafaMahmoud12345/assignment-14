"use strict";
// ==========================================
// 1. User Class
// ==========================================
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
    }
    displayInfo() {
        console.log(`User Information:
      ID: ${this.id}
      Name: ${this.name}
      Email: ${this.email}
      Phone: ${this.phone}
      Password: secret
      Age: ${this.age}`);
    }
    // Aggregation: User has multiple Notebooks
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    getAllNotebooks() {
        return [...this.notebooks];
    }
}
// ==========================================
// 2. Admin Class (Inheritance)
// ==========================================
class Admin extends User {
    constructor(Id, name, email, Password, Phone, age) {
        super(Id, name, email, Password, Phone, age);
    }
    manageNotes(noteBook) {
        console.log("Admin is managing notes:");
        const notes = noteBook.getAllNotes();
        notes.forEach((note) => {
            console.log(note.preview());
        });
    }
    deleteNote(noteBook, noteId) {
        noteBook.removeNote(noteId);
        console.log("Note deleted successfully");
    }
}
// ==========================================
// 3. Note Class
// ==========================================
class Note {
    Id;
    title;
    content;
    userId;
    constructor(Id, title, content, userId) {
        this.Id = Id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    preview() {
        const maxLength = 25;
        if (this.content.length <= maxLength) {
            return this.content;
        }
        return this.content.substring(0, maxLength) + "...";
    }
}
// ==========================================
// 4. NoteBook Class (Composition)
// ==========================================
class NoteBook {
    Id;
    title;
    notes = [];
    constructor(Id, title) {
        this.Id = Id;
        this.title = title;
    }
    addNote(noteId, title, content, author) {
        const note = new Note(noteId, title, content, author);
        this.notes.push(note);
        return note;
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((note) => note.Id !== noteId);
    }
    getAllNotes() {
        return [...this.notes];
    }
}
// ==========================================
// 5. Generic Storage Class
// ==========================================
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((currentItem) => currentItem !== item);
    }
    getAllItems() {
        return [...this.items];
    }
}
// ==========================================
// 6. Testing the Classes
// ==========================================
// Create User
const user1 = new User(16474, "Mostafa", "mostafa@gmail.com", "123456", "01012345678", 18);
user1.displayInfo();
// Create Admin
const admin = new Admin(100, "Admin", "admin@gmail.com", "admin123", "01000000000", 30);
admin.displayInfo();
// Create NoteBook
const notebook = new NoteBook(1, "Backend Notes");
// Add Notes
const note1 = notebook.addNote(1, "Frontend Languages", "HTML, CSS, JavaScript", user1);
const note2 = notebook.addNote(2, "Backend Languages", "Node.js, Express.js, MongoDB", user1);
const note3 = notebook.addNote(3, "TypeScript", "TypeScript is a strongly typed programming language built on JavaScript", user1);
// Display Notes
console.log("All Notes:");
notebook.getAllNotes().forEach((note) => {
    console.log(note.preview());
});
// Test Note Association
console.log("Note Author:");
console.log(note1.userId.name);
// Test Composition
console.log("Notebook Notes:");
console.log(notebook.getAllNotes());
// Remove Note
notebook.removeNote(1);
console.log("After Removing Note 1:");
console.log(notebook.getAllNotes());
// Test Aggregation
user1.addNotebook(notebook);
const notebook2 = new NoteBook(2, "Frontend Notes");
user1.addNotebook(notebook2);
console.log("User Notebooks:");
console.log(user1.getAllNotebooks());
// Test Admin Methods
admin.manageNotes(notebook);
admin.deleteNote(notebook, 2);
console.log("Notes After Admin Deleted Note 2:");
console.log(notebook.getAllNotes());
// ==========================================
// 7. Testing Generic Storage
// ==========================================
// Storage for Notes
const notesStorage = new Storage();
notesStorage.addItem(note1);
notesStorage.addItem(note2);
notesStorage.addItem(note3);
console.log("Notes Storage:");
console.log(notesStorage.getAllItems());
notesStorage.removeItem(note1);
console.log("Notes Storage After Removing Note 1:");
console.log(notesStorage.getAllItems());
// Storage for Users
const usersStorage = new Storage();
usersStorage.addItem(user1);
usersStorage.addItem(admin);
console.log("Users Storage:");
console.log(usersStorage.getAllItems());
// Storage for Numbers
const numbersStorage = new Storage();
numbersStorage.addItem(10);
numbersStorage.addItem(20);
numbersStorage.addItem(30);
console.log("Numbers Storage:");
console.log(numbersStorage.getAllItems());
