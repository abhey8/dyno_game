function DinoGame(){
  const [isJumping, setIsJumping] = useState(false);
  const [position, setPosition] = useState(0);
  const [obstacles, setObstacles] = useState([{ x: 400 }]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const gameAreaRef = useRef(null);

  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      let jumpHeight = 0;
      const jumpInterval = setInterval(() => {
        jumpHeight += 5;
        setPosition(jumpHeight);
        if (jumpHeight >= 100) {
          clearInterval(jumpInterval);
          const fallInterval = setInterval(() => {
            jumpHeight -= 5;
            setPosition(jumpHeight);
            if (jumpHeight <= 0) {
              clearInterval(fallInterval);
              setIsJumping(false);
            }
          }, 20);
        }
      }, 20);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') jump();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      setObstacles((obs) => obs.map(o => ({ x: o.x - 5 })).filter(o => o.x > -20));
      setScore((s) => s + 1);
    }, 50);

    const collisionCheck = setInterval(() => {
      obstacles.forEach(o => {
        if (o.x < 50 && o.x > 20 && position < 50) {
          setIsGameOver(true);
          clearInterval(obstacleInterval);
          clearInterval(collisionCheck);
        }
      });
    }, 10);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(collisionCheck);
    };
  }, [obstacles, position]);

  useEffect(() => {
    if (Math.random() < 0.02) {
      setObstacles((obs) => [...obs, { x: 400 }]);
    }
  }, [score]);

  return (
    <div className="game-area" ref={gameAreaRef}>
      <h2>Score: {score}</h2>
      {isGameOver && <h3>Game Over</h3>}
      <motion.div className="dino" animate={{ bottom: position }} />
      {obstacles.map((o, index) => (
        <motion.div key={index} className="obstacle" animate={{ left: o.x }} />
      ))}
    </div>
  );
};

export default DinoGame;