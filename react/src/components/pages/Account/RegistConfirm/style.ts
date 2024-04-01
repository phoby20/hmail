import backgroundImg from '../../../../media/img/login_background.jpeg'

export const imgStyle = {
  background: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  height: '120vh',
  backgroundRepeat: 'no-repeat',
  filter: 'blur(14px)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  WebkitFilter: 'blur(10px)',
  transform: 'scale(1.07)',
} as const
