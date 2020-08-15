// import Raven from 'raven-js';
function init() {
    // Raven.config('https://8777f1ef39a049d1b79a8e58d889be29@o421764.ingest.sentry.io/5342026').install();
};

function log(error) {
    // Raven.captureException(error);
    console.error(error);
};
export default {
    init,
    log
}