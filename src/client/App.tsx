import styles from './styles/App.module.scss';
import Main from './views/main/Main';

const App = () => {
  return (
    <div className={styles.app}>
      <Main />
    </div>
  );
};

export default App;
