import React from 'react'
import Head from 'next/head'
import { getBrowserLocale } from '../../translations/getBrowserLocale'
import { useRouter } from 'next/dist/client/router'

const Index = (props) => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace('/[DB]/[uiLang]', `/${props.DB}/${getBrowserLocale()}`)
  })
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="theme-color" content="#90cdf4" />
      <meta charset='utf-8' />
      <title>Vipassana Old Students Portal</title>
      <link href='/img/Hamburger_icon.png' rel='icon' type='image/png' sizes='32x32' />
    </Head>
  )
}

export default Index

export async function getServerSideProps(props){
  const db = props.query.DB
  return {props: {DB: db}}
 }
