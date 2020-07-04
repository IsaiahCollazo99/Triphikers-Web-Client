const db = require("../../db/db");

module.exports = {
  createNewUser = async (req, res, next) => {
    try {
      const { id, full_name, email, age, gender, bio, country_of_origin } = req.body;
      let user = await db.one(
        `INSERT INTO users(id, full_name, email, age, gender, bio, country_of_origin)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [id, full_name, email, age, gender, bio, country_of_origin]
      )
      res.status(200).json({
        status: "OK",
        user,
        message: "Create user."
      })

    } catch (error) {
      next(error)
    }
  }
}