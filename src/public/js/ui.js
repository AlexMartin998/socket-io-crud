'use strict';

import { deletNote, saveNotes, getNoteById, updateNote } from './socket.js';

const notesList = document.querySelector('.notes');
const $title = document.querySelector('#title');
const $description = document.querySelector('#description');

let savedId = '';

const noteUi = note => {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class='card card-body rounded-0 mb-2 animate__animated animate__fadeInUp'>
      <div class="d-flex justify-content-between">
        <h1>${note.title}</h1>
        <div>
          <button class='btnDelete btn btn-danger' data-id='${note._id}'>Delete</button>
          <button class='btnEdit btn btn-info' data-id='${note._id}'>Edit</button>
        </div>
      </div>
      <p>${note.description}</p>
    </div>
  `;

  const btnDelete = div.querySelector('.btnDelete');
  const btnEdit = div.querySelector('.btnEdit');

  // btnDelete.addEventListener('click', e => console.log(e.target.dataset.id));
  btnDelete.addEventListener('click', () => deletNote(btnDelete.dataset.id));
  btnEdit.addEventListener('click', () => getNoteById(btnEdit.dataset.id));

  return div;
};

export const renderNotes = notes => {
  notesList.innerHTML = '';
  notes.forEach(note => notesList.append(noteUi(note)));
};

export const onHandleSubmit = e => {
  e.preventDefault();
  if (!$title.value || !$description.value) return;

  savedId
    ? updateNote(savedId, $title.value, $description.value)
    : saveNotes($title.value, $description.value);

  $title.value = '';
  $description.value = '';
  savedId = '';
};

export const appendNote = note => {
  notesList.append(noteUi(note));
};

export const fillForm = ({ title, description, _id }) => {
  $title.value = title;
  $description.value = description;

  savedId = _id;
};
