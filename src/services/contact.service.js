const Contact = require('../models/Contacts');

class ContactService {
    static async getAll(){
        return await Contact.findAll()
    }

    static async getAContact(id){
        const contact = Contact.findOne({where: {id}});

        if(contact) return contact;
        if(!contact) return {message: 'contact does not exists'};
    }

    static async addContact(contact){
        const newContact = await Contact.create(contact);

        return newContact;
    }

    static async updateContact(id, updatecontact){
        const updatedContact = await Contact.update(updatecontact, {where: {id: id}});

        return updatedContact;
    }

    static async deleteContact(id){
        const contactDeleted = Contact.destroy({where: {id}});

        return contactDeleted;
    }
}

module.exports = ContactService;