const app = require("./app");
const port = 80;

app.listen(port, () => {
    console.log(`Rodando na porta`, port);
});