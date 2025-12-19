import { useTranslations } from 'next-intl';
import Image from 'next/image';
const AboutPage = () => {
  const t = useTranslations('about');
  return (
    <>
      <h1 className="h-[100px] flex items-center justify-center">
        <Image
          src="/images/rick-and-morty-title.png"
          alt="rick and morty"
          width={300}
          height={100}
        />
      </h1>
      <div className="flex flex-col items-center justify-center bg-[var(--bg-color)]/90 shadow-[0_0_10px_8px_var(--bg-color)] rounded">
        <p>{t('title')}</p>
        <p>{t('intro1')}</p>
        <p>{t('intro2')}</p>
        <p>{t('intro3')}</p>
        <p>{t('callToAction')}</p>
        <div>
          {t('linkedin1')}
          <a
            href="https://www.linkedin.com/in/anna-vasilevich-frontend/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            LinkedIn
          </a>
          {t('linkedin2')}
        </div>
        <div>
          {t('rsSchool1')}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            RS School React Course.
          </a>
          {t('rsSchool2')}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
