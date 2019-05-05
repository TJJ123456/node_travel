import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

export const Users = modelFactory(collectionFactory('users', idIndex))
export const Tickets = modelFactory(collectionFactory('tickets', idIndex))
export const Questions = modelFactory(collectionFactory('questions', idIndex))
export const Foods = modelFactory(collectionFactory('foods', idIndex))
export const FoodTypes = modelFactory(collectionFactory('foodTypes', idIndex))
export const Hotels = modelFactory(collectionFactory('hotels', idIndex))
export const Spots = modelFactory(collectionFactory('spots', idIndex))
export const Plans = modelFactory(collectionFactory('plans', idIndex))
export const Comments = modelFactory(collectionFactory('comments', idIndex))

