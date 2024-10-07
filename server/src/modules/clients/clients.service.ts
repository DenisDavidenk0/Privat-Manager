import { clientSchema } from '../../schemas/client/create';
import { clientEditSchema } from '../../schemas/client/update';
import { Client } from './clients.model';
import ClientRepository from './clients.repository';
import { ZodError } from 'zod';

class ClientService {
  async getAllClients({ limit, offset, sortField, sortOrder }: any) {
    // Получаем список клиентов с учетом пагинации и сортировки
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
    try {
      // Валидируем входные данные с помощью схемы создания клиента
      const parsedData = clientSchema.parse(data);
      return ClientRepository.create(parsedData);
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации в удобный формат для отправки клиенту
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        // Бросаем ошибку с деталями для обработки в контроллере
        throw {
          status: 400,
          message: 'Validation failed',
          errors: validationErrors,
        };
      }
      // Пробрасываем остальные ошибки дальше
      throw error;
    }
  }

  async updateClient(id: number, data: any) {
    try {
      // Валидируем входные данные с помощью схемы обновления клиента      
      const parsedData = clientEditSchema.parse(data);

      // Обновляем клиента и получаем обновлённые данные
      const updatedClient = await ClientRepository.update(id, parsedData);

      if (!updatedClient) {
        // Если клиент не найден после обновления, выбрасываем ошибку
        throw new Error('Client not found after update');
      }

      return updatedClient;
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации для отправки клиенту
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        // Бросаем ошибку с деталями для обработки в контроллере
        throw {
          status: 400,
          message: 'Validation failed',
          errors: validationErrors,
        };
      }
      // Пробрасываем остальные ошибки дальше
      throw error;
    }
  }

  async deleteClient(id: number) {
    return ClientRepository.delete(id);
  }
}

export default new ClientService();
