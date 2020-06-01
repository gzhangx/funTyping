import React from 'react';
const DEFAULT_STATE = {
    toText: '',
    curText: ''
};
const MainContext = React.createContext(DEFAULT_STATE);

export {
    DEFAULT_STATE,
    MainContext,
}