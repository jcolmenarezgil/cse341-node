const mainRoute = (req, res) => {
    res.send('Main Route');
};

const infoRoute = (req, res) => {
    res.send('Info Route');
};

module.exports = {
    mainRoute,
    infoRoute,
}