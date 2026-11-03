

class User {
  private notebooks: NoteBook[] = [];

  constructor(
    public id: number,
    public name: string,
    public email: string,
    private password: string,
    protected phone: string,
    public age: number
  ) {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
  }

  displayInfo(): void {
    console.log(
      `User Information:
      ID: ${this.id}
      Name: ${this.name}
      Email: ${this.email}
      Phone: ${this.phone}
      Password: secret
      Age: ${this.age}`
    );
  }

  
  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  getAllNotebooks(): NoteBook[] {
    return [...this.notebooks];
  }
}


class Admin extends User {
  constructor(
    Id: number,
    name: string,
    email: string,
    Password: string,
    Phone: string,
    age: number
  ) {
    super(Id, name, email, Password, Phone, age);
  }

  manageNotes(noteBook: NoteBook): void {
    console.log("Admin is managing notes:");

    const notes = noteBook.getAllNotes();

    notes.forEach((note) => {
      console.log(note.preview());
    });
  }

  deleteNote(noteBook: NoteBook, noteId: number): void {
    noteBook.removeNote(noteId);
    console.log("Note deleted successfully");
  }
}


class Note {
  constructor(
    public Id: number,
    public title: string,
    public content: string,
    public userId: User
  ) {}

  preview(): string {
    const maxLength = 25;

    if (this.content.length <= maxLength) {
      return this.content;
    }

    return this.content.substring(0, maxLength) + "...";
  }
}


class NoteBook {
  private notes: Note[] = [];

  constructor(
    public Id: number,
    public title: string
  ) {}

  addNote(
    noteId: number,
    title: string,
    content: string,
    author: User
  ): Note {
    const note = new Note(noteId, title, content, author);

    this.notes.push(note);

    return note;
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter(
      (note) => note.Id !== noteId
    );
  }

  getAllNotes(): Note[] {
    return [...this.notes];
  }
}


class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter(
      (currentItem) => currentItem !== item
    );
  }

  getAllItems(): T[] {
    return [...this.items];
  }
}



const user1 = new User(
  16474,
  "Mostafa",
  "mostafa@gmail.com",
  "123456",
  "01012345678",
  18
);

user1.displayInfo();


const admin = new Admin(
  100,
  "Admin",
  "admin@gmail.com",
  "admin123",
  "01000000000",
  30
);

admin.displayInfo();


const notebook = new NoteBook(
  1,
  "Backend Notes"
);


const note1 = notebook.addNote(
  1,
  "Frontend Languages",
  "HTML, CSS, JavaScript",
  user1
);

const note2 = notebook.addNote(
  2,
  "Backend Languages",
  "Node.js, Express.js, MongoDB",
  user1
);

const note3 = notebook.addNote(
  3,
  "TypeScript",
  "TypeScript is a strongly typed programming language built on JavaScript",
  user1
);


console.log("All Notes:");

notebook.getAllNotes().forEach((note) => {
  console.log(note.preview());
});


console.log("Note Author:");
console.log(note1.userId.name);


console.log("Notebook Notes:");
console.log(notebook.getAllNotes());


notebook.removeNote(1);

console.log("After Removing Note 1:");
console.log(notebook.getAllNotes());


user1.addNotebook(notebook);

const notebook2 = new NoteBook(
  2,
  "Frontend Notes"
);

user1.addNotebook(notebook2);

console.log("User Notebooks:");
console.log(user1.getAllNotebooks());


admin.manageNotes(notebook);

admin.deleteNote(notebook, 2);

console.log("Notes After Admin Deleted Note 2:");
console.log(notebook.getAllNotes());



const notesStorage = new Storage<Note>();

notesStorage.addItem(note1);
notesStorage.addItem(note2);
notesStorage.addItem(note3);

console.log("Notes Storage:");
console.log(notesStorage.getAllItems());

notesStorage.removeItem(note1);

console.log("Notes Storage After Removing Note 1:");
console.log(notesStorage.getAllItems());


const usersStorage = new Storage<User>();

usersStorage.addItem(user1);
usersStorage.addItem(admin);

console.log("Users Storage:");
console.log(usersStorage.getAllItems());


const numbersStorage = new Storage<number>();

numbersStorage.addItem(10);
numbersStorage.addItem(20);
numbersStorage.addItem(30);

console.log("Numbers Storage:");
console.log(numbersStorage.getAllItems());
