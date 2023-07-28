
import { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    admin: "",
    setAdmin: () => { },
});

