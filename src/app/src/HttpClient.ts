import axios from 'axios'
import constants from '../../configs/constants'

export const HttpClient = axios.create({
  baseURL: constants.app.URL,
})
