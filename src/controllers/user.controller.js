const mockUsers = require('../data/users');

const getUsers = (req, res) => {
    try {
        return res.status(200).json({
            users: mockUsers,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

const getUserById = (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = mockUsers.find(user => user.id === userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

const createUser = (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required",
            });
        }

        const existingUser = mockUsers.find(user => user.name === name);
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const newUser = {
            id: mockUsers.length + 1,
            name,
            favorites: [],
        };
        mockUsers.push(newUser);
        return res.status(200).json({ user: newUser });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

const updateFavorites = (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { propertyId } = req.body;
        console.log(`[Tawan] LOG: 123 ---> `, 123)

        if (!userId || isNaN(userId)) {
            return res.status(400).json({
                message: "Valid User ID and Property ID are required",
            });
        }

        if (!propertyId || isNaN(propertyId)) {
            return res.status(400).json({
                message: "Valid User ID and Property ID are required",
            });
        }

        const user = mockUsers.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const favoriteIndex = user.favorites.indexOf(propertyId);

        if (favoriteIndex > -1) {
            user.favorites.splice(favoriteIndex, 1);
        } else {
            user.favorites.push(propertyId);
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error updating favorites:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateFavorites,
    getUserById
};