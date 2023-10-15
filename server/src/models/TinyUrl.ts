import { Document, Schema, model } from 'mongoose';

/**
 * Interface describing the tiny url document
 */
export interface TinyUrlDocument extends Document {
    /**
     * The unique id
     */
    _id: number;
    /**
     * The short url string
     */
    shortUrl: string;
    /**
     * The full url
     */
    fullUrl: string;
}

const tinyUrlSchema = new Schema<TinyUrlDocument>({
  _id: Number,
  shortUrl: String,
  fullUrl: String,
});

const TinyUrl = model<TinyUrlDocument>('TinyUrl', tinyUrlSchema);

TinyUrl.createIndexes({background: true});

export default TinyUrl;