import { Request, Response } from 'express';

import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response): Promise<Response> {
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
      return res.status(400).json({ error: 'Missing filters' });
    }

    const timeInMinutes = convertHoursToMinutes(time);

    const classes = await db('classes')
      .whereExists(function queryClassesBySchedule() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
          .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return res.json(classes);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction();

    try {
      const users_ids = await trx('users').insert({ name, avatar, whatsapp, bio });

      const classes_ids = await trx('classes').insert({ subject, cost, user_id: users_ids[0] });

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
        class_id: classes_ids[0],
        week_day: scheduleItem.week_day,
        from: convertHoursToMinutes(scheduleItem.from),
        to: convertHoursToMinutes(scheduleItem.to),
      }));

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Error while creating class',
      });
    }
  }
}
