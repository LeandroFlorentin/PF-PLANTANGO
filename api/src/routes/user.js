const { Router } = require("express");
const { DailyUser, User, Plants, Favorites } = require("../db");

const UserR = Router();

UserR.get("/daily/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      let diario = await DailyUser.findAll({ where: { UserIdUser: id } });
      return res.status(200).json(diario[0]);
    } else {
      return res.status(400).send({ error: "No se encontro la id" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

UserR.put("/daily/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!id) {
      return res.status(400).send({ error: "No se encontro la id" });
    } else {
      await DailyUser.update(
        { title: title, cont: body },
        { where: { UserIdUser: id } }
      );
      return res
        .status(201)
        .send({ message: "Los datos se cambiaron exitosamente" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

UserR.post("/", async (req, res) => {
  try {
    let { username, email, pass, name, lastName, nPhone } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: "falta usuario o mail" });
    }
    if (pass === "") pass = null;
    if (name === "") name = null;
    if (lastName === "") lastName = null;
    if (nPhone === "") nPhone = null;

    await User.create({
      username,
      email,
      pass,
      name,
      lastName,
      nPhone,
    });
    const tUser = await User.findAll({ where: { email } });
    await DailyUser.create({
      UserIdUser: tUser[0].dataValues.idUser,
    });

    return res
      .status(201)
      .send({ message: `${username}, tu usuario fue creado con exito!` });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

UserR.get("/", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "falta ingresar un usuario" });
  }
  const userTable = await User.findAll({ where: { username } });
  return res.status(200).json(userTable);
});

UserR.post("/favorites/:idU/:idP", async (req, res) => {
  try {
    const { idU, idP } = req.params;
    if (!idU || !idP) {
      return res.status(400).send({ error: "No eviaste la id del usuario o planta" });
    }
    const user = await User.findByPk(idU);
    const planta = await Plants.findByPk(idP);

    user.addPlants(planta);
    return res.status(201).send({
      message: `Se añadio ${planta.namePlant}, a los favoritos de ${user.username}`,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

UserR.get("/favorites/:idU", async (req, res) => {
  try {

  const {idU} = req.params;
  if(!idU){
    return res.status(400).send({ error: "No eviaste la id del usuario" });
  }

  const favId = await Favorites.findAll({where:{UserIdUser:idU}});

  const plantasF = await Plants.findAll({where:{codPlant:favId[0].dataValues.PlantCodPlant}})

  res.status(200).send(plantasF);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = UserR;
