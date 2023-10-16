import TinyUrl, { TinyUrlDocument } from '../models/TinyUrl';
import { addCounter, getCounter } from './counter.service';
import crypto from 'crypto';

/**
 * Get all users
 * @returns a list of created tiny urls
 */
const findTinyUrls = async (): Promise<TinyUrlDocument[]> => {
    return await TinyUrl.find();
};

/**
 * Finds the mapped original url based on a provided tiny url
 * @tinyUrl the tiny url string to find the original url for
 * @returns the mapped original url string if it exists, otherwise null
 */
const findOriginalUrl = async (tinyUrl: string): Promise<string | null> => {
    const tinyUrlDocument = await TinyUrl.find({shortUrl: tinyUrl});
    if (tinyUrlDocument.length > 0) {
        return tinyUrlDocument[0].fullUrl;
    } else {
        return null;
    }
};

/**
 * Create tiny url
 * @param originalUrl the original url provided by the user
 * @returns a promise containing the newly created {@link TinyUrlDocument}
 */
const addTinyUrl = async (originalUrl: string): Promise<string> => {
    // Get latest counter
    const currentCounter = await getCounter();
    let sequence = currentCounter && currentCounter.sequence + 1 || 0;

    // Hash counter value to get short url
    // Counter hashed to md5 first then base64 for longer output
    // We take the first 7 chars as this should offer a good combination of uniqueness and length
    const md5Hash = crypto.createHash('md5');
    const sequenceMd5Hash = md5Hash.update(sequence.toString()).digest('hex');
    const sequenceBase64 = Buffer.from(sequenceMd5Hash).toString('base64');
    const shortHash = sequenceBase64.slice(0, 7);

    // Create new tiny url document
    const tinyUrl = await TinyUrl.create({
        _id: sequence,
        shortUrl: shortHash,
        fullUrl: originalUrl
    });

    // Update counter
    await addCounter();

    // Generate full short url based on environment
    const shortUrl = process.env.NODE_ENV === 'development' ?
        `http://localhost:${process.env.CLIENT_PORT}/r/${shortHash}` : 
        `${process.env.BASE_PATH}/r/${shortHash}`;

    return shortUrl;
};

export { findTinyUrls, findOriginalUrl, addTinyUrl };