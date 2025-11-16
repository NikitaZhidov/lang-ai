import { getData } from '@/api/get-data';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function Index() {
  let data: { message: string } | undefined;

  try{
    data = await getData();
  } catch {
    data = { message: '' };
  }

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <h1>{data.message}</h1>
    </div>
  );
}
