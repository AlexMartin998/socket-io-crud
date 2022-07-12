'use strict';

import { Note } from './../models';

export default io => {
  io.on('connection', socket => {
    console.log('New user connected!');

    const emitNotes = async () => {
      const notes = await Note.find();

      io.emit('server:loadNotes', notes);
    };
    emitNotes();

    socket.on('client:newNote', async ({ title, description }) => {
      const newNote = new Note({ title, description });
      await newNote.save();

      io.emit('server:newNote', newNote); // A todos los clients
    });

    socket.on('client:deleteNote', async id => {
      await Note.findByIdAndDelete(id);

      emitNotes();
    });

    socket.on('client:getNote', async id => {
      const note = await Note.findById(id);

      io.emit('server:selectedNote', note);
    });

    socket.on('client:updateNote', async ({ id, title, description }) => {
      await Note.findByIdAndUpdate(id, { title, description });

      emitNotes();
    });

    socket.on('disconnect', () => {
      console.log('User DISCONNECTED!');
    });
  });
};
