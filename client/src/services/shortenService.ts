/**
 * A service method to call the tinyurl endpoint and retrieve a shortened url path
 * @param inputUrl the long form input url to be passed to the endpoint
 * @returns an {@link ShortenedUrlResponse} object
 */
const getShortenedUrl = async (inputUrl: string): Promise<string | undefined> => {
    try {
        const response = await fetch('/api/tinyurl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({url : inputUrl}),
        });
    
        if (response) {
            return response.json();
        }
    } catch (e) {
        throw new Error('Failed to fetch shortened url');
    }
};

export {getShortenedUrl};