import React from 'react';
import { Helmet } from 'react-helmet-async';

import RegisterView from 'src/views/register';

function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | QR Food  </title>
      </Helmet>

      <RegisterView />
    </>
  );
}

export default RegisterPage;
