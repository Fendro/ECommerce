
import { createContext, useContext, useState } from 'react';

export const EmailContext = createContext({
    email: "",
    setEmail: () => {},
});
