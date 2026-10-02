import './WorkshopCategory.css';
import WorkshopIcon from './WorkshopIcons';
import { WorkshopLink, workshopHref } from './WorkshopShared';

/* One workshop-area card. category.span (3-6) controls its desktop width. */
export default function WorkshopCategory({ category }) {
  const wide = category.span >= 5;
  const cls = [
    'pjw-category',
    `pjw-category--span-${category.span}`,
    wide ? 'pjw-category--wide' : '',
    category.custom ? 'pjw-category--custom' : '',
  ].filter(Boolean).join(' ');

  return (
    <article className={cls}>
      <div className="pjw-category__icon">
        <WorkshopIcon name={category.icon} size={26} />
      </div>
      <h3 className="pjw-category__title">{category.title}</h3>
      {category.custom ? (
        <p className="pjw-category__desc">{category.description}</p>
      ) : (
        <>
          <p className="pjw-category__sub">Topics may include</p>
          <ul className="pjw-category__topics">
            {category.topics.map((t) => (
              <li key={t} className="pjw-category__topic">{t}</li>
            ))}
          </ul>
        </>
      )}
      <WorkshopLink
        to={workshopHref('contact', `workshop=${encodeURIComponent(category.title)}`)}
        className="pjw-category__link"
      >
        Request this workshop
        <span className="pjw-sr-only">: {category.title}</span>
      </WorkshopLink>
    </article>
  );
}
