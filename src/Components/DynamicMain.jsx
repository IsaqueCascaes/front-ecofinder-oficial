import { useState, useEffect } from 'react';
import styles from '../Css/DynamicMain.module.css'; // Certifique-se de criar o CSS correspondente
import Img1 from '../assets/image1.png'
import Img2 from '../assets/image2.jpeg'
import Img3 from '../assets/image3.jpeg'

const DynamicMain = () => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const data = [
    {
      text: "Cada ação importa. seja a mudança que o mundo precisa",
      backgroundImage: `url(${Img1})`,
    },
    {
      text: "O futuro está em nossas mãos. Preserve hoje para viver amanhã.",
      backgroundImage: `url(${Img2})`,
    },
    {
      text: "Cuidar da Terra é cuidar de nós mesmos. Faça a diferença!",
      backgroundImage: `url(${Img3})`,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true); // Inicia a animação
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length); // Troca o índice
        setAnimating(false); // Finaliza a animação
      }, 100); // Duração da animação
    }, 7000); // Intervalo entre as trocas

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`${styles.main} ${animating ? styles.slide : ""}`}
      style={{ backgroundImage: data[index].backgroundImage }}
    >
      <div className={styles.overlay}>
        <h1>{data[index].text}</h1>
      </div>
    </main>
  );
};

export default DynamicMain;