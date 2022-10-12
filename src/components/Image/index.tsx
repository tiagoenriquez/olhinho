import { ImageStyled } from './styles';

interface ImageProps {
  src: string;
  alt: string;
}

const Image = (props: ImageProps) => {
  const { src, alt } = props;
  return <ImageStyled src={src} alt={alt} />;
};

export default Image;
