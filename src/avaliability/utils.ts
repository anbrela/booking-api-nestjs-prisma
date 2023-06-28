import { FilterAvailabilitiesDto } from './dto/filter-availabilities.dto';
import * as moment from 'moment/moment';

export const formatAvailabilitiesQuery = (
  filterAvailabilities: FilterAvailabilitiesDto,
) => {
  const { day, status, companyId } = filterAvailabilities;

  let query;

  if (day) {
    const dayBefore = moment(day).subtract(1, 'days').toISOString();
    const dayAfter = moment(day).add(1, 'days').toISOString();

    query = {
      day: {
        gte: dayBefore,
        lte: dayAfter,
      },
    };
  }

  if (companyId) {
    query = {
      ...query,
      companyId,
    };
  }

  if (status) {
    query = {
      ...query,
      status,
    };
  }

  return query;
};
