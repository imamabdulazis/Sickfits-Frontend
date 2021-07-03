import Page from "../components/Page";
import Router from 'next/router';
import Nprogress from 'nprogress';

///TODO : default style progress
// import 'nprogress/nprogress.css';
///TODO : custom style progress
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());


export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}