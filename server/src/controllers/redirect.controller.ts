import { Request, Response } from 'express';
import { findOriginalUrl } from '../services/tinyurl.service';

/**
 * Redirect function which forwards user to mapped url
 * @param req the request
 * @param res the response
 */
const handleRedirect = async (req: Request, res: Response) => {
    const { tinyUrl } = req.params;

    // Get original url based on tiny url here
    const originalUrl = await findOriginalUrl(tinyUrl);

    if (originalUrl) {
        // Redirect to the original URL
        res.redirect(originalUrl);
    } else {
        // Handle the case where the tiny URL doesn't exist
        res.status(404).send('Tiny URL not found');
    }
};

export { handleRedirect };