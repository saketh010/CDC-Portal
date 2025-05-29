import Head from 'next/head'

export default function PageHead({ title }) {
  const baseTitle = "CDC - SVNIT Surat"
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle

  return (
    <Head>
      <title>{fullTitle}</title>
      <link rel="icon" href="/https://upload.wikimedia.org/wikipedia/en/1/1b/NIT_Surat_Logo.svg" />
    </Head>
  )
}