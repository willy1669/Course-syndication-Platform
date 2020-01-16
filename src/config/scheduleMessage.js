import schedule from 'node-schedule-tz'

export const scheduleTask = async (dayOfWeek, hour, minute, second,) => {
    let rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(dayOfWeek)];
    rule.hour = hour;
    rule.minute = minute;
    rule.tz = timeZone;
    rule.second = second;
    return rule;
}