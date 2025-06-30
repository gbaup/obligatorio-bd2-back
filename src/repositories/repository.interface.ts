interface IRepository<T> {
  find(params?: { where?: Record<string, any> }): Promise<T[]>;

  findOne(params?: { where?: Record<string, any> }): Promise<T | null>;

  findById(id: string | number): Promise<T | null>;

  create(data: Partial<T>): Promise<T>;

  update(id: string | number, data: Partial<T>): Promise<T | null>;

  delete(id: string | number): Promise<void>;
}

export { IRepository };
