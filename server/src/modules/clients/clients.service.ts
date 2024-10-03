import { Client } from './clients.model';
import ClientRepository from './clients.repository';

class ClientService {
    async getAllClients({ limit, offset, sortField, sortOrder }: any) {
        return await Client.findAndCountAll({
          limit,
          offset,
          order: [[sortField, sortOrder]],
        });
      }

    async getClientById(id: number) {
        return ClientRepository.findById(id);
    }

    async createClient(data: any) {
        return ClientRepository.create(data);
    }

    async updateClient(id: number, data: any) {
        return ClientRepository.update(id, data);
    }

    async deleteClient(id: number) {
        return ClientRepository.delete(id);
    }
}

export default new ClientService();
