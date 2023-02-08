import css from './SearchInput.module.css';
import PropTypes from 'prop-types';
export const SearchInput = ({ value, onChange }) => {
  return (
    <div className={css.Search__container}>
      <p className={css.Search__title}>Search contact by name</p>
      <input
        type="text"
        className={css.Search__input}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
