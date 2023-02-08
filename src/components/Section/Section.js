import PropTypes from 'prop-types';
import css from './Section.module.css';

export const Section = ({ title, className, children }) => {
  return (
    <section
      className={className ? css.section + ' ' + css.aside : css.section}
    >
      <h2 className={css.Section__title}>{title}</h2>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
