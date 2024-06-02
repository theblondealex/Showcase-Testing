import type { ImageSourcePropType } from 'react-native';

export interface CarouselDataProps {
  id: number;
  image: ImageSourcePropType;
  name: string;
  exp: string;
  visa: ImageSourcePropType;
}

const CarouselData: CarouselDataProps[] = [
  {
    id: 1,
    image: require('@/assets/CardCarousel/gradient1.png'),
    name: 'Rakha Wibowo',
    exp: '1/29',
    visa: require('@/assets/CardCarousel/visa.png'),
  },
  {
    id: 2,
    image: require('@/assets/CardCarousel/gradient2.png'),
    name: 'Rakha Wibowo',
    exp: '1/29',
    visa: require('@/assets/CardCarousel/visa.png'),
  },
  {
    id: 3,
    image: require('@/assets/CardCarousel/gradient3.png'),
    name: 'Rakha Wibowo',
    exp: '1/29',
    visa: require('@/assets/CardCarousel/visa.png'),
  },
  {
    id: 4,
    image: require('@/assets/CardCarousel/gradient4.png'),
    name: 'Rakha Wibowo',
    exp: '1/29',
    visa: require('@/assets/CardCarousel/visa.png'),
  },
  {
    id: 5,
    image: require('@/assets/CardCarousel/gradient5.png'),
    name: 'Rakha Wibowo',
    exp: '1/29',
    visa: require('@/assets/CardCarousel/visa.png'),
  },

  {
    id: 6,
    image: require('@/assets/CardCarousel/gradient6.png'),
    name: 'Rakha Wibowo',
    exp: '1/29',
    visa: require('@/assets/CardCarousel/visa.png'),
  },
];

export { CarouselData };
