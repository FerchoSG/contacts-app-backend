const ContactService = require('../services/contact.service');

class ContactController{
    static async getAllContacts(req, res){
        try {
            const allContacts = await ContactService.getAll();

            if(allContacts.length > 0) return res.status(200).json({data: allContacts})

            return res.status(200).json({message: 'No Contacts found'});
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getAContact(req, res){
        const {id} = req.params;
        if(!Number(id)) return res.status(400).json({message: 'invalid id'})

        try {
            const contact = await ContactService.getAContact(id);

            if(contact) return res.status(200).json({data: contact})

            return res.status(200).json({message: 'No contact found'});

        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async addContact(req, res){
        const { firstName, lastName, email, contactNumber } = req.body;
        
        const newContact = { firstName, lastName, email, contactNumber };
        
        Object.entries(newContact).map((key, value)=>{
            if(key[1] === undefined || !key[1]) {
                return res.status(400).json({message: `${key[0]} is undefind`});
            }
        })

        try {
            const contactCreated = await ContactService.addContact(newContact);
            return res.status(201).json({message: 'Contact created', data: contactCreated})
        } catch (error) {
            res.status(400).json(error)
        }

    }
    static async updateContact(req, res){
        const { firstName, lastName, email, contactNumber } = req.body;
        
        const {id} = req.params;
        
        if(!Number(id)) return res.status(400).json({message: 'invalid id'})
        
        const updateContact = { firstName, lastName, email, contactNumber }
      
        Object.entries(updateContact).map((key, value)=>{
            if(key[1] === undefined || !key[1]) {
                return res.status(400).json({message: `${key[0]} is undefind`});
            }
        })

        try {
            const contactUpdated = await ContactService.updateContact(Number(id), updateContact)
            if(contactUpdated)
                return res.status(200).json({message: 'Contact updated'})
        } catch (error) {
            res.status(400).json(error)
        }

    }

    static async deleteContact(req, res){
        const {id} = req.params;
        if(!Number(id)) return res.status(400).json({message: 'invalid id'})
        try {
            const deletedContact = await ContactService.deleteContact(Number(id));
            if(deletedContact)
                return res.status(200).json({message: 'Contact deleted', data: deletedContact});
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = ContactController;