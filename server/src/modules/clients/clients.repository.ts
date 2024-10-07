import { clientType } from '../../schemas/client/create';
import { ClientEditType } from '../../schemas/client/update';
import { Client } from './clients.model';

class ClientRepository {
  async findAll() {
    return Client.findAll();
  }

  async findById(id: number) {
    return Client.findByPk(id);
  }

  async create(data: clientType) {
    return Client.create(data);
  }

  async update(id: number, data: ClientEditType) {
    // Обновляем клиента с указанным ID и запрашиваем возврат обновленных записей
    const updatedResult = await Client.update(data, {
      where: { id },
      returning: true,
    });

    // updatedResult — это массив, где:
    // updatedResult[0] — количество обновленных строк
    // updatedResult[1] — массив обновленных записей

    // Проверяем, была ли обновлена хотя бы одна строка
    if (updatedResult[0] === 0) {
      throw new Error('Client not found');
    }

    // Возвращаем обновлённого клиента (первую обновлённую запись)
    return updatedResult[1][0];
  }

  async delete(id: number) {
    return Client.destroy({ where: { id } });
  }
}

export default new ClientRepository();
