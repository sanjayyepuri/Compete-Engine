export function isLoggedin() {
    return localStorage.getItem('id_token') !== 'undefined';
}
