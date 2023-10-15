import { Express, Request, Response } from 'express';
import { createTinyUrl, getTinyUrls } from './controllers/tinyurl.controller';
import { handleRedirect } from './controllers/redirect.controller';

/**
 * Function which allocates the routes for the application
 * @param app the express application
 */
const routes = (app: Express) => {
    // Default route
    app.get('/', (_: Request, res: Response) => res.status(200).send('Welcome to the express template'));

    // Tiny Url routes
    app
    .route('/api/tinyurl')
    .get(getTinyUrls)
    .post(createTinyUrl);

    // Redirect Url route
    app.get('/:tinyUrl', handleRedirect);

    // Catch all for unmatched routes
    app.all('*', (_: Request, res: Response) => {
        res.status(404).send('Not Found');
    });
};

export default routes;