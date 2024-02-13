import { Helmet } from 'react-helmet-async';

import AppView from 'src/views/overview';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | QR Food </title>
      </Helmet>

      <AppView />
    </>
  );
}
