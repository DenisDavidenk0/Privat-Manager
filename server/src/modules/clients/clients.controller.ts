import { Request, Response, NextFunction } from 'express';
import ClientService from './clients.service';

class ClientController {
    async getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC' } = req.query;

      const offset = (+page - 1) * +limit;

      const clients = await ClientService.getAllClients({
        limit: Number(limit),
        offset: Number(offset),
        sortField: String(sortField),
        sortOrder: String(sortOrder),
      });

      res.json({
        data: clients.rows,
        total: clients.count,
      });
    } catch (error) {
      next(error);
    }
  }


    async getClientById(req: Request, res: Response, next: NextFunction) {
        try {
            const client = await ClientService.getClientById(Number(req.params.id));
            if (!client) {
                res.status(404).json({ message: 'Client not found' });
            } else {
                res.json(client);
            }
        } catch (error) {
            next(error);
        }
    }

    async createClient(req: Request, res: Response, next: NextFunction) {
        try {
            const newClient = await ClientService.createClient(req.body);
            res.status(201).json(newClient);
        } catch (error) {
            next(error);
        }
    }

    async updateClient(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedClient = await ClientService.updateClient(Number(req.params.id), req.body);
            res.json(updatedClient);
        } catch (error) {
            next(error);
        }
    }

    async deleteClient(req: Request, res: Response, next: NextFunction) {
        try {
            await ClientService.deleteClient(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new ClientController();
