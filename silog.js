var level = {CRITICAL   : [0, 'CRITICAL'], 
             ERROR      : [1, 'ERROR'], 
             WARNING    : [2, 'WARNING'], 
             INFO       : [3, 'INFO'], 
             DEBUG      : [4, 'DEBUG']};

var currentLevel = level.INFO;

var levelSet = false;

var localTAG = 'simplog';

function setLevel(customLevel) {
    if(!levelSet) {
        currentLevel = customLevel;
        levelSet = true;
    } else {
        log(level.WARNING, localTAG, 'Logging level already set, cannot change!');
    }
    return currentLevel;
}

function getLevel() {
    return currentLevel;
}

function write(where, what) {
    if(where === 'console') {
        console.log(what);
    }
}

function log(messageLevel, tag, message) {
    if(messageLevel[0] <= currentLevel[0]) {
        var date = new Date();
        var what = date.toLocaleDateString() + ' ';
        what += date.toLocaleTimeString() + ' - ';
        what += messageLevel[1] + ' - ';
        what += tag + ' - ';
        what += message;
        write('console', what);
        return what;
    } else {
        return null;
    }
}

exports.level = level;
exports.setLevel = setLevel;
exports.getLevel = getLevel;
exports.log = log;
