const UserService = require('../services/user.service');
const { generatePassword } = require('../services/password.service');

class UserController{
    static async getAllUsers(req, res){
        try {
            const allUsers = await UserService.getAll();

            if(allUsers.length > 0) return res.status(200).json({data: allUsers})

            return res.status(200).json({message: 'no users found'});
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getAUser(req, res){
        const {id} = req.params;
        if(!Number(id)) return res.status(400).json({message: 'invalid id'})

        try {
            const user = await UserService.getAUser(id);

            if(user) return res.status(200).json({data: user})

            return res.status(200).json({message: 'no user found'});

        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async addUser(req, res){
        const { name, username, email, password } = req.body;
        
        const hashedPass = generatePassword(password);
        const newUser = { name, username, email, password: hashedPass}
        
        Object.entries(newUser).map((key, value)=>{
            if(key[1] === undefined || !key[1]) {
                return res.status(400).json({message: `${key[0]} is undefind`});
            }
        })

        try {
            const userCreated = await UserService.addUser(newUser);
            return res.status(201).json({message: 'user created', data: userCreated})
        } catch (error) {
            res.status(400).json(error)
        }

    }
    static async updateUser(req, res){
        const { name, username, email, password } = req.body;
        
        const {id} = req.params;
        
        if(!Number(id)) return res.status(400).json({message: 'invalid id'})
        
        const hashedPass = generatePassword(password);
        const updateUser = { name, username, email, password: hashedPass }

        Object.entries(updateUser).map((key, value)=>{
            if(key[1] === undefined || !key[1]) {
                return res.status(400).json({message: `${key[0]} is undefind`});
            }
        })

        try {
            const userUpdated = await UserService.updateUser(Number(id), updateUser)
            if(updateUser)
                return res.status(200).json({message: 'user updated'})
        } catch (error) {
            res.status(400).json(error)
        }

    }

    static async deleteUser(req, res){
        const {id} = req.params;
        if(!Number(id)) return res.status(400).json({message: 'invalid id'})
        try {
            const deletedUser = await UserService.deleteUser(Number(id));
            if(deletedUser)
                return res.status(200).json({message: 'user deleted', data: deletedUser});
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = UserController;