import mongoose from 'mongoose';

const objectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    params: {
      type: String,
      required: true,
    },
    pid: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Object = mongoose.model('Object', objectSchema);
