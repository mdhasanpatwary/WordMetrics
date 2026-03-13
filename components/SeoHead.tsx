import React from 'react';
import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title = "WordMetrics – Free Word Counter, Case Converter & Text Analysis Tool",
  description = "WordMetrics is a free online text analysis tool that includes word counter, character counter, reading time calculator, case converter, text cleaner, and advanced writing statistics.",
  url = "https://wordmetrics.com",
  image = "https://wordmetrics.com/og-image.png"
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="word counter, character counter, case converter, text cleaner, remove extra spaces, reading time calculator, keyword density, text statistics tool" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.png" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Social Sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="WordMetrics" />
      <meta property="og:image" content={image} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "WordMetrics",
              "alternateName": "WordMetrics Text Utility",
              "url": url,
              "applicationCategory": "Utility",
              "operatingSystem": "All",
              "featureList": [
                "Word count",
                "Character count",
                "Reading time calculator",
                "Case converter",
                "Text cleaner",
                "SEO analysis tools",
                "Advanced writing statistics",
                "Keyword density analysis"
              ],
              "abstract": description,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "WordMetrics",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "All",
              "featureList": [
                "Word count",
                "Character count",
                "Reading time calculator",
                "Case converter",
                "Text cleaner",
                "SEO analysis tools"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is a word counter?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A word counter is a digital tool that calculates the total number of words in a block of text. WordMetrics provides this in real-time as you type or paste content."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I count words online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Using WordMetrics, simply paste your text into the editor, and the tool will instantly show you the word count, character count, and other metrics."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I convert text to uppercase or lowercase?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WordMetrics includes a Case Converter tool. Paste your text and click the 'UPPERCASE' or 'lowercase' buttons to transform your text instantly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I remove extra spaces from text?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Text Cleaner tool in WordMetrics allows you to remove extra spaces, leading/trailing spaces, and empty lines with a single click."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I calculate reading time?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WordMetrics automatically calculates reading time based on multiple adjustable reading speeds (150, 200, 250 WPM), providing it in minutes and seconds."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How to count characters without spaces?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WordMetrics provides a real-time character count that excludes spaces, which is essential for meeting specific word count requirements on certain platforms."
                  }
                }
              ]
            }
          ])
        }}
      />
    </Head>
  );
};

export default SeoHead;
