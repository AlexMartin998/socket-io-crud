'use strict';

import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, 'Title is required!'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Note', NoteSchema);
