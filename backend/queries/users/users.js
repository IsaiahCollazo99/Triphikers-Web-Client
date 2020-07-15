const db = require("../../db/db");

module.exports = {
	createUser: async (req, res, next) => {
		try {
			const {
				id,
				full_name,
				email,
				age,
				profile_picture,
				gender,
				bio,
				country_of_origin,
			} = req.body;
			
			let user = await db.one(
				`INSERT INTO users(id, full_name, email, age, profile_picture, gender, bio, country_of_origin)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
				[id, full_name, email, age, profile_picture, gender, bio, country_of_origin]
			);

			res.status(200).json({
				status: "OK",
				user,
				message: "Create user.",
			});
		} catch (error) {
			next(error);
		}
	},
	getAllUsers: async (req, res, next) => {
		try {
			let users = await db.any(`SELECT * FROM users`);
			if (users.length) {
				res.status(200).json({
					status: "OK",
					users,
					message: "Retrieved all users.",
				});
			} else {
				throw { status: 404, error: "No users found" };
			}
		} catch (error) {
			console.log(error);
		}
	},

	getUserByFullName: async (req, res, next) => {
		try{
				const { fullName } = req.params;
				const { userProfile } = req.query;
				let user = await db.any(
						`SELECT * FROM users
						WHERE full_name=$1`, fullName
				)

				if(user.length) {
						if(userProfile) {
								res.status(200).json({
										status: "OK",
										user: user[0],
										message: "Successfully retrieved user"
								})
						} else {
								throw { status: 409, error: "User with that fullName exists" }
						}
				} else {
						res.status(200).json({
								status: "OK",
								message: "No user exists with that fullName"
						})
				}
		} catch (error) {
				next(error)
		}
},

	getUserById: async (req, res, next) => {
		try {
			const { id } = req.params;
			let user = await db.one(
				`SELECT * FROM users
            WHERE id=$1`,
				id
			);
			res.status(200).json({
				status: "OK",
				user,
				message: "Retrieved user.",
			});
		} catch (error) {
			next(error);
		}
	},

	updateUser: async (req, res, next) => {
		try {
			const { bio, profile_picture, country_of_origin } = req.body;

			const { id } = req.params;

			let user = {};

			if (bio) {
				let updated = await db.one(
					`UPDATE users
                SET bio=$1
                WHERE id=$2 RETURNING *`,
					[bio, id]
				);
				user = {
					...updated,
				};
			}

			if (profile_picture) {
				let updated = await db.one(
					`UPDATE users
                SET profile_picture=$1
                WHERE id=$2 RETURNING *`,
					[profile_picture, id]
				);
				user = {
					...updated,
				};
			}

			if (gender) {
				let updated = await db.one(
					`UPDATE users
                SET gender=$1
                WHERE id=$2 RETURNING *`,
					[gender, id]
				);
				user = {
					...updated,
				};
			}
			if (country_of_origin) {
				let updated = await db.one(
					`UPDATE users
              SET country_of_origin=$1
              WHERE id=$2 RETURNING *`,
					[country_of_origin, id]
				);
				user = {
					...updated,
				};
			}

			res.status(200).json({
				status: "OK",
				user,
				message: "Successfully updated user",
			});
		} catch (error) {
			next(error);
		}
	},
  getUsersPosts: async (req, res, next) => {
    try {
      // const { id } = req.params;
      let userPost = await db.any(``)
      if (userPost.length) {
        res.status(200).json({
          status: "OK",
          userPost,
          message:"Retrieve all post  "
        })
      } else {
        throw { status: 404, error: "User has no [posts"}
      }
    } catch (error) {
      if (error.received === 0) {
        res.status(404).json({
          status: 404,
          error:"User doesn't exist."
        })
      } else {
        next(error)
      }
    }
  },

  isUserExisting: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (id) {
        await db.one(" Select* From users where id=$1", id);
        next()
      } else {
        throw{ error: 400, error: "No ID supplied"}
      }
    } catch (error) {
      if (error.received === 0) {
        next({
          status: 400,
          error: "User ID doesn't exist"
        });
      } else {
        next(error);
      }
    }
  }
}
