import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useWatchlistStore =create(
    persist(
        (set, get) =>({
            watchlist:[],

            addToWatchlist: (movie) =>{
                const exists = get().watchlist.some((m) => m.id === movie.id);
                if(!exists){
                    set((state) =>({watchlist: [...state.watchlist, movie]}));
                }
            },

            removeFromWatchlist: (movieId)=>{
                set((state) =>({
                    watchlist: state.watchlist.filter((m) => m.id !==movieId),
                }));
            },

            isInWatchlist: (movieId)=>{
                return get().watchlist.some((m) => Number(m.id) === Number(movieId));
            },
        }),
        {
            name: 'watchlist-storage',
            storage : createJSONStorage(() =>AsyncStorage),
        }
    )
);