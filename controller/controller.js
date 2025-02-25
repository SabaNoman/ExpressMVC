import { dbConnection } from "../database/connection.js";
import { userModel } from "../model/myUsers.js";

const viewHome = async (req, res) => {
    try {      
        // await dbConnection();
        res.render('../views/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }    
}

const viewAll = async (req, res) => {
    try {      
        await dbConnection();
        let userData = await userModel.find({});
        console.log(userData);
        res.render('view', {userData});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");   
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const viewAddUser = async (req, res) => {
    try {      
        await dbConnection();
        res.render('add');   
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const addNewUser = async (req, res) => {
    try {             
        const {name, email} = req.body;
        console.log(name, email)
        await dbConnection();
        const newUser = new userModel({ name: name, email: email });        
        await newUser.save();
        res.redirect('/api/addUser?success=true');
        console.log("User added successfully!")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const viewEditUser = async (req, res) => {
    try {      
        await dbConnection();
        res.render('edit');   
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const editUser = async (req, res) => {
    try {      
        await dbConnection();
        const result = await userModel.findOne({ email: req.body.email }).updateOne({$set: { name: req.body.name, email: req.body.email}});
        if (result.modifiedCount > 0) {
            res.redirect('/api/editUser?success=true');
            console.log(`${result.modifiedCount} document updated successfully!`);
        } else {
            res.redirect('/api/editUser?failure=true');
            console.log('No document was updated (perhaps it did not exist).');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const viewDeleteUser = async (req, res) => {
    try {      
        await dbConnection();
        res.render('delete');   
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteUser = async (req, res) => {
    try {      
        await dbConnection();
        const result = await userModel.deleteOne({ email:req.body.email });
        if (result.deletedCount > 0) {
            res.redirect('/api/deleteUser?success=true');
        } else {
            res.redirect('/api/deleteUser?failure=true');
        }        
        console.log("User deleted successfully!")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export { viewHome, viewAll, viewAddUser, addNewUser, viewEditUser, viewDeleteUser, editUser, deleteUser }