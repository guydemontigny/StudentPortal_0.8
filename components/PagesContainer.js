import Head from 'next/head'

const PagesContainer = ({T}) => {
    return(
        <Head>
            <title >0-80{' '}{T.StudentPortalHead}</title>
            <link rel="icon" type="image/gif" href="/img/Wheel2-blue-gold.gif" />
        </Head>
    )
}

export default PagesContainer