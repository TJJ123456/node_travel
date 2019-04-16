import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

export const Users = modelFactory(collectionFactory('users', idIndex))
export const Tickets = modelFactory(collectionFactory('tickets', idIndex))
export const Questions = modelFactory(collectionFactory('questions', idIndex))

