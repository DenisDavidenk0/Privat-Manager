import { Client } from './clients.model';

class ClientRepository {
    async findAll() {
        return Client.findAll();
    }

    async findById(id: number) {
        return Client.findByPk(id);
    }

    async create(data: any) {
        return Client.create(data);
    }

    async update(id: number, data: any) {
        return Client.update(data, { where: { id } });
    }

    async delete(id: number) {
        return Client.destroy({ where: { id } });
    }
}

export default new ClientRepository();
