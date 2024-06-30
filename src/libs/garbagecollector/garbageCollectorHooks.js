import { useEffect } from 'react';
import store from '../../store/store';

export default function useGarbageCollector(key) {
    useEffect(() => () => {
        store.reducerManager.remove(key);
    }, []);
}