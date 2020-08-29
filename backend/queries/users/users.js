const db = require("../../db/db");

module.exports = {
	createUser: async (req, res, next) => {
		try {
			const {
				id,
				full_name,
				first_name,
				last_name,
				email,
				age,
				profile_picture,
				gender,
				bio,
				country_of_origin,
				language,
				username
			} = req.body;
			
			let user = await db.one(
				`INSERT INTO users(id, full_name, first_name, last_name, email, age, profile_picture, 
					gender, bio, country_of_origin, language, username)
      			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
				[id, full_name, first_name, last_name, email, age, profile_picture, gender, bio, 
				country_of_origin, language, username]
			);
			

			res.status(200).json({
				status: "OK",
				user,
				message: "Create user.",
			});
		} catch (error) {
			console.log(error)
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

	getUserById: async (req, res, next) => {
		const { id } = req.params;
		try {
			let user = await db.one(
				"SELECT * FROM users WHERE id=$1", id
			);
			res.status(200).json({
				status: "OK",
				user,
				message: "Retrieved user.",
			});
		} catch (error) {
			console.log(error)
			if (error.received === 0) {
				next({status: 404, error: `User ${id} doesn't exist`})
			} else {
				next(error);
			}
		}
	},

	updateUser: async (req, res, next) => {
		try {
			const { 
				full_name,
				first_name,
				last_name,
				country_of_origin, 
				gender,
				bio, 
				profile_picture,
				facebook_link,
				twitter_username,
				instagram_username
			} = req.body;

			const { id } = req.params;
			
			if(full_name) {
				let updated = await db.one(`
				UPDATE users
				SET full_name=$1
				WHERE id=$2 RETURNING *
				`, [full_name, id]
				);

				user = updated;
			}

			if(first_name) {
				let updated = await db.one(`
				UPDATE users
				SET first_name=$1
				WHERE id=$2 RETURNING *
				`, [first_name, id]
				);

				user = updated;
			}

			if(last_name) {
				let updated = await db.one(`
				UPDATE users
				SET last_name=$1
				WHERE id=$2 RETURNING *
				`, [last_name, id]
				);

				user = updated;
			}
			
			if (country_of_origin) {
				let updated = await db.one(`
				UPDATE users
				SET country_of_origin=$1
				WHERE id=$2 RETURNING *
				`, [country_of_origin, id]
				);
				user = updated;
			}

			if (gender) {
				let updated = await db.one(`
				UPDATE users
				SET gender=$1
				WHERE id=$2 RETURNING *
				`, [gender, id]
				);
				user = updated;
			}

			if (bio) {
				let updated = await db.one(
					`UPDATE users
					SET bio=$1
					WHERE id=$2 RETURNING *`,
					[bio, id]
				);
				user = updated;
			}
			
			if (profile_picture) {
				let updated = await db.one(
					`UPDATE users
					SET profile_picture=$1
					WHERE id=$2 RETURNING *`,
					[profile_picture, id]
				);
				user = updated;
			}

			if(facebook_link) {
				let updated = await db.one(
					`UPDATE users
					SET facebook_link=$1
					WHERE id=$2 RETURNING *`,
					[facebook_link, id]
				);
				user = updated;
			}

			if(twitter_username) {
				let updated = await db.one(
					`UPDATE users
					SET twitter_username=$1
					WHERE id=$2 RETURNING *`,
					[twitter_username, id]
				);
				user = updated;
			}

			if(instagram_username) {
				let updated = await db.one(
					`UPDATE users
					SET instagram_username=$1
					WHERE id=$2 RETURNING *`,
					[instagram_username, id]
				);
				user = updated;
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

  getUserTrips: async (req, res, next) => {
    try {
      const { id } = req.params;
	  let userTrips = await db.any(`
		SELECT users.full_name, users.age, users.profile_picture, 
		users.country_of_origin, users.gender, users.bio, users.id AS user_id, 
		trips.*
		FROM trips
		LEFT JOIN users on users.id = trips.planner_id
		WHERE users.id=$1
	  `, id)

        res.status(200).json({
          status: "OK",
          userTrips,
          message:"Retrieve all trips for user"
        })
    } catch (error) {
        next(error)
    }
  },

  isUserExisting: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (id) {
        await db.one(" SELECT * FROM users WHERE id=$1", id);
        next()
      } else {
        throw{ error: 400, error: "No ID supplied"}
      }
    } catch (error) {
      if (error.received === 0) {
        throw {
          status: 400,
          error: "User doesn't exist"
        };
      } else {
        throw error;
      }
    }
  },

	getUserFriendRequests: async ( req, res, next ) => {
		try {
			const { id } = req.params;

			const requests = await db.any(`
				SELECT friend_requests.*, users.full_name, users.age, users.country_of_origin, 
				users.gender, users.profile_picture
				FROM friend_requests
				LEFT JOIN users ON users.id=friend_requests.requester_id
				WHERE requested_id=$1
			`, [id]);

			res.status(200).json({
				status: "OK",
				requests,
				message: "Retrieved all user friend Requests"
			})
		} catch ( error ) {
			next(error);
		}
	},

	deleteFriendRequest: async ( req, res, next ) => {
        const { id } = req.params;
        const { requester_id } = req.query;
        try {
            await db.none(`
                DELETE FROM friend_requests
                WHERE requested_id=$1 AND requester_id=$2
            `, [id, requester_id]);

            res.status(200).json({
                status: "OK",
                message: "Deleted Request"
            })
        } catch ( error ) {
            next(error);
        }
	},
	
	getUsersFriends: async ( req, res, next ) => {
		const { id } = req.params;
		try {
			const friends = await db.any(`
				SELECT * FROM friends_lists
				LEFT JOIN users on users.id=friends_lists.user_2
				WHERE friends_lists.user_1=$1
			`, id)

			res.status(200).json({
				status: "OK",
				friends,
				message: "Retrieved friends"
			})
		} catch ( error ) {

		}
	},

	deleteFriend: async ( req, res, next ) => {
		const { id } = req.params;
		try {
			const { friend_id } = req.query;

			await db.none(`
				DELETE FROM friends_lists
				WHERE user_1=$1 AND user_2=$2
			`, [id, friend_id]);

			await db.none(`
				DELETE FROM friends_lists
				WHERE user_1=$1 AND user_2=$2
			`, [friend_id, id]);

			res.status(200).json({
				status: "OK",
				message: "Removed friend"
			})
		} catch ( error ) {
			next(error);
		}
	},

	getUserByUsername: async ( req, res, next ) => {
		const { username } = req.params;
		try {
			const user = await db.any(`
				SELECT * FROM users
				WHERE username=$1
			`, username);

			if(user.length) {
				res.status(200).json({
					status: "OK",
					user,
					message: "Retrieved User."
				})
			} else {
				res.status(200).json({
					status: "OK",
					message: "No user found."
				})
			};

		} catch ( error ) {
			next(error);
		}
	},

	getUserByEmail: async ( req, res, next ) => {
		const { email } = req.params;
		try {
			const user = await db.any(`
				SELECT * FROM users
				WHERE email=$1
			`, email);

			if(user.length) {
				res.status(200).json({
					status: "OK",
					user,
					message: "Retrieved User."
				})
			} else {
				res.status(200).json({
					status: "OK",
					message: "No user found."
				})
			};

		} catch ( error ) {
			next (error);
		}
	}
}
