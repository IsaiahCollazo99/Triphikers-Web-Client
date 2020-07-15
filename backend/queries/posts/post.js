// const db = require("../../db/db")

// module.exports = {
//     isPostExisting: async (req, res, next) => {
//         const getId = req.params.id;
//         const postId = req.body.post_id;
//         const id = getId ? getId : postId;
//         try {
//             if(id) {
//                 await db.one("Select * FROM posts where id=$1", id);
//                 next();
//             } else {
//                 throw { error: 400, error: "No ID supplied"}
//             }
//         } catch (error) {
//             if(error.received === 0) {
//                 res.status(404).json({
//                     status: 404,
//                     error: `Post ID: ${id} doesn't exist`
//                 })
//             } else {
//                 next(error);
//             }
//         }
//     },

//     getAllPosts: async (req, res, next) => {
//         try {
//             const posts = await db.any(
//                 `SELECT users.full_name, users.profile_pic, full_posts.*
//                 FROM (
//                    `
//             )

//             if(posts.length) {
//                 res.json({
//                     status: "OK",
//                     posts,
//                     message: "Retrieved all posts."
//                 })
//             } else {
//                 throw {status: 404, error: "No posts found."}
//             }
//         } catch (error) {
//             next(error);
//         }
//     },
    
//     // getPostById: async (req, res, next) => {
//     //     try {
//     //         const { id } = req.params;
//     //         const post = await db.one(
//     //             `SELECT users.full_name, users.profile_pic, full_posts.*
//     //             FROM (
//     //                 `, id
//     //         )

//     //         res.status(200).json({
//     //             status: "OK",
//     //             post,
//     //             message: "Retrieved post at id " + id
//     //         })
            
//     //     } catch (error) {
//     //         next(error);
//     //     }
//     // },

  
//     deletePost: async (req, res, next) => {
//         try {
//             const { id } = req.params;
//             const post = await db.one(`
//                 DELETE FROM posts 
//                 WHERE id=$1
//                 RETURNING *
//             `, id)

//             res.status(200).json({
//                 status: "OK",
//                 post,
//                 message: "Deleted post."
//             })

//         } catch (error) {
//             console.log(error);
//             next(error);
//         }
//     }
// } 