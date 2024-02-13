import Lottie from 'lottie-react';

import orderFromMobileAnim from 'src/assets/animations/orderFromMobileAnim.json';

function LottieImage() {
  return (
    <Lottie
      animationData={orderFromMobileAnim}
      style={{
        height: '450px',
        borderRadius: '1rem',
      }}
    />
  );
}

export default LottieImage;
