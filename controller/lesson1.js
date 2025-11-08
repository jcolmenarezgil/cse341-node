const mainRoute = (req, res) => {
    res.send('Main Route');
};

const aboutRoute = (req, res) => {
    res.send('About Route');
}

const infoRoute = (req, res) => {
    res.send('Info Route');
};

module.exports = {
    mainRoute,
    aboutRoute,
    infoRoute,
}