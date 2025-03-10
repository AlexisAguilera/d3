import { animated, useSpring } from '@react-spring/web';
import { useEffect, useRef } from 'react';

const InnerRectAnimated = animated('rect');

type AnimatedRect = React.SVGProps<SVGRectElement> & {
  isShowing?: boolean;
};

const AnimatedRect = ({
  width,
  height,
  x,
  y,
  fill,
  isShowing = true,
  ...props
}: AnimatedRect) => {
  const wasShowing = useRef(false);

  useEffect(() => {
    wasShowing.current = isShowing;
  }, [isShowing]);

  const style = useSpring({
    config: {
      duration: 600,
    },
    x,
    y,
    fill: isShowing ? fill : 'red',
    opacity: isShowing ? 1 : 0,
    height,
    width,
  });
  return <InnerRectAnimated style={style} {...props} />;
};
export default AnimatedRect;
