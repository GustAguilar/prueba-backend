const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("Ruta GET para obtener cafes" , async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        const cafes = response.body;
        const cantidadObjetos = cafes.length;
        expect(status).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
        expect(cantidadObjetos).toBeGreaterThan(0);

    });

    it("Eliminar un cafe con un id que no existe", async () => {
        const jwt = "token";
        const id = "uno";
        const response = await request(server).delete(`/cafes/${id}`).set("Authorization", jwt).send();
        expect(response.statusCode).toBe(404);

    });

    it("Ruta POST agrega un cafe nuevo", async () => {
        const nuevoCafe = {id: 10, nombre: "Latte"};
        const result = await request(server).post("/cafes").send(nuevoCafe);
        const status = result.statusCode;
        const cafes = result.body;
        expect(cafes).toContainEqual(nuevoCafe);
        expect(status).toBe(201);
        
    });

    it("Ruta PUT devuelve 400", async () => {
        const id = "dos";
        const actCafe = {id: `${id}`, nombre: "Americano"};
        const response = await request(server).put("/cafes/:id").send(actCafe);
        const status = response.statusCode;
        expect(status).toBe(400);
    });

});
