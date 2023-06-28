const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.", async () => {
    const response = await request(server).get("/cafes");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
  it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
    const idInexistente = 10;
    const token = "token";
    const response = await request(server)
      .delete(`/cafes/${idInexistente}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });
  it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.", async () => {
    const nuevoCafe = {
      id: 5,
      nombre: "Cafe de Prueba",
    };
    const jwt = "token";
    const response = await request(server).post("/cafes").send(nuevoCafe);

    expect(response.statusCode).toBe(201);
  });
  it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async () => {
    const idParametro = 2;
    const cafeActualizado = {
      id: 3,
      nombre: 'Café actualizado',
    };

    const response = await request(server)
      .put(`/cafes/${idParametro}`)
      .send(cafeActualizado);

    expect(response.statusCode).toBe(400);
  })
});
