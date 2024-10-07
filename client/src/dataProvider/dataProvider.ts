import {
	DataProvider,
	GetListResult,
	GetOneParams,
	GetOneResult,
	GetManyResult,
	GetManyReferenceResult,
	UpdateParams,
	UpdateResult,
	UpdateManyParams,
	UpdateManyResult,
	CreateParams,
	CreateResult,
	DeleteParams,
	DeleteResult,
	DeleteManyParams,
	DeleteManyResult,
	RaRecord,
	GetListParams,
	Identifier,
	HttpError,
} from "react-admin";
import ky from "ky";

const apiUrl = import.meta.env["VITE_API_URL"]; // Получаем базовый URL API из переменных окружения

// Универсальная функция для выполнения HTTP-запросов с обработкой ошибок
const apiRequest = async <T>(
	method: "get" | "post" | "put" | "delete",
	url: string,
	data?: Record<string, unknown>
): Promise<T> => {
	try {
		const options = data ? { json: data } : {}; // Если есть данные, добавляем их в тело запроса
		const response = await ky[method](url, options); // Выполняем запрос с помощью ky
		return await response.json<T>(); // Возвращаем распарсенный JSON-ответ
	} catch (error: any) {
		if (error.response) {
			const errorMessage = await error.response.json();
			console.log(errorMessage);

			// Обработка ошибок, пришедших с сервера
			const errors: Record<string, string> = {};
			let errorDetails = "";
			if (errorMessage.details && Array.isArray(errorMessage.details)) {
				errorMessage.details.forEach((detail: any, index: number) => {
					errors[detail.path] = detail.message;
					errorDetails += detail.message;
					if (index < errorMessage.details.length - 1) {
						errorDetails += ", "; // Добавляем запятую между сообщениями об ошибках
					}
				});
			}

			console.log("Ошибки:", errorDetails); // Логируем объединенные ошибки

			// Бросаем HttpError с информацией об ошибках для обработки в react-admin
			throw new HttpError(
				errorDetails || "Ошибка валидации",
				error.response.status,
				errors // Передаём объект ошибок для связывания с полями формы
			);
		} else {
			throw new Error("Ошибка сети или сервера");
		}
	}
};

// Функция для построения URL с параметрами запроса
const buildUrlWithQuery = (
	resource: string,
	query: Record<string, any> = {}
) => {
	const url = new URL(`${apiUrl}/${resource}`);
	Object.keys(query).forEach((key) => {
		url.searchParams.append(key, query[key]);
	});
	return url.toString();
};

// Функция для пакетного выполнения запросов (updateMany, deleteMany)
const batchRequest = async (
	resource: string,
	ids: Array<Identifier>,
	method: "put" | "delete",
	data?: Record<string, unknown>
) => {
	// Выполняем запросы для каждого ID параллельно
	const promises = ids.map((id) => {
		const url = `${apiUrl}/${resource}/${id}`;
		return apiRequest(method, url, data);
	});
	await Promise.all(promises); // Ждём, пока все запросы завершатся
	return { data: ids };
};

const dataProvider: DataProvider = {
	getList: async <RecordType extends RaRecord>(
		resource: string,
		parameters: GetListParams
	): Promise<GetListResult<RecordType>> => {
		const { page = 1, perPage = 10 } = parameters.pagination || {};
		const { field = "id", order = "ASC" } = parameters.sort || {};
		const query = {
			page,
			limit: perPage,
			sortField: field,
			sortOrder: order,
			...parameters.filter, // Добавляем фильтры, если они есть
		};
		const url = buildUrlWithQuery(resource, query);
		const response = await apiRequest<{
			data: Array<RecordType>;
			total: number;
		}>("get", url);
		return { data: response.data ?? [], total: response.total };
	},

	getOne: async <RecordType extends RaRecord>(
		resource: string,
		parameters: GetOneParams
	): Promise<GetOneResult<RecordType>> => {
		const url = `${apiUrl}/${resource}/${parameters.id}`;
		return { data: await apiRequest<RecordType>("get", url) };
	},

	getMany: async <RecordType extends RaRecord>(
		resource: string,
		parameters: { ids: Array<Identifier> }
	): Promise<GetManyResult<RecordType>> => {
		const url = buildUrlWithQuery(resource, { ids: parameters.ids.join(",") });
		const response = await apiRequest<{ data: Array<RecordType> }>("get", url);
		return { data: response.data };
	},

	getManyReference: async <RecordType extends RaRecord>(
		resource: string,
		parameters: { target: string; id: Identifier }
	): Promise<GetManyReferenceResult<RecordType>> => {
		const url = buildUrlWithQuery(resource, {
			[parameters.target]: parameters.id,
		});
		const response = await apiRequest<{
			data: Array<RecordType>;
			total: number;
		}>("get", url);
		return { data: response.data, total: response.total };
	},

	update: async <RecordType extends RaRecord>(
		resource: string,
		parameters: UpdateParams<RecordType>
	): Promise<UpdateResult<RecordType>> => {
		console.log(parameters); // Логируем параметры обновления (в продакшене можно убрать)

		const url = `${apiUrl}/${resource}/${parameters.id}`;
		return { data: await apiRequest<RecordType>("put", url, parameters.data) };
	},

	updateMany: async (
		resource: string,
		parameters: UpdateManyParams
	): Promise<UpdateManyResult> => {
		return batchRequest(resource, parameters.ids, "put", parameters.data);
	},

	create: async <RecordType extends RaRecord>(
		resource: string,
		parameters: CreateParams<RecordType>
	): Promise<CreateResult<RecordType>> => {
		const url = `${apiUrl}/${resource}`;
		return { data: await apiRequest<RecordType>("post", url, parameters.data) };
	},

	delete: async <RecordType extends RaRecord>(
		resource: string,
		parameters: DeleteParams<RecordType>
	): Promise<DeleteResult<RecordType>> => {
		const url = `${apiUrl}/${resource}/${parameters.id}`;
		await apiRequest("delete", url);
		if (!parameters.previousData) {
			throw new Error("Previous data is not available for deletion.");
		}
		return { data: parameters.previousData };
	},

	deleteMany: async (
		resource: string,
		parameters: DeleteManyParams
	): Promise<DeleteManyResult> => {
		return batchRequest(resource, parameters.ids, "delete");
	},
};

export default dataProvider;
