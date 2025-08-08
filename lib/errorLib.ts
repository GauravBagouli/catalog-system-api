import moment from 'moment-timezone';

interface SequelizeParentError {
  message: string | string[];
  sql?: any;
}

interface SequelizeError {
  parent?: SequelizeParentError;
  message: string;
}

export const generateErrorMsg = (
  mgrName: string,
  err: SequelizeError
): SequelizeError => {
  if (err.parent && err.parent.message) {
    const message = typeof err.parent.message === 'string' ? err.parent.message : err.parent.message.join(' ');

    if (message.includes('Conversion failed')) {
      err.message = 'Invalid data type';
    }

    if (message.includes('duplicate key')) {
      err.message = 'Required Unique Data';
    }

    if (message.includes('Invalid column name')) {
      err.message = 'Invalid Column';
    }

    if (
      message.includes('Unclosed quotation mark') ||
      message.includes('Incorrect syntax near')
    ) {
      err.message = 'Invalid Query';
    }

    console.log({
      Time: moment().toISOString(),
      MgrName: mgrName,
      error: message,
      sql: err.parent.sql,
    });
  } else {
    console.log({
      Time: moment().toISOString(),
      MgrName: mgrName,
      error: err,
    });
  }

  return err;
};
