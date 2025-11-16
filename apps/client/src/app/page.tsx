import styles from './page.module.scss';

export default async function Index() {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const data = await fetch(`${url}/api`);
  const json = await data.json();

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <h1>{json.message}</h1>
    </div>
  );
}
