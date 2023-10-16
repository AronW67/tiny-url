import { ReactElement, useCallback, useState } from 'react';
import { Button, Input, Paper, Typography } from '@mui/material';
import styles from './UrlCard.module.css';
import Link from '@mui/icons-material/LinkOff';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';
import { getShortenedUrl } from '../services/shortenService';

const urlRegex = /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/;

/**
 * A component containing a card for the short url user interface
 */
const UrlCard = (): ReactElement => {
    const [inputUrl, setInputUrl] = useState<string>('');
    const [shortenedUrl, setShortenedUrl] = useState<string>();
    const [inputError, setInputError] = useState<boolean>();

    /**
     * Callback function to handle click for request of shortened url
     * @param inputUrl the long form input url
     */
    const handleShortenUrl = useCallback(async (inputUrl: string) => {
        const isValid = validateUrlInput(inputUrl);

        if (!isValid) {
            setInputError(true);
            return;
        } else {
            setInputError(false);
        }

        const shortUrl = await getShortenedUrl(inputUrl);

        if (shortUrl) {
            setShortenedUrl(shortUrl);
        }
    }, []);

    /**
     * A helper function to validate the input url string
     * @url the url string to validate
     * @returns boolean indicating whether URL is valid
     */
    const validateUrlInput = (url: string): boolean => {
        return (!url || url.length === 0 || !urlRegex.test(url)) ? false : true;
    };

    return (
        <Paper className={styles['url-card-container']}>
            <h3><Link className={styles['link-icon']}/> Shorten a long URL</h3>
            <div className={styles['input-container']}>
                <Input 
                    className={styles['input']} 
                    aria-label={'url-input'} 
                    placeholder={'Add your URL'} 
                    onChange={(e) => setInputUrl(e.target.value)}
                    error={inputError}
                />
                <Button 
                    className={styles['button']} 
                    variant={'contained'}
                    onClick={() => handleShortenUrl(inputUrl)}
                >Shorten URL</Button>
            </div>
            {inputError && <Typography className={styles['input-error']} aria-label={'url error message'}>*Please make sure the URL entered is valid</Typography>}
            {shortenedUrl && !inputError && 
                <Typography className={styles['short-url']}>
                    <AutoFixHigh /> Your short URL has been created: <a href={shortenedUrl} target={'_blank'}>{shortenedUrl}</a>
                </Typography>
            }
        </Paper>
    )
};

export default UrlCard;