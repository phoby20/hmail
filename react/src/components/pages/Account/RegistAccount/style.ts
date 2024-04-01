import backgroundImg from '../../../../media/img/login_background_img.jpeg'

export const customStyle = {
  background: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  height: '120vh', // styleSheet의 container_wrap 클래스의 높이랑 같게 해줘야 한다
  backgroundRepeat: 'no-repeat',
  filter: 'blur(14px)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  WebkitFilter: 'blur(10px)',
  transform: 'scale(1.07)',
} as const
