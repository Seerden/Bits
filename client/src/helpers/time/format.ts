import dayjs, { Dayjs } from 'dayjs';
import { Timestep } from 'types/time';

type TimescaleFormatter = {
    [t in Timestep]: (d: Dayjs) => string
}

export const timescaleFormatters: TimescaleFormatter = {
    'day': d => d.format('DD/MM'),
    'week': d => `week ${d.week()}`,  // @todo: display week number -- should map to a function instead of a format
    'month': d => d.format('MMM'),  // @todo: display month abbreviation
    'year': d => d.format('YYYY')
}