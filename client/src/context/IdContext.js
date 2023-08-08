
import { createContext, useContext, useState } from 'react';

export const IdContext = createContext({
    Id: "",
    setId: () => {},
});
