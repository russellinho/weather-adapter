import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { AdapterRequest, AdapterResponse, Execute } from '@chainlink/types'

const customParams = {
  city: ['q', 'city', 'town'],
  endpoint: false
 }

export const execute = async (input: AdapterRequest): Promise<AdapterResponse> => {
  const validator = new Validator(input, customParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.jobRunID
  const apiKey = process.env.API_KEY ?? ''
  const city = validator.validated.data.city

  const config = {
    method: 'post',
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      q: city,
      appid: apiKey,
    },
  }

  var response = null;
  try {
    response = await Requester.request(config);
  } catch (error) {
    var reason = (error.cause.message.endsWith("404") ? "You've entered an invalid city." : "");
    return Requester.success(jobRunID, {data: {message: error.cause.message + " | Reason: " + reason}, status: error.statusCode}, true);
  }

  return Requester.success(jobRunID, {data: {"temperature": response?.data.main.temp}, status: response?.status}, true);
}

export const makeExecute = (): Execute => {
  return async (request: AdapterRequest) => execute(request)
}
