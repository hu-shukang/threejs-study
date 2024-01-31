import { useCallback, useEffect, useRef } from 'react';

const Page2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const frame = useRef<number>();
  const getPosition = useCallback((time: number) => {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const x = Math.sin(time * 1200 + 0);
    const y = Math.sin(x);
    return { x: center.x * x + center.x, y: center.y * y + center.y };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')!;

    const draw = (time: number) => {
      const { x, y } = getPosition(time);
      console.log(x, y);
      ctx.fillStyle = 'black';
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
      frame.current = requestAnimationFrame(draw);
    };

    frame.current = requestAnimationFrame(draw);

    return () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </>
  );
};

export default Page2;
