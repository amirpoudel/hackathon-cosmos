import { Helmet } from 'react-helmet-async';

import LoginView from 'src/views/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login |  QR Food </title>
      </Helmet>

      <LoginView />
    </>
  );
}
