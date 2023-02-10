import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  const handleClick = (skipHandler) => {
    setIndex((index) => ((index + skipHandler + people.length) % people.length));
  }

  const randomClick = () => {
    let randomPerson = Math.floor(Math.random() * people.length)
    if (randomPerson === index) {
      randomPerson = (index + 1) % people.length;
    }
    setIndex(randomPerson);
  }

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className='author'>{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={() => handleClick(-1)}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={() => handleClick(1)}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomClick}>
        surprise me
      </button>
    </article>
  );
};

export default Review;
