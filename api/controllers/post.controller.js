import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const query = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || undefined,
                    lte: parseInt(query.maxPrice) || undefined,
                },
            },
        });

        // setTimeout(() => {
        res.status(200).json(posts);
        // }, 3000);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to get posts" });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });

        const token = req.cookies?.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if (err) {

                    return res.status(401).json({ message: "Invalid token" });
                }

                const saved = await prisma.savedPost.findUnique({
                    where: {
                        userId_postId: {
                            postId: id,
                            userId: payload.id,
                        },
                    },
                });

                return res.status(200).json({ ...post, isSaved: saved ? true : false });
            });
        } else {

            return res.status(200).json({ ...post, isSaved: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to get post" });
    }
};


export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                },
            },
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create post" });
    }
};

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const { postData, postDetail } = req.body; // Получаем и postData, и postDetail из тела запроса
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: { postDetail: true }, // Включаем связанные детали поста
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }

        // Проверяем, что текущий пользователь — владелец поста
        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized!" });
        }

        // Обновляем данные поста
        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                ...postData, // Обновляем postData
            },
        });

        // Обновляем данные деталей поста, если они переданы
        if (postDetail && post.postDetail) {
            await prisma.postDetail.update({
                where: { id: post.postDetail.id }, // Используем id существующего объекта postDetail
                data: {
                    ...postDetail, // Обновляем поля postDetail
                },
            });
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update post" });
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return res.status(404).json({ message: "Post controller: Post not found!" });
        }

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Post controller: Not Authorized!" });
        }

        // Step 1: Delete associated PostDetail if it exists
        await prisma.postDetail.deleteMany({
            where: { postId: id },
        });

        // Step 2: Delete related SavedPosts if they exist
        await prisma.savedPost.deleteMany({
            where: { postId: id },
        });

        // Step 3: Delete the post itself
        await prisma.post.delete({
            where: { id },
        });

        res.status(200).json({ message: "Post controller: Post deleted" });
    } catch (err) {
        console.error("Error in deletePost:", JSON.stringify(err, null, 2));
        res.status(500).json({ message: "Post controller: Failed to delete post", error: err.message });
    }
};

