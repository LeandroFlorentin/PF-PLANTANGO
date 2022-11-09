const { Router } = require("express");
const { Plants } = require("../db");
const dbBuild = require("../dbBuild");
const {getDbId} = require ("../controller/plantas.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const tabla = await Plants.findAll();
  const { search } = req.query;

  try {
    if (search) {
      const tabl2 = await Plants.findAll();

      let newTable = tabl2.filter(
        (e) =>
          e.namePlant
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          e.ubication
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          e.luminosidad
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          e.riego.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          e.tamano.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          e.tipo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          e.clima.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

      res.status(200).send(newTable);

    } else {

      if (!tabla.length) {
        for (let i = 0; i < dbBuild.length; i++) {
          let nObj = {
            namePlant: dbBuild[i].NOMBRE,
            descripPlant: dbBuild[i].DESCRIPCION,
            ubication: dbBuild[i].UBICACION,
            luminosidad: dbBuild[i].LUMINOSIDAD,
            riego: dbBuild[i].RIEGO,
            tamano: dbBuild[i].TAMANIO,
            tipo: dbBuild[i].TIPO,
            clima: dbBuild[i].PREFERENCIA_CLIMATICA,
            toxicidad: dbBuild[i].TOXICIDAD,
            statePlant: true,
            imagePlant: dbBuild[i].IMAGEN,
          };
          await Plants.create(nObj);
        }
        const tabla2 = await Plants.findAll();
        return res.status(201).send(tabla2);
      } else {
        return res.status(200).send(tabla);
      }
    }
  } catch (error) {
    return res.status(400).send("algo salio mal");
  }
});

router.put("/", async (req, res) => {
  const obj = req.body;
  try {
    if (
      !obj.codPlant ||
      !obj.namePlant ||
      !obj.descripPlant ||
      !obj.ubication ||
      !obj.luminosidad ||
      !obj.riego ||
      !obj.tamano ||
      !obj.tipo ||
      !obj.clima ||
      obj.toxicidad === undefined
    ) {
      return res
        .status(400)
        .send("Necesitamos que completes la informacion obligatoria");
    } else {
      await Plants.destroy({ where: { codPlant: obj.codPlant }, force: true });
      let nObj = {
        codPlant: obj.codPlant,
        namePlant: obj.namePlant,
        descripPlant: obj.descripPlant,
        ubication: obj.ubication,
        luminosidad: obj.luminosidad,
        riego: obj.riego,
        tamano: obj.tamano,
        tipo: obj.tipo,
        clima: obj.clima,
        toxicidad: obj.toxicidad,
        statePlant: obj.statePlant || true,
        imagePlant: obj.imagePlant || undefined,
      };
      await Plants.create(nObj);
      return res.status(201).send("Los cambios fueron realizados con exito.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

<<<<<<< HEAD
//ENCONTRAR PLANTA POR PARAMS 
router.get("/:id", async (req, res)=>{
  try {
    const {id} = req.params;

    let plant = await getDbId(id)
    console.log(plant);
    return res.status(200).json(plant)

  } catch (error) {
    res.status(400).json("Error en Routes -> plants.js: ",error.message)
  }
})

=======
router.get("/types", async (req, res) => {
  const tabla = await Plants.findAll();
  try {
    let setR = new Set();
    let setT = new Set();
    let setTi = new Set();
    let setC = new Set();

    let arrRiego = [];
    let arrTamano = [];
    let arrTipo = [];
    let arrClima = [];

    for (let i = 0; i < tabla.length; i++) {
      let sRiego = tabla[i].riego.split(",");
      sRiego.map((e) => arrRiego.push(e));
      let sTamano = tabla[i].tamano.split(",");
      sTamano.map((e) => arrTamano.push(e));
      let sTipo = tabla[i].tipo.split(",");
      sTipo.map((e) => arrTipo.push(e));
      let sClima = tabla[i].clima.split(",");
      sClima.map((e) => arrClima.push(e));
    }

    let i = 0;
    while (
      i < arrRiego.length ||
      i < arrTamano.length ||
      i < arrTipo.length ||
      i < arrClima.length
    ) {
      if (arrRiego[i]) {
        setR.add(arrRiego[i]);
      }
      if (arrTamano[i]) {
        setT.add(arrTamano[i]);
      }
      if (arrTipo[i]) {
        setTi.add(arrTipo[i]);
      }
      if (arrClima[i]) {
        setC.add(arrClima[i]);
      }
      i++;
    }

    let objFinal = {
      riego: Array.from(setR),
      tamano: Array.from(setT),
      tipo: Array.from(setTi),
      clima: Array.from(setC),
    };
    return res.status(200).send(objFinal);
  } catch (e) {
    return res.status(400).send(e);
  }
});
>>>>>>> ec6856458a7826c8acec5ef624e8c196e0364cd5
module.exports = router;
