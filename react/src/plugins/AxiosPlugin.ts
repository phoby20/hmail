import { API_STATUS } from '../constants/apiStatus'
import { UnauthorizedError } from '../utils/exceptions/UnauthorizedError'
import { NotFoundError } from '../utils/exceptions/NotFoundError'
import { UnprocessableEntityError } from '../utils/exceptions/UnprocessableEntityError'
import { FailedDependencyError } from '../utils/exceptions/FailedDependencyError'
import { InternalServerError } from '../utils/exceptions/InternalServerError'
import { ServiceUnavailableError } from '../utils/exceptions/SerciveUnavailableError'
import { NetworkError } from '../utils/exceptions/NetworkError'
import { UnexpectedServerError } from '../utils/exceptions/UnexpectedServerError'

export const defineErrorHandler = (errStatus: number) => {
  switch (errStatus) {
    case API_STATUS.UNAUTHORIZED:
      return new UnauthorizedError()
    case API_STATUS.NOT_FOUND:
      return new NotFoundError()
    case API_STATUS.UNPROCESSABLE_ENTITY:
      return new UnprocessableEntityError()
    case API_STATUS.FAILED_DEPENDENCY:
      return new FailedDependencyError()
    case API_STATUS.INTERNAL_SERVER_ERROR:
      return new InternalServerError()
    case API_STATUS.SERVICE_UNAVAILABLE:
      return new ServiceUnavailableError()
    case undefined:
      return new NetworkError()
    default:
      return new UnexpectedServerError(errStatus)
  }
}
