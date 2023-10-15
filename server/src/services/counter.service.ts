import Counter, {CounterDocument} from '../models/Counter';

/**
 * A functon to return an {@link CounterDocument}
 * @returns an {@link CounterDocument} or null
 */
const getCounter = async (): Promise<CounterDocument | null> => {
    try {
        const currentCountArr = await Counter.find().sort({_id:-1}).limit(1);
        if (currentCountArr && currentCountArr.length > 0) {
            return currentCountArr[0]
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
};

/**
 * A function that adds a new counter document into the database to simulate auto increment functonality 
 */
const addCounter = async () => {
    const currentCounter = await getCounter();

    let sequence = currentCounter && currentCounter?.sequence + 1 || 0;

    try {
        Counter.create({
            _id: sequence,
            sequence: sequence
        });
    } catch (e) {
        console.error(e);
    }
};

export {getCounter, addCounter};