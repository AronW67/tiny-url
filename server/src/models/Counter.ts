import { Document, Schema, model } from 'mongoose';

/**
 * Interface describing the Counter document
 */
export interface CounterDocument extends Document {
    /**
     * The unique id
     */
    _id: number;
    /**
     * The current sequence counter
     */
    sequence: number;
}

const counterSchema = new Schema<CounterDocument>({
  _id: Number,
  sequence: Number,
});

const Counter = model<CounterDocument>('Counter', counterSchema);

Counter.createIndexes({background: true});

export default Counter;