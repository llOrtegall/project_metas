import oracledb from 'oracledb';

const USER_DB = process.env.DB_ORACLE_USER as string;
const PASSWORD_DB = process.env.DB_ORACLE_PASS as string;
const NAME_DB = process.env.DB_ORACLE_NAME as string;
const DIR_DB = process.env.DB_ORACLE_DIR as string;

const DIR_TNS = process.env.DB_ORACLE_DIR_TNS as string;

oracledb.initOracleClient({ libDir: DIR_DB });

export async function connectionOracle() {
  try {
    const pool = await oracledb.createPool({
      user: USER_DB,
      password: PASSWORD_DB,
      configDir: DIR_TNS,
      connectString: NAME_DB
    });

    return pool.getConnection();
  } catch (error) {
    console.error('Error connecting to Oracle database', error);
    return error as Error;
  }
}