import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  meta: { type: Object },
  timestamp: { type: String, default: new Date().toISOString() },
});

const Log = mongoose.model('Log', logSchema);

export default Log;