import type {
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
} from "react-admin";
import ky from "ky";

const apiUrl = import.meta.env["VITE_API_URL"];

const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: Record<string, unknown>
): Promise<T> => {
  const options = data ? { json: data } : {};
  const response = await ky[method](url, options);
  return response.json<T>();
};

const buildUrlWithQuery = (resource: string, query: Record<string, any> = {}) => {
  const url = new URL(`${apiUrl}/${resource}`);
  Object.keys(query).forEach((key) => { url.searchParams.append(key, query[key]); });
  return url.toString();
};

const batchRequest = async (
  resource: string,
  ids: Array<Identifier>,
  method: 'put' | 'delete',
  data?: Record<string, unknown>
) => {
  const promises = ids.map(id => {
    const url = `${apiUrl}/${resource}/${id}`;
    return apiRequest(method, url, data);
  });
  await Promise.all(promises);
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
      ...parameters.filter,
    };
    const url = buildUrlWithQuery(resource, query);
    const response = await apiRequest<{ data: Array<RecordType>; total: number }>('get', url);
    return { data: response.data ?? [], total: response.total };
  },

  getOne: async <RecordType extends RaRecord>(
    resource: string,
    parameters: GetOneParams
  ): Promise<GetOneResult<RecordType>> => {
    const url = `${apiUrl}/${resource}/${parameters.id}`;
    return { data: await apiRequest<RecordType>('get', url) };
  },

  getMany: async <RecordType extends RaRecord>(
    resource: string,
    parameters: { ids: Array<Identifier> }
  ): Promise<GetManyResult<RecordType>> => {
    const url = buildUrlWithQuery(resource, { ids: parameters.ids.join(",") });
    const response = await apiRequest<{ data: Array<RecordType> }>('get', url);
    return { data: response.data };
  },

  getManyReference: async <RecordType extends RaRecord>(
    resource: string,
    parameters: { target: string; id: Identifier }
  ): Promise<GetManyReferenceResult<RecordType>> => {
    const url = buildUrlWithQuery(resource, { [parameters.target]: parameters.id });
    const response = await apiRequest<{ data: Array<RecordType>; total: number }>('get', url);
    return { data: response.data, total: response.total };
  },

  update: async <RecordType extends RaRecord>(
    resource: string,
    parameters: UpdateParams<RecordType>
  ): Promise<UpdateResult<RecordType>> => {
    const url = `${apiUrl}/${resource}/${parameters.id}`;
    return { data: await apiRequest<RecordType>('put', url, parameters.data) };
  },

  updateMany: async (
    resource: string,
    parameters: UpdateManyParams
  ): Promise<UpdateManyResult> => {
    return batchRequest(resource, parameters.ids, 'put', parameters.data);
  },

  create: async <RecordType extends RaRecord>(
    resource: string,
    parameters: CreateParams<RecordType>
  ): Promise<CreateResult<RecordType>> => {
    const url = `${apiUrl}/${resource}`;
    return { data: await apiRequest<RecordType>('post', url, parameters.data) };
  },


  delete: async <RecordType extends RaRecord>(
    resource: string,
    parameters: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> => {
    const url = `${apiUrl}/${resource}/${parameters.id}`;
    await apiRequest('delete', url);
    if (!parameters.previousData) {
      throw new Error("Previous data is not available for deletion.");
    }
    return { data: parameters.previousData };
  },

  deleteMany: async (
    resource: string,
    parameters: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    return batchRequest(resource, parameters.ids, 'delete');
  },
};

export default dataProvider;
