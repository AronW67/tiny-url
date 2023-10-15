import { Request, Response } from 'express';
import { findTinyUrls, addTinyUrl } from '../services/tinyurl.service';

/**
 * Interface defining a request body for a post request to create an {@link TinyUrlDocument}
 */
interface TinyUrlReq {
    /**
     * The original long url provided by the user
     */
    url: string;
}

/**
 * User controller method to get all tinyUrls
 * @param req the request
 * @param res the response
 * @returns a response with status and message
 */
const getTinyUrls = async (_: Request, res: Response) => {
    try {
        const tinyUrls = await findTinyUrls();
        return res.json(tinyUrls);
    } catch (e) {
        res.sendStatus(500).json({ error: e });
    }
};

/**
 * User controller method to create a tinyUrl 
 * @param req a User sent in the request
 * @param res the response
 */
const createTinyUrl = async (req: Request<TinyUrlReq>, res: Response) => {
    try {
        const originalUrl = req.body.url;

        if (!originalUrl) return res.status(400).json({ error: 'Missing long url in post' });

        const createdTinyUrl = await addTinyUrl(originalUrl);

        return res.status(201).json(createdTinyUrl);
    } catch (e) {
        return res.status(500).json({ error: 'Failed to create new tiny url' });
    }
}

export { getTinyUrls, createTinyUrl };