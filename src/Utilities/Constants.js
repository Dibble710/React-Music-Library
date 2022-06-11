const API_BASE_URL_DEVELOPMENT = 'https://localhost:7110';
const API_BASE_URL = 'appname.azurewebsites.com';

const ENDPOINTS = {
    GET_ALL_SONGS: 'get-all-songs',
    GET_SONG_BY_ID: 'get-song-by-id',
    CREATE_SONG: 'create-song',
    UPDATE_SONG: 'update-song',
    DELETE_SONG_BY_ID: 'delete-song-by-id'
};

const development = {
    API_URL_GET_ALL_SONGS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_SONGS}`,
    API_URL_GET_SONG_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_SONG_BY_ID}`,
    API_URL_CREATE_SONG: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_SONG}`,
    API_URL_UPDATE_SONG: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_SONG}`,
    API_URL_DELETE_SONG_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_SONG_BY_ID}`,
};

const production = {
    API_URL_GET_ALL_SONGS: `${API_BASE_URL}/${ENDPOINTS.GET_ALL_SONGS}`,
    API_URL_GET_SONG_BY_ID: `${API_BASE_URL}/${ENDPOINTS.GET_SONG_BY_ID}`,
    API_URL_CREATE_SONG: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_SONG}`,
    API_URL_UPDATE_SONG: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_SONG}`,
    API_URL_DELETE_SONG_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_SONG_BY_ID}`,
};

// Is this app running in production or development?
const Constants = process.env.NODE_ENV === 'development' ? development : production;

export default Constants;