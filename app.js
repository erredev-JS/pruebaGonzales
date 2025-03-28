const readline = require("readline")
const fs = require ("fs/promises")
const yargs = require("yargs");
const { writeFile } = require("fs");

const argv = yargs.option("file", {
    alias: "f",
    type: "string",
    description: "Nombre del archivo",
    demandOption: true,
}).argv


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => resolve(answer))
    });
}

async function main() {
    try {
        const nombreProducto = await askQuestion('Ingresa el nombre del producto: ')
        const precioProducto = await askQuestion('Ingresa el precio del producto: ')
        const cantidadProducto = await askQuestion('Ingresa la cantidad del producto: ')
        const producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            cantidad: cantidadProducto
        }
       try {
        await fs.access(`./${argv.file}.json`);

        // Si el archivo existe, lee su contenido y agrega el nuevo producto
        const data = await fs.readFile(`./${argv.file}.json`, 'utf-8');
        const productos = JSON.parse(data);
        productos.push(producto); // Añade el nuevo producto

        // Escribe el archivo actualizado
        await fs.writeFile(`./${argv.file}.json`, JSON.stringify(productos, null, 2));
        console.log("Producto añadido al archivo.");
        const newData = await fs.readFile(`./${argv.file}.json`, 'utf-8');
        console.log(newData);

       } catch (error) {
        const productos = [producto];
        await fs.writeFile(`./${argv.file}.json`, JSON.stringify(productos, null, 2));
        console.log("Archivo creado y producto añadido.");
        const newData = await fs.readFile(`./${argv.file}.json`, 'utf-8');
        console.log(newData);
       }
    } catch (error) {
        console.error(error)
    }finally{
        rl.close()
    }
}
main()