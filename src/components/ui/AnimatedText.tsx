import { animated, useSpring, SpringValue } from '@react-spring/web';

type AnimatedTextProps = React.SVGProps<SVGTextElement>;

const InnerTextAnimated = animated('text');

const AnimatedText = ({ x, y, ...props }: AnimatedTextProps) => {
  const style = useSpring({
    config: {
      duration: 600,
    },
    x,
    y,
    textAnchor: 'middle',
    fontSize: '16px',
  });

  return <InnerTextAnimated {...props} style={style} />;
};
export default AnimatedText;
