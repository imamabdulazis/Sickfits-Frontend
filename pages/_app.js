import Page from "../components/Page";
import Router from 'next/router';
import Nprogress from 'nprogress';
import withData from '../lib/withData';

///TODO : default style progress
// import 'nprogress/nprogress.css';
///TODO : custom style progress
import '../components/styles/nprogress.css';
import { ApolloProvider } from "@apollo/client";

/*
  feature to create line progress indicator top of screen
  and make smoth loading page
*/
Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());


function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

//TODO : waiting when load data of page
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}


export default withData(MyApp);