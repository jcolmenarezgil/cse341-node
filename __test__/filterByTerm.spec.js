const filterByTerm = require("../filterByTerm");
    
describe("Filter function", () => {
    // Definimos los datos de prueba una sola vez para todo el bloque `describe`
    const input = [
        { id: 1, url: "https://www.url1.dev" },
        { id: 2, url: "https://www.url2.dev" },
        { id: 3, url: "https://www.linkl3.dev" },
    ];

    test("it should filter by a search term (link)", () => {
        const output = [{ id: 3, url: "https://www.linkl3.dev" }];
        expect(filterByTerm(input, "link")).toEqual(output);
    });

    test("it should filter by a search term (LINK) case-insensitive", () => {
        const output = [{ id: 3, url: "https://www.linkl3.dev" }];
        expect(filterByTerm(input, "LINK")).toEqual(output);
    });

    // Prueba corregida para "uRI"
    test("it should filter by a search term (uRI)", () => {
        const output = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
        ];
        expect(filterByTerm(input, "uRl")).toEqual(output);
    });

    // Prueba corregida para una búsqueda en blanco
    test("it should return all elements for an empty search term", () => {
        // Una búsqueda vacía debe coincidir con todo, por lo que el resultado es el arreglo de entrada completo.
        const output = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.linkl3.dev" },
        ];
        expect(filterByTerm(input, "")).toEqual(output);
    });
});